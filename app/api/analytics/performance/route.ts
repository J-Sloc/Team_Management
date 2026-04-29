import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/app/lib/auth";
import { ensureAthleteAccess, resolveScopedTeamIds, type SessionUser } from "@/lib/access";
import { createApiError, handleApiError, parseSearchParams } from "@/lib/api";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/rbac";
import { recomputeAthleteAnalytics } from "@/lib/analytics";
import { UserRole } from "../../../../generated/prisma";

const performanceQuerySchema = z.object({
  teamId: z.string().min(1).optional(),
  athleteId: z.string().min(1).optional(),
});

function getSessionUser(session: { user?: SessionUser } | null): SessionUser {
  const user = session?.user;
  if (!user) {
    throw new Error("Missing session user.");
  }

  return { id: user.id, role: user.role };
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, performanceQuerySchema);

    if (query.athleteId) {
      const athlete = await ensureAthleteAccess(user, query.athleteId);
      let snapshot = await prisma.athletePerformanceSnapshot.findUnique({
        where: { athleteId: athlete.id },
      });

      if (!snapshot) {
        await recomputeAthleteAnalytics(athlete.id);
        snapshot = await prisma.athletePerformanceSnapshot.findUnique({
          where: { athleteId: athlete.id },
        });
      }

      const trends = await prisma.eventPerformanceTrend.findMany({
        where: { athleteId: athlete.id },
        orderBy: [{ metricType: "asc" }, { eventName: "asc" }],
      });

      return NextResponse.json({
        athleteId: athlete.id,
        snapshot,
        trends,
      });
    }

    let teamIds: string[];
    if (user.role === UserRole.ATHLETE) {
      const linkedAthlete = await prisma.athlete.findFirst({
        where: { userId: user.id },
        select: { teamId: true },
      });

      if (!linkedAthlete) {
        throw createApiError(404, "Athlete profile not found.");
      }

      teamIds = [linkedAthlete.teamId];
    } else {
      teamIds = await resolveScopedTeamIds(user, query.teamId);
    }

    const snapshots = await prisma.athletePerformanceSnapshot.findMany({
      where: { teamId: { in: teamIds } },
      orderBy: [{ readinessScore: "desc" }, { refreshedAt: "desc" }],
      include: {
        athlete: {
          select: {
            id: true,
            name: true,
            classYear: true,
          },
        },
      },
    });

    return NextResponse.json({ teamIds, snapshots });
  } catch (error) {
    return handleApiError(error);
  }
}
