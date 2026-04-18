import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import {
  ensureAthleteAccess,
  ensureTeamAccess,
  getLinkedAthlete,
  resolveScopedTeamIds,
  type SessionUser,
} from "@/lib/access";
import {
  createApiError,
  dateLikeStringSchema,
  handleApiError,
  parseJsonBody,
  parseSearchParams,
} from "@/lib/api";
import { requireSession } from "@/lib/rbac";
import { EventGroup, EventType, Prisma, UserRole } from "../../../generated/prisma";

const eventQuerySchema = z.object({
  id: z.string().min(1).optional(),
  teamId: z.string().min(1).optional(),
  athleteId: z.string().min(1).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

const eventSchema = z.object({
  teamId: z.string().min(1).optional(),
  athleteId: z.string().min(1).optional(),
  type: z.nativeEnum(EventType),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1).nullable().optional(),
  startTime: dateLikeStringSchema,
  endTime: dateLikeStringSchema,
  location: z.string().trim().min(1).nullable().optional(),
  opponent: z.string().trim().min(1).nullable().optional(),
  group: z.nativeEnum(EventGroup),
});

const eventUpdateSchema = eventSchema.partial();

type EventRecord = Awaited<ReturnType<typeof findEventById>>;

function getSessionUser(session: { user?: SessionUser } | null): SessionUser {
  const user = session?.user;
  if (!user) {
    throw new Error("Missing session user.");
  }

  return {
    id: user.id,
    role: user.role,
  };
}

function applyDateRange(
  where: Prisma.EventWhereInput,
  from?: string,
  to?: string,
) {
  if (!from && !to) {
    return;
  }

  where.startTime = {};
  if (from) where.startTime.gte = new Date(from);
  if (to) where.startTime.lte = new Date(to);
}

async function requireLinkedAthlete(userId: string) {
  const athlete = await getLinkedAthlete(userId);
  if (!athlete) {
    throw createApiError(404, "Athlete profile not found.");
  }

  return athlete;
}

async function findEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      team: { select: { id: true, name: true } },
      athlete: { select: { id: true, name: true, userId: true, teamId: true } },
    },
  });
}

function serializeEvent(event: NonNullable<EventRecord>, user: SessionUser) {
  const isPersonal = event.group === EventGroup.PERSONAL;
  const isOwnPersonal =
    isPersonal && event.athlete?.userId != null && event.athlete.userId === user.id;
  const isCoachOrAd = user.role === UserRole.COACH || user.role === UserRole.AD;
  const canEdit = isCoachOrAd ? !isPersonal : isOwnPersonal;

  return {
    ...event,
    isReadOnly: !canEdit,
    canEdit,
    canDelete: canEdit,
    ownerType: isPersonal ? "athlete" : "team",
  };
}

async function ensureCoachReadableAthlete(user: SessionUser, athleteId: string) {
  const athlete = await ensureAthleteAccess(user, athleteId);
  return athlete;
}

