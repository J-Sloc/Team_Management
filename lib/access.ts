import prisma from "@/lib/prisma";
import { UserRole } from "../generated/prisma";
import { createApiError } from "./api";

export type SessionUser = {
  id: string;
  role: UserRole;
};

export async function getAccessibleTeamIds(user: SessionUser) {
  if (user.role === UserRole.AD) {
    const teams = await prisma.team.findMany({ select: { id: true } });
    return teams.map((team) => team.id);
  }

  if (user.role === UserRole.COACH) {
    const coach = await prisma.user.findUnique({
      where: { id: user.id },
      select: { teams: true },
    });

    return coach?.teams ?? [];
  }

  const athletes = await prisma.athlete.findMany({
    where: { userId: user.id },
    select: { teamId: true },
  });

  return [...new Set(athletes.map((athlete) => athlete.teamId))];
}

export async function getLinkedAthleteIds(userId: string) {
  const athletes = await prisma.athlete.findMany({
    where: { userId },
    select: { id: true },
  });

  return athletes.map((athlete) => athlete.id);
}

export async function getLinkedAthlete(userId: string) {
  return prisma.athlete.findFirst({
    where: { userId },
    select: {
      id: true,
      teamId: true,
      name: true,
    },
  });
}

export async function resolveScopedTeamIds(
  user: SessionUser,
  requestedTeamId?: string,
) {
  const teamIds = await getAccessibleTeamIds(user);

  if (requestedTeamId) {
    if (!teamIds.includes(requestedTeamId)) {
      throw createApiError(403, "You do not have access to that team.");
    }

    return [requestedTeamId];
  }

  return teamIds;
}

export async function ensureTeamAccess(user: SessionUser, teamId: string) {
  const teamIds = await getAccessibleTeamIds(user);

  if (!teamIds.includes(teamId)) {
    throw createApiError(403, "You do not have access to that team.");
  }
}

export async function ensureAthleteAccess(user: SessionUser, athleteId: string) {
  const athlete = await prisma.athlete.findUnique({
    where: { id: athleteId },
    select: {
      id: true,
      teamId: true,
      userId: true,
      name: true,
    },
  });

  if (!athlete) {
    throw createApiError(404, "Athlete not found.");
  }

  if (user.role === UserRole.ATHLETE) {
    if (athlete.userId !== user.id) {
      throw createApiError(403, "You do not have access to that athlete.");
    }

    return athlete;
  }

  const teamIds = await getAccessibleTeamIds(user);
  if (!teamIds.includes(athlete.teamId)) {
    throw createApiError(403, "You do not have access to that athlete.");
  }

  return athlete;
}
