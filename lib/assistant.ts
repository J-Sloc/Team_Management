import prisma from "@/lib/prisma";
import { ensureAthleteAccess, ensureTeamAccess, type SessionUser } from "@/lib/access";
import { createApiError } from "@/lib/api";

export type AssistantScope = "global" | "athlete" | "performance";

export type AssistantContext = {
  scope: AssistantScope;
  athlete?: {
    id: string;
    name: string;
    teamName: string;
    classYear?: string | null;
    sport?: string | null;
    performanceSnapshot?: {
      trainingStatus: string;
      readinessScore?: number | null;
      readinessLabel?: string | null;
      riskLevel?: string | null;
      aiSummary?: string | null;
    } | null;
    workoutSnapshot?: {
      plannedMetricCount: number;
      adherencePercent?: number | null;
      aiSummary?: string | null;
    } | null;
    eventTrends: Array<{
      eventName: string;
      metricType: string;
      latestValue?: number | null;
      latestRank?: number | null;
      confidenceLabel: string;
      aiSummary?: string | null;
    }>;
    latestAcademic?: {
      semester: string;
      termGpa?: number | null;
      academicStanding?: string | null;
      attendancePercent?: number | null;
    } | null;
    latestHealth?: {
      injuryType?: string | null;
      status?: string | null;
      rehabSessions?: number | null;
      appointmentAttendance?: number | null;
    } | null;
    upcomingEvents: Array<{
      title: string;
      startTime: string;
      location?: string | null;
    }>;
  };
  team?: {
    id: string;
    name: string;
    sport: string;
    snapshotCount: number;
  };
};

type AssistantQueryInput = {
  scope: AssistantScope;
  athleteId?: string;
  teamId?: string;
};

const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
const rateWindowMs = 60_000;
const maxRequestsPerWindow = 12;
const requestHistory = new Map<string, number[]>();

export function enforceAssistantRateLimit(userId: string) {
  const now = Date.now();
  const history = requestHistory.get(userId) ?? [];
  const recent = history.filter((timestamp) => now - timestamp < rateWindowMs);

  if (recent.length >= maxRequestsPerWindow) {
    throw createApiError(429, "Assistant rate limit reached. Please try again in a minute.");
  }

  requestHistory.set(userId, [...recent, now]);
}

