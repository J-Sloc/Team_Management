import prisma from "@/lib/prisma";
import {
  MeasurementUnit,
  RiskFlag,
  type Prisma,
} from "../generated/prisma";
import { isDistanceUnit, isTimeUnit } from "./unitConversion";
import {
  analyzeWorkoutResults,
  normalizeWorkoutResults,
  summarizeWorkoutPerformance,
} from "./workoutAnalysis";

type AthleteAnalyticsSource = Prisma.AthleteGetPayload<{
  include: {
    team: true;
    academicRecords: true;
    healthRecords: true;
    workoutInstances: {
      include: {
        workoutTemplate: {
          include: {
            metrics: true;
          };
        };
      };
    };
    personalRecords: true;
    eventRankings: {
      include: {
        rankingSource: true;
      };
    };
  };
}>;

type RollingWindowSummary = {
  windowDays: number;
  workoutCount: number;
  plannedMetricCount: number;
  aboveTargetCount: number;
  onTargetCount: number;
  belowTargetCount: number;
  adherencePercent: number | null;
};

function average(values: number[]) {
  if (values.length === 0) {
    return null;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}

function roundTo(value: number | null | undefined, places = 2) {
  if (value == null || Number.isNaN(value)) {
    return null;
  }

  return Number(value.toFixed(places));
}

function diffInDays(a: Date, b: Date) {
  return (a.getTime() - b.getTime()) / 86_400_000;
}

function getConfidenceLabel(sampleSize: number) {
  if (sampleSize >= 6) return "high";
  if (sampleSize >= 3) return "medium";
  return "low";
}

function computeSlope(points: Array<{ x: number; y: number }>) {
  if (points.length < 2) {
    return null;
  }

  const xMean = average(points.map((point) => point.x));
  const yMean = average(points.map((point) => point.y));
  if (xMean == null || yMean == null) {
    return null;
  }

  const numerator = points.reduce(
    (total, point) => total + (point.x - xMean) * (point.y - yMean),
    0,
  );
  const denominator = points.reduce(
    (total, point) => total + (point.x - xMean) ** 2,
    0,
  );

  if (denominator === 0) {
    return null;
  }

  return numerator / denominator;
}

function deriveRiskLevel(athlete: AthleteAnalyticsSource, adherencePercent: number | null) {
  if (athlete.riskFlag && athlete.riskFlag !== RiskFlag.NONE) {
    return athlete.riskFlag;
  }

  const latestAcademic = athlete.academicRecords[0];
  const latestHealth = athlete.healthRecords[0];

  if (
    athlete.gpa != null && athlete.gpa < 2 ||
    latestAcademic?.academicStanding === "BAD" ||
    latestHealth?.status === "NOT_CLEARED" ||
    (adherencePercent != null && adherencePercent < 45)
  ) {
    return RiskFlag.HIGH;
  }

  if (
    athlete.gpa != null && athlete.gpa < 2.5 ||
    latestAcademic?.academicStanding === "NEUTRAL" ||
    latestHealth?.status === "LIMITED" ||
    (adherencePercent != null && adherencePercent < 70)
  ) {
    return RiskFlag.MODERATE;
  }

  return RiskFlag.LOW;
}

function buildRollingWindowSummary(
  athlete: AthleteAnalyticsSource,
  windowDays: number,
): RollingWindowSummary {
  const cutoff = new Date(Date.now() - windowDays * 86_400_000);
  const recentInstances = athlete.workoutInstances.filter(
    (instance) => new Date(instance.performedAt) >= cutoff,
  );

  const reps = recentInstances.flatMap((instance) => analyzeWorkoutResults(instance.results));
  const plannedReps = reps.filter((rep) => rep.classification !== "unplanned");
  const aboveTargetCount = plannedReps.filter((rep) => rep.classification === "excellent").length;
  const onTargetCount = plannedReps.filter((rep) => rep.classification === "on-plan").length;
  const belowTargetCount = plannedReps.filter((rep) => rep.classification === "under-goal").length;
  const adherencePercent =
    plannedReps.length > 0
      ? roundTo(((aboveTargetCount + onTargetCount) / plannedReps.length) * 100)
      : null;

  return {
    windowDays,
    workoutCount: recentInstances.length,
    plannedMetricCount: plannedReps.length,
    aboveTargetCount,
    onTargetCount,
    belowTargetCount,
    adherencePercent,
  };
}

function computeWorkoutSnapshot(athlete: AthleteAnalyticsSource) {
  const reps = athlete.workoutInstances.flatMap((instance) =>
    analyzeWorkoutResults(instance.results).map((rep) => ({
      ...rep,
      performedAt: instance.performedAt,
      workoutName: instance.workoutTemplate?.name ?? "Ad hoc workout",
    })),
  );
  const plannedReps = reps.filter((rep) => rep.classification !== "unplanned");
  const aboveTargetCount = plannedReps.filter((rep) => rep.classification === "excellent").length;
  const onTargetCount = plannedReps.filter((rep) => rep.classification === "on-plan").length;
  const belowTargetCount = plannedReps.filter((rep) => rep.classification === "under-goal").length;
  const adherencePercent =
    plannedReps.length > 0
      ? roundTo(((aboveTargetCount + onTargetCount) / plannedReps.length) * 100)
      : null;

  return {
    plannedMetricCount: plannedReps.length,
    aboveTargetCount,
    onTargetCount,
    belowTargetCount,
    adherencePercent,
    rolling7: buildRollingWindowSummary(athlete, 7),
    rolling14: buildRollingWindowSummary(athlete, 14),
    rolling30: buildRollingWindowSummary(athlete, 30),
    recentProgression: athlete.workoutInstances.slice(0, 5).map((instance) => ({
      workoutId: instance.id,
      workoutName: instance.workoutTemplate?.name ?? "Ad hoc workout",
      performedAt: instance.performedAt.toISOString(),
      summary: summarizeWorkoutPerformance(instance.results),
      metrics: normalizeWorkoutResults(instance.results).slice(0, 4),
    })),
    summaryJson: {
      latestWorkoutAt: athlete.workoutInstances[0]?.performedAt.toISOString() ?? null,
      workoutCount: athlete.workoutInstances.length,
      recentSummaries: athlete.workoutInstances.slice(0, 3).map((instance) => ({
        workoutId: instance.id,
        summary: summarizeWorkoutPerformance(instance.results),
      })),
    },
    aiSummary:
      plannedReps.length > 0
        ? `${aboveTargetCount} metrics above target, ${onTargetCount} on target, ${belowTargetCount} below target across ${athlete.workoutInstances.length} logged workouts.`
        : "Workout logs exist, but there is not enough planned-vs-actual data yet.",
  };
}

function buildPrTrend(athlete: AthleteAnalyticsSource) {
  const grouped = new Map<string, typeof athlete.personalRecords>();
  for (const record of athlete.personalRecords) {
    const key = record.eventName;
    const existing = grouped.get(key) ?? [];
    grouped.set(key, [...existing, record]);
  }

  return [...grouped.entries()].map(([eventName, records]) => {
    const sorted = [...records].sort(
      (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime(),
    );
    const baseline = sorted[0]?.result ?? null;
    const latest = sorted.at(-1) ?? null;
    const recentAverage = average(sorted.slice(-3).map((record) => record.result));
    const firstDate = sorted[0]?.recordedAt ? new Date(sorted[0].recordedAt) : null;
    const points =
      firstDate == null
        ? []
        : sorted.map((record) => ({
            x: diffInDays(new Date(record.recordedAt), firstDate),
            y: record.result,
          }));
    const slope = computeSlope(points);

    return {
      eventName,
      metricType: "PERSONAL_RECORD",
      baseline: roundTo(baseline),
      recentAverage: roundTo(recentAverage),
      latestValue: roundTo(latest?.result ?? null),
      latestRank: null,
      recentDelta:
        baseline != null && latest != null ? roundTo(latest.result - baseline) : null,
      slope: roundTo(slope, 4),
      confidenceLabel: getConfidenceLabel(sorted.length),
      sampleSize: sorted.length,
      summaryJson: {
        unit: latest?.unit ?? sorted[0]?.unit ?? null,
        latestRecordedAt: latest?.recordedAt.toISOString() ?? null,
        points: sorted.map((record) => ({
          recordedAt: record.recordedAt.toISOString(),
          value: record.result,
          unit: record.unit,
        })),
      },
      aiSummary:
        latest == null
          ? `No PR data yet for ${eventName}.`
          : `Latest ${eventName} mark is ${latest.result} ${latest.unit.toLowerCase()} with ${sorted.length} recorded data point${sorted.length === 1 ? "" : "s"}.`,
    };
  });
}

function buildRankingTrend(athlete: AthleteAnalyticsSource) {
  const grouped = new Map<string, typeof athlete.eventRankings>();
  for (const ranking of athlete.eventRankings) {
    const key = ranking.eventName;
    const existing = grouped.get(key) ?? [];
    grouped.set(key, [...existing, ranking]);
  }

  return [...grouped.entries()].map(([eventName, rankings]) => {
    const sorted = [...rankings].sort(
      (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime(),
    );
    const baseline = sorted[0]?.rank ?? null;
    const latest = sorted.at(-1) ?? null;
    const recentAverage = average(sorted.slice(-3).map((ranking) => ranking.rank));
    const firstDate = sorted[0]?.recordedAt ? new Date(sorted[0].recordedAt) : null;
    const points =
      firstDate == null
        ? []
        : sorted.map((ranking) => ({
            x: diffInDays(new Date(ranking.recordedAt), firstDate),
            y: ranking.rank,
          }));
    const slope = computeSlope(points);

    return {
      eventName,
      metricType: "RANKING",
      baseline: baseline == null ? null : Number(baseline),
      recentAverage: roundTo(recentAverage),
      latestValue: latest?.score != null ? roundTo(latest.score) : null,
      latestRank: latest?.rank ?? null,
      recentDelta:
        baseline != null && latest != null ? roundTo(latest.rank - baseline) : null,
      slope: roundTo(slope, 4),
      confidenceLabel: getConfidenceLabel(sorted.length),
      sampleSize: sorted.length,
      summaryJson: {
        latestRecordedAt: latest?.recordedAt.toISOString() ?? null,
        latestSource: latest?.rankingSource.name ?? null,
        points: sorted.map((ranking) => ({
          recordedAt: ranking.recordedAt.toISOString(),
          rank: ranking.rank,
          score: ranking.score,
          source: ranking.rankingSource.name,
          region: ranking.region,
        })),
      },
      aiSummary:
        latest == null
          ? `No ranking data yet for ${eventName}.`
          : `Latest ${eventName} ranking is #${latest.rank}${latest.region ? ` in ${latest.region}` : ""}.`,
    };
  });
}

function computeAthletePerformanceSnapshot(
  athlete: AthleteAnalyticsSource,
  workoutSnapshot: ReturnType<typeof computeWorkoutSnapshot>,
) {
  const latestAcademic = athlete.academicRecords[0] ?? null;
  const latestHealth = athlete.healthRecords[0] ?? null;
  const lastWorkoutAt = athlete.workoutInstances[0]?.performedAt ?? null;
  const daysSinceWorkout =
    lastWorkoutAt == null ? null : diffInDays(new Date(), new Date(lastWorkoutAt));

  let trainingStatus = "building";
  if (lastWorkoutAt && daysSinceWorkout != null && daysSinceWorkout <= 3) {
    trainingStatus = "active";
  } else if (lastWorkoutAt && daysSinceWorkout != null && daysSinceWorkout <= 7) {
    trainingStatus = "maintaining";
  } else if (athlete.workoutInstances.length > 0) {
    trainingStatus = "stale";
  }

  let readinessScore = 50;
  if (workoutSnapshot.adherencePercent != null) {
    readinessScore += Math.min(30, workoutSnapshot.adherencePercent / 4);
  }
  if (athlete.gpa != null) {
    readinessScore += (athlete.gpa - 2) * 10;
  }
  if (latestHealth?.status === "LIMITED") {
    readinessScore -= 20;
  }
  if (latestHealth?.status === "NOT_CLEARED") {
    readinessScore -= 35;
  }
  if (latestAcademic?.academicStanding === "BAD") {
    readinessScore -= 15;
  } else if (latestAcademic?.academicStanding === "GOOD") {
    readinessScore += 8;
  }
  readinessScore = Math.max(0, Math.min(100, readinessScore));

  const readinessLabel =
    readinessScore >= 75 ? "high" : readinessScore >= 50 ? "moderate" : "low";
  const riskLevel = deriveRiskLevel(athlete, workoutSnapshot.adherencePercent);

  return {
    trainingStatus,
    readinessScore: roundTo(readinessScore),
    readinessLabel,
    riskLevel,
    lastWorkoutAt,
    summaryJson: {
      latestAcademic: latestAcademic
        ? {
            semester: latestAcademic.semester,
            termGpa: latestAcademic.termGpa,
            academicStanding: latestAcademic.academicStanding,
            attendancePercent: latestAcademic.attendancePercent,
          }
        : null,
      latestHealth: latestHealth
        ? {
            injuryType: latestHealth.injuryType,
            status: latestHealth.status,
            rehabSessions: latestHealth.rehabSessions,
            appointmentAttendance: latestHealth.appointmentAttendance,
          }
        : null,
      workoutSummary: workoutSnapshot.summaryJson,
      prCount: athlete.personalRecords.length,
      rankingCount: athlete.eventRankings.length,
    },
    aiSummary: `${athlete.name} is in ${trainingStatus} training status with ${readinessLabel} readiness (${roundTo(readinessScore)}). Latest academic standing is ${latestAcademic?.academicStanding ?? athlete.academicStanding ?? "unknown"}, and latest medical status is ${latestHealth?.status ?? athlete.medicalStatus ?? "unknown"}.`,
  };
}

export async function recomputeAthleteAnalytics(athleteId: string) {
  const athlete = await prisma.athlete.findUnique({
    where: { id: athleteId },
    include: {
      team: true,
      academicRecords: { orderBy: { createdAt: "desc" } },
      healthRecords: { orderBy: { createdAt: "desc" } },
      workoutInstances: {
        orderBy: { performedAt: "desc" },
        include: {
          workoutTemplate: {
            include: {
              metrics: true,
            },
          },
        },
      },
      personalRecords: { orderBy: { recordedAt: "asc" } },
      eventRankings: {
        orderBy: { recordedAt: "asc" },
        include: { rankingSource: true },
      },
    },
  });

  if (!athlete) {
    return null;
  }

  const workoutSnapshot = computeWorkoutSnapshot(athlete);
  const performanceSnapshot = computeAthletePerformanceSnapshot(athlete, workoutSnapshot);
  const prTrends = buildPrTrend(athlete);
  const rankingTrends = buildRankingTrend(athlete);
  const trendRows = [...prTrends, ...rankingTrends];

  await prisma.$transaction(async (tx) => {
    await tx.workoutAnalyticsSnapshot.upsert({
      where: { athleteId: athlete.id },
      create: {
        athleteId: athlete.id,
        teamId: athlete.teamId,
        ...workoutSnapshot,
      },
      update: {
        teamId: athlete.teamId,
        ...workoutSnapshot,
        refreshedAt: new Date(),
      },
    });

    await tx.athletePerformanceSnapshot.upsert({
      where: { athleteId: athlete.id },
      create: {
        athleteId: athlete.id,
        teamId: athlete.teamId,
        ...performanceSnapshot,
      },
      update: {
        teamId: athlete.teamId,
        ...performanceSnapshot,
        refreshedAt: new Date(),
      },
    });

    await tx.eventPerformanceTrend.deleteMany({
      where: { athleteId: athlete.id },
    });

    if (trendRows.length > 0) {
      await tx.eventPerformanceTrend.createMany({
        data: trendRows.map((trend) => ({
          athleteId: athlete.id,
          teamId: athlete.teamId,
          eventName: trend.eventName,
          metricType: trend.metricType,
          baseline: trend.baseline,
          recentAverage: trend.recentAverage,
          latestValue: trend.latestValue,
          latestRank: trend.latestRank,
          recentDelta: trend.recentDelta,
          slope: trend.slope,
          confidenceLabel: trend.confidenceLabel,
          sampleSize: trend.sampleSize,
          summaryJson: trend.summaryJson as Prisma.InputJsonValue,
          aiSummary: trend.aiSummary,
        })),
      });
    }
  });

  return {
    athleteId: athlete.id,
    teamId: athlete.teamId,
    workoutSnapshot,
    performanceSnapshot,
    eventTrends: trendRows,
  };
}

export async function rebuildAnalyticsSnapshots(athleteIds?: string[]) {
  const athletes = await prisma.athlete.findMany({
    where: athleteIds?.length ? { id: { in: athleteIds } } : undefined,
    select: { id: true },
  });

  const results = [];
  for (const athlete of athletes) {
    const rebuilt = await recomputeAthleteAnalytics(athlete.id);
    if (rebuilt) {
      results.push(rebuilt);
    }
  }

  return results;
}

export function buildProjectionFromTrend(trend: {
  slope: number | null;
  latestValue: number | null;
  confidenceLabel: string;
  sampleSize: number;
  summaryJson?: unknown;
}) {
  const dataIsSufficient = trend.sampleSize >= 3 && trend.slope != null && trend.latestValue != null;
  const projectedValue = dataIsSufficient && trend.latestValue != null && trend.slope != null
    ? roundTo(trend.latestValue + trend.slope * 30)
    : null;

  let direction = "flat";
  const unit =
    trend.summaryJson &&
    typeof trend.summaryJson === "object" &&
    trend.summaryJson != null &&
    "unit" in trend.summaryJson &&
    typeof trend.summaryJson.unit === "string"
      ? (trend.summaryJson.unit as MeasurementUnit)
      : null;

  if (trend.slope != null) {
    if (unit && isTimeUnit(unit)) {
      direction = trend.slope < 0 ? "improving" : trend.slope > 0 ? "declining" : "flat";
    } else if (unit && isDistanceUnit(unit)) {
      direction = trend.slope > 0 ? "improving" : trend.slope < 0 ? "declining" : "flat";
    } else {
      direction = trend.slope > 0 ? "rising" : trend.slope < 0 ? "falling" : "flat";
    }
  }

  return {
    dataIsSufficient,
    projectedValue,
    direction,
    confidenceLabel: trend.confidenceLabel,
    estimateLabel: projectedValue == null ? "Not enough history for an estimate." : "Trend-based estimate only.",
  };
}
