import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/app/lib/auth";
import { ensureAthleteAccess, resolveScopedTeamIds, type SessionUser } from "@/lib/access";
import { createApiError, handleApiError, parseSearchParams } from "@/lib/api";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/rbac";
import { analyzeWorkoutResults, normalizeWorkoutResults } from "@/lib/workoutAnalysis";
import { recomputeAthleteAnalytics } from "@/lib/analytics";
import { UserRole } from "../../../../generated/prisma";

const workoutAnalyticsQuerySchema = z.object({
  athleteId: z.string().min(1).optional(),
  teamId: z.string().min(1).optional(),
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
    const query = parseSearchParams(request, workoutAnalyticsQuerySchema);

    if (query.athleteId) {
      const athlete = await ensureAthleteAccess(user, query.athleteId);
      let snapshot = await prisma.workoutAnalyticsSnapshot.findUnique({
        where: { athleteId: athlete.id },
      });

      if (!snapshot) {
        await recomputeAthleteAnalytics(athlete.id);
        snapshot = await prisma.workoutAnalyticsSnapshot.findUnique({
          where: { athleteId: athlete.id },
        });
      }

      const workouts = await prisma.workoutInstance.findMany({
        where: { athleteId: athlete.id },
        orderBy: { performedAt: "desc" },
        take: 8,
        include: {
          workoutTemplate: {
            include: { metrics: true },
          },
        },
      });

      return NextResponse.json({
        athleteId: athlete.id,
        snapshot,
        workouts: workouts.map((workout) => ({
          id: workout.id,
          performedAt: workout.performedAt,
          workoutName: workout.workoutTemplate?.name ?? "Ad hoc workout",
          summary: {
            normalizedMetrics: normalizeWorkoutResults(workout.results),
            analysis: analyzeWorkoutResults(workout.results),
          },
        })),
      });
    }

    if (user.role === UserRole.ATHLETE) {
      const linkedAthlete = await prisma.athlete.findFirst({
        where: { userId: user.id },
        select: { id: true },
      });

      if (!linkedAthlete) {
        throw createApiError(404, "Athlete profile not found.");
      }

      const snapshot = await prisma.workoutAnalyticsSnapshot.findUnique({
        where: { athleteId: linkedAthlete.id },
      });

      return NextResponse.json({ athleteId: linkedAthlete.id, snapshot });
    }

    const teamIds = await resolveScopedTeamIds(user, query.teamId);
    const snapshots = await prisma.workoutAnalyticsSnapshot.findMany({
      where: { teamId: { in: teamIds } },
      orderBy: { refreshedAt: "desc" },
      include: {
        athlete: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ teamIds, snapshots });
  } catch (error) {
    return handleApiError(error);
  }
}
