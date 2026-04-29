import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import {
  ensureAthleteAccess,
  getAccessibleTeamIds,
  getLinkedAthlete,
  type SessionUser,
} from "@/lib/access";
import {
  createApiError,
  dateLikeStringSchema,
  handleApiError,
  parseJsonBody,
  parseSearchParams,
} from "@/lib/api";
import { recomputeAthleteAnalytics } from "@/lib/analytics";
import { requireRole, requireSession } from "@/lib/rbac";
import { Prisma, UserRole } from "../../../generated/prisma";

const rankingQuerySchema = z.object({
  athleteId: z.string().min(1).optional(),
  teamId: z.string().min(1).optional(),
});

const rankingMutationQuerySchema = z.object({
  id: z.string().min(1),
});

const rankingSourceSchema = z.object({
  type: z.literal("source"),
  sourceName: z.string().trim().min(1),
  sourceType: z.string().trim().min(1).optional(),
  details: z.unknown().nullable().optional(),
});

const rankingEntrySchema = z
  .object({
    athleteId: z.string().min(1),
    rankingSourceId: z.string().min(1).optional(),
    sourceName: z.string().trim().min(1).optional(),
    sourceType: z.string().trim().min(1).optional(),
    details: z.unknown().nullable().optional(),
    eventName: z.string().trim().min(1),
    rank: z.number().int().positive(),
    region: z.string().trim().min(1).nullable().optional(),
    score: z.number().nullable().optional(),
    recordedAt: dateLikeStringSchema.optional(),
  })
  .refine((value) => Boolean(value.rankingSourceId || value.sourceName), {
    message: "rankingSourceId or sourceName is required",
    path: ["rankingSourceId"],
  });

const rankingPostSchema = z.union([rankingSourceSchema, rankingEntrySchema.extend({
  type: z.literal("entry"),
})]);

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

function toJsonValue(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return Prisma.JsonNull;
  }

  return value as Prisma.InputJsonValue;
}

async function resolveRankingSourceId(body: z.infer<typeof rankingEntrySchema>) {
  if (body.rankingSourceId) {
    const source = await prisma.rankingSource.findUnique({
      where: { id: body.rankingSourceId },
      select: { id: true },
    });

    if (!source) {
      throw createApiError(404, "Ranking source not found.");
    }

    return source.id;
  }

  if (!body.sourceName) {
    throw createApiError(400, "Unable to resolve ranking source.");
  }

  const source = await prisma.rankingSource.create({
    data: {
      name: body.sourceName,
      type: body.sourceType ?? "MANUAL",
      details: toJsonValue(body.details),
    },
  });

  return source.id;
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, rankingQuerySchema);
    const where: Prisma.EventRankingWhereInput = {};

    if (query.athleteId) {
      const athlete = await ensureAthleteAccess(user, query.athleteId);
      where.athleteId = athlete.id;
    } else if (user.role === UserRole.ATHLETE) {
      const athlete = await getLinkedAthlete(user.id);
      if (!athlete) {
        throw createApiError(404, "Athlete profile not found.");
      }

      where.athleteId = athlete.id;
    } else if (query.teamId) {
      const teamIds = await getAccessibleTeamIds(user);
      if (!teamIds.includes(query.teamId)) {
        throw createApiError(403, "You do not have access to that team.");
      }

      where.athlete = { teamId: query.teamId };
    } else {
      where.athlete = {
        teamId: {
          in: await getAccessibleTeamIds(user),
        },
      };
    }

    const rankings = await prisma.eventRanking.findMany({
      where,
      include: {
        rankingSource: true,
        athlete: { select: { id: true, name: true, teamId: true } },
      },
      orderBy: { recordedAt: "desc" },
    });

    return NextResponse.json(rankings);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const guardError = requireRole(session, "COACH", "AD");
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const body = await parseJsonBody(request, rankingPostSchema);

    if (body.type === "source") {
      const source = await prisma.rankingSource.create({
        data: {
          name: body.sourceName,
          type: body.sourceType ?? "MANUAL",
          details: toJsonValue(body.details),
        },
      });

      return NextResponse.json(source, { status: 201 });
    }

    await ensureAthleteAccess(user, body.athleteId);
    const rankingSourceId = await resolveRankingSourceId(body);

    const entry = await prisma.eventRanking.create({
      data: {
        athleteId: body.athleteId,
        rankingSourceId,
        eventName: body.eventName,
        rank: body.rank,
        region: body.region ?? null,
        score: body.score ?? null,
        recordedAt: body.recordedAt ? new Date(body.recordedAt) : undefined,
      },
      include: {
        rankingSource: true,
        athlete: { select: { id: true, name: true, teamId: true } },
      },
    });

    await recomputeAthleteAnalytics(body.athleteId);

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    const guardError = requireRole(session, "COACH", "AD");
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, rankingMutationQuerySchema);
    const body = await parseJsonBody(request, rankingEntrySchema);
    const existing = await prisma.eventRanking.findUnique({
      where: { id: query.id },
      select: { athleteId: true },
    });

    if (!existing) {
      throw createApiError(404, "Ranking entry not found.");
    }

    await ensureAthleteAccess(user, existing.athleteId);
    await ensureAthleteAccess(user, body.athleteId);
    const rankingSourceId = await resolveRankingSourceId(body);

    const entry = await prisma.eventRanking.update({
      where: { id: query.id },
      data: {
        athleteId: body.athleteId,
        rankingSourceId,
        eventName: body.eventName,
        rank: body.rank,
        region: body.region ?? null,
        score: body.score ?? null,
        recordedAt: body.recordedAt ? new Date(body.recordedAt) : undefined,
      },
      include: {
        rankingSource: true,
        athlete: { select: { id: true, name: true, teamId: true } },
      },
    });

    await recomputeAthleteAnalytics(body.athleteId);

    return NextResponse.json(entry);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const guardError = requireRole(session, "COACH", "AD");
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, rankingMutationQuerySchema);
    const existing = await prisma.eventRanking.findUnique({
      where: { id: query.id },
      select: { athleteId: true },
    });

    if (!existing) {
      throw createApiError(404, "Ranking entry not found.");
    }

    await ensureAthleteAccess(user, existing.athleteId);
    await prisma.eventRanking.delete({ where: { id: query.id } });
    await recomputeAthleteAnalytics(existing.athleteId);

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
