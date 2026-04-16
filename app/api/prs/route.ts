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
import { requireRole, requireSession } from "@/lib/rbac";
import {
  MeasurementUnit,
  Prisma,
  UserRole,
} from "../../../generated/prisma";

const prQuerySchema = z.object({
  athleteId: z.string().min(1).optional(),
  teamId: z.string().min(1).optional(),
});

const prSchema = z.object({
  athleteId: z.string().min(1),
  eventName: z.string().trim().min(1),
  result: z.number(),
  unit: z.nativeEnum(MeasurementUnit),
  recordedAt: dateLikeStringSchema.optional(),
  notes: z.string().trim().min(1).nullable().optional(),
});

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

export async function GET(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, prQuerySchema);
    const where: Prisma.PersonalRecordWhereInput = {};

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

    const prs = await prisma.personalRecord.findMany({
      where,
      orderBy: { recordedAt: "desc" },
      include: {
        athlete: { select: { id: true, name: true, teamId: true } },
      },
    });

    return NextResponse.json(prs);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const guardError = requireRole(session, "COACH", "AD", "ATHLETE");
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const body = await parseJsonBody(request, prSchema);

    await ensureAthleteAccess(user, body.athleteId);

    const pr = await prisma.personalRecord.create({
      data: {
        athleteId: body.athleteId,
        eventName: body.eventName,
        result: body.result,
        unit: body.unit,
        recordedAt: body.recordedAt ? new Date(body.recordedAt) : undefined,
        notes: body.notes ?? null,
      },
    });

    return NextResponse.json(pr, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