async function ensureEventMutationAccess(user: SessionUser, eventId: string) {
  const event = await findEventById(eventId);

  if (!event) {
    throw createApiError(404, "Event not found.");
  }

  if (user.role === UserRole.ATHLETE) {
    if (
      event.group !== EventGroup.PERSONAL ||
      event.athlete?.userId !== user.id
    ) {
      throw createApiError(403, "You do not have permission to modify that event.");
    }

    return event;
  }

  await ensureTeamAccess(user, event.teamId);

  if (event.group === EventGroup.PERSONAL) {
    throw createApiError(
      403,
      "Personal athlete calendar entries are read-only for coaches and ADs.",
    );
  }

  return event;
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, eventQuerySchema);
    const where: Prisma.EventWhereInput = {};

    if (user.role === UserRole.ATHLETE) {
      const athlete = await requireLinkedAthlete(user.id);

      if (query.teamId && query.teamId !== athlete.teamId) {
        throw createApiError(403, "You do not have access to that team.");
      }

      if (query.athleteId && query.athleteId !== athlete.id) {
        throw createApiError(403, "You do not have access to that athlete.");
      }

      where.OR = [
        {
          teamId: athlete.teamId,
          group: EventGroup.TEAM,
        },
        {
          athleteId: athlete.id,
          group: EventGroup.PERSONAL,
        },
      ];
    } else if (query.athleteId) {
      const athlete = await ensureCoachReadableAthlete(user, query.athleteId);
      where.OR = [
        {
          teamId: athlete.teamId,
          group: EventGroup.TEAM,
        },
        {
          athleteId: athlete.id,
          group: EventGroup.PERSONAL,
        },
      ];
    } else {
      const teamIds = await resolveScopedTeamIds(user, query.teamId);
      where.teamId = { in: teamIds };
    }

    applyDateRange(where, query.from, query.to);

    const events = await prisma.event.findMany({
      where,
      orderBy: { startTime: "asc" },
      include: {
        team: { select: { id: true, name: true } },
        athlete: { select: { id: true, name: true, userId: true, teamId: true } },
      },
    });

    return NextResponse.json(events.map((event) => serializeEvent(event, user)));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const body = await parseJsonBody(request, eventSchema);

    if (user.role === UserRole.ATHLETE) {
      if (body.group !== EventGroup.PERSONAL) {
        throw createApiError(403, "Athletes can only create personal calendar entries.");
      }

      const athlete = await requireLinkedAthlete(user.id);
      const event = await prisma.event.create({
        data: {
          teamId: athlete.teamId,
          athleteId: athlete.id,
          type: body.type,
          title: body.title,
          description: body.description ?? null,
          startTime: new Date(body.startTime),
          endTime: new Date(body.endTime),
          location: body.location ?? null,
          opponent: body.opponent ?? null,
          group: EventGroup.PERSONAL,
          createdByUserId: user.id,
        },
        include: {
          team: { select: { id: true, name: true } },
          athlete: { select: { id: true, name: true, userId: true, teamId: true } },
        },
      });

      return NextResponse.json(serializeEvent(event, user), { status: 201 });
    }

    if (body.group !== EventGroup.TEAM) {
      throw createApiError(
        403,
        "Coaches and ADs can only create team-shared calendar entries.",
      );
    }

    if (!body.teamId) {
      throw createApiError(400, "teamId is required for team calendar entries.");
    }

    await ensureTeamAccess(user, body.teamId);

    const event = await prisma.event.create({
      data: {
        teamId: body.teamId,
        athleteId: null,
        type: body.type,
        title: body.title,
        description: body.description ?? null,
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        location: body.location ?? null,
        opponent: body.opponent ?? null,
        group: EventGroup.TEAM,
        createdByUserId: user.id,
      },
      include: {
        team: { select: { id: true, name: true } },
        athlete: { select: { id: true, name: true, userId: true, teamId: true } },
      },
    });

    return NextResponse.json(serializeEvent(event, user), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, eventQuerySchema);
    if (!query.id) {
      throw createApiError(400, "id is required");
    }

    const body = await parseJsonBody(request, eventUpdateSchema);
    const existingEvent = await ensureEventMutationAccess(user, query.id);

    if (user.role === UserRole.ATHLETE) {
      if (body.group && body.group !== EventGroup.PERSONAL) {
        throw createApiError(400, "Athletes cannot convert personal entries to team entries.");
      }

      const updated = await prisma.event.update({
        where: { id: query.id },
        data: {
          title: body.title,
          type: body.type,
          description: body.description,
          startTime: body.startTime ? new Date(body.startTime) : undefined,
          endTime: body.endTime ? new Date(body.endTime) : undefined,
          location: body.location,
          opponent: body.opponent,
        },
        include: {
          team: { select: { id: true, name: true } },
          athlete: { select: { id: true, name: true, userId: true, teamId: true } },
        },
      });

      return NextResponse.json(serializeEvent(updated, user));
    }

    if (body.group && body.group !== EventGroup.TEAM) {
      throw createApiError(400, "Team calendar entries must remain team-shared.");
    }

    if (body.teamId) {
      await ensureTeamAccess(user, body.teamId);
    } else {
      await ensureTeamAccess(user, existingEvent.teamId);
    }

    const updated = await prisma.event.update({
      where: { id: query.id },
      data: {
        teamId: body.teamId,
        type: body.type,
        title: body.title,
        description: body.description,
        startTime: body.startTime ? new Date(body.startTime) : undefined,
        endTime: body.endTime ? new Date(body.endTime) : undefined,
        location: body.location,
        opponent: body.opponent,
      },
      include: {
        team: { select: { id: true, name: true } },
        athlete: { select: { id: true, name: true, userId: true, teamId: true } },
      },
    });

    return NextResponse.json(serializeEvent(updated, user));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, eventQuerySchema);
    if (!query.id) {
      throw createApiError(400, "id is required");
    }

    await ensureEventMutationAccess(user, query.id);
    await prisma.event.delete({ where: { id: query.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