export async function buildAssistantContext(
  user: SessionUser,
  input: AssistantQueryInput,
): Promise<AssistantContext> {
  if (input.athleteId) {
    const athleteAccess = await ensureAthleteAccess(user, input.athleteId);
    const athlete = await prisma.athlete.findUnique({
      where: { id: athleteAccess.id },
      include: {
        team: true,
        performanceSnapshot: true,
        workoutAnalyticsSnapshot: true,
        eventPerformanceTrends: {
          orderBy: [{ metricType: "asc" }, { eventName: "asc" }],
          take: 8,
        },
        academicRecords: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        healthRecords: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!athlete) {
      throw createApiError(404, "Athlete not found.");
    }

    const upcomingEvents = await prisma.event.findMany({
      where: {
        OR: [
          { teamId: athlete.teamId, group: "TEAM" },
          { athleteId: athlete.id, group: "PERSONAL" },
        ],
        startTime: { gte: new Date() },
      },
      orderBy: { startTime: "asc" },
      take: 5,
    });

    return {
      scope: input.scope,
      athlete: {
        id: athlete.id,
        name: athlete.name,
        teamName: athlete.team.name,
        classYear: athlete.classYear,
        sport: athlete.sport,
        performanceSnapshot: athlete.performanceSnapshot,
        workoutSnapshot: athlete.workoutAnalyticsSnapshot,
        eventTrends: athlete.eventPerformanceTrends.map((trend) => ({
          eventName: trend.eventName,
          metricType: trend.metricType,
          latestValue: trend.latestValue,
          latestRank: trend.latestRank,
          confidenceLabel: trend.confidenceLabel,
          aiSummary: trend.aiSummary,
        })),
        latestAcademic: athlete.academicRecords[0]
          ? {
              semester: athlete.academicRecords[0].semester,
              termGpa: athlete.academicRecords[0].termGpa,
              academicStanding: athlete.academicRecords[0].academicStanding,
              attendancePercent: athlete.academicRecords[0].attendancePercent,
            }
          : null,
        latestHealth: athlete.healthRecords[0]
          ? {
              injuryType: athlete.healthRecords[0].injuryType,
              status: athlete.healthRecords[0].status,
              rehabSessions: athlete.healthRecords[0].rehabSessions,
              appointmentAttendance: athlete.healthRecords[0].appointmentAttendance,
            }
          : null,
        upcomingEvents: upcomingEvents.map((event) => ({
          title: event.title,
          startTime: event.startTime.toISOString(),
          location: event.location,
        })),
      },
    };
  }

  if (input.teamId) {
    await ensureTeamAccess(user, input.teamId);
    const team = await prisma.team.findUnique({
      where: { id: input.teamId },
      select: {
        id: true,
        name: true,
        sport: true,
        _count: {
          select: {
            athletes: true,
          },
        },
      },
    });

    if (!team) {
      throw createApiError(404, "Team not found.");
    }

    return {
      scope: input.scope,
      team: {
        id: team.id,
        name: team.name,
        sport: team.sport,
        snapshotCount: team._count.athletes,
      },
    };
  }

  return { scope: input.scope };
}

function buildDeterministicAssistantReply(prompt: string, context: AssistantContext) {
  if (context.athlete) {
    const athlete = context.athlete;
    const sportContext = athlete.sport ? ` in ${athlete.sport.toLowerCase().replace('_', ' & ')}` : '';
    const performanceSummary = athlete.performanceSnapshot?.aiSummary ?? "No performance snapshot is available yet.";
    const workoutSummary = athlete.workoutSnapshot?.aiSummary ?? "No workout analytics summary is available yet.";
    const academicSummary = athlete.latestAcademic
      ? `Latest academic entry: ${athlete.latestAcademic.semester}, GPA ${athlete.latestAcademic.termGpa ?? "N/A"}, standing ${athlete.latestAcademic.academicStanding ?? "unknown"}.`
      : "No academic snapshot is available yet.";
    const medicalSummary = athlete.latestHealth
      ? `Latest medical entry: ${athlete.latestHealth.injuryType ?? "general update"}, status ${athlete.latestHealth.status ?? "unknown"}, appointment attendance ${athlete.latestHealth.appointmentAttendance ?? "N/A"}%.`
      : "No medical snapshot is available yet.";
    const upcoming = athlete.upcomingEvents.length
      ? `Upcoming schedule: ${athlete.upcomingEvents
          .map((event) => `${event.title} on ${new Date(event.startTime).toLocaleString()}`)
          .join("; ")}.`
      : "No upcoming schedule items were found.";

    return `${athlete.name} (${athlete.teamName}${sportContext}) summary for "${prompt}": ${performanceSummary} ${workoutSummary} ${academicSummary} ${medicalSummary} ${upcoming}`;
  }

  if (context.team) {
    return `Team context for "${prompt}": ${context.team.name} (${context.team.sport}) currently has ${context.team.snapshotCount} athletes in scope for analytics-backed summaries.`;
  }

  return `Assistant context for "${prompt}" is available, but no athlete or team was selected. Ask a scoped question from an athlete or track workflow for a richer answer.`;
}

export async function generateAssistantReply(prompt: string, context: AssistantContext) {
  const fallback = buildDeterministicAssistantReply(prompt, context);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      reply: fallback,
      provider: "deterministic",
      model: null,
    };
  }

  const systemPrompt =
    "You are a read-only athletic program assistant. Use the provided analytics snapshots as the primary source of truth. Do not invent metrics, projections, or medical/academic facts. If data is incomplete, say so clearly. Consider the sport context when interpreting performance data - track & field focuses on event-specific metrics, football on team performance, etc.";

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: systemPrompt }],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Context:\n${JSON.stringify(context, null, 2)}\n\nUser question:\n${prompt}`,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    return {
      reply: fallback,
      provider: "deterministic",
      model: null,
    };
  }

  const payload = (await response.json()) as {
    output_text?: string;
  };

  return {
    reply: payload.output_text?.trim() || fallback,
    provider: "openai",
    model: DEFAULT_MODEL,
  };
}
