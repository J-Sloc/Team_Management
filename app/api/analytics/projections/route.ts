import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/app/lib/auth";
import { ensureAthleteAccess, type SessionUser } from "@/lib/access";
import { createApiError, handleApiError, parseSearchParams } from "@/lib/api";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/rbac";
import { buildProjectionFromTrend, recomputeAthleteAnalytics } from "@/lib/analytics";

const projectionsQuerySchema = z.object({
  athleteId: z.string().min(1),
  eventName: z.string().min(1).optional(),
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
    const query = parseSearchParams(request, projectionsQuerySchema);
    const athlete = await ensureAthleteAccess(user, query.athleteId);

    let trends = await prisma.eventPerformanceTrend.findMany({
      where: {
        athleteId: athlete.id,
        metricType: "PERSONAL_RECORD",
        ...(query.eventName ? { eventName: query.eventName } : {}),
      },
      orderBy: { eventName: "asc" },
    });

    if (trends.length === 0) {
      await recomputeAthleteAnalytics(athlete.id);
      trends = await prisma.eventPerformanceTrend.findMany({
        where: {
          athleteId: athlete.id,
          metricType: "PERSONAL_RECORD",
          ...(query.eventName ? { eventName: query.eventName } : {}),
        },
        orderBy: { eventName: "asc" },
      });
    }

    if (query.eventName && trends.length === 0) {
      throw createApiError(404, "No projection data found for that event.");
    }

    return NextResponse.json({
      athleteId: athlete.id,
      projections: trends.map((trend) => ({
        eventName: trend.eventName,
        baseline: trend.baseline,
        recentAverage: trend.recentAverage,
        latestValue: trend.latestValue,
        slope: trend.slope,
        confidenceLabel: trend.confidenceLabel,
        sampleSize: trend.sampleSize,
        summaryJson: trend.summaryJson,
        projection: buildProjectionFromTrend(trend),
      })),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
