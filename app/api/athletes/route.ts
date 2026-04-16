import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import { requireRole, requireSession } from "@/lib/rbac";
import {
  ensureAthleteAccess,
  ensureTeamAccess,
  getLinkedAthleteIds,
  resolveScopedTeamIds,
  type SessionUser,
} from "@/lib/access";
import {
  createApiError,
  handleApiError,
  parseJsonBody,
  parseSearchParams,
} from "@/lib/api";
import {
  AcademicStanding,
  ComplianceStatus,
  MedicalStatus,
  Prisma,
  RiskFlag,
  UserRole,
} from "../../../generated/prisma";

const athleteQuerySchema = z.object({
  teamId: z.string().min(1).optional(),
});

const athleteEventRecordSchema = z.object({
  personalBest: z.number().optional(),
  historical: z.array(z.number()).optional(),
});

const baseAthleteSchema = z.object({
  name: z.string().trim().min(1).optional(),
  teamId: z.string().min(1).optional(),
  jerseyNumber: z.number().int().nullable().optional(),
  height: z.number().nullable().optional(),
  weight: z.number().nullable().optional(),
  sport: z.string().trim().min(1).nullable().optional(),
  events: z.array(z.string().trim().min(1)).optional(),
  eventRecords: z.record(z.string(), athleteEventRecordSchema).optional(),
  classYear: z.string().trim().min(1).nullable().optional(),
  gpa: z.number().min(0).max(4).nullable().optional(),
  academicStanding: z.nativeEnum(AcademicStanding).nullable().optional(),
  eligibilityYearsLeft: z.number().min(0).max(8).nullable().optional(),
  medicalStatus: z.nativeEnum(MedicalStatus).nullable().optional(),
  complianceStatus: z.nativeEnum(ComplianceStatus).nullable().optional(),
  riskFlag: z.nativeEnum(RiskFlag).nullable().optional(),
});

const createAthleteSchema = baseAthleteSchema.extend({
  name: z.string().trim().min(1),
  teamId: z.string().min(1),
});

const updateAthleteQuerySchema = z.object({
  id: z.string().min(1),
});

function validateEventRecords(
  events: string[],
  eventRecords?: Record<string, z.infer<typeof athleteEventRecordSchema>>,
) {
  if (!eventRecords) {
    return;
  }

  const recordKeys = Object.keys(eventRecords);
  const hasInvalidEvent = recordKeys.some((key) => !events.includes(key));

  if (hasInvalidEvent) {
    throw createApiError(
      400,
      "Event records must match the athlete's assigned events.",
    );
  }
}

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
    const query = parseSearchParams(request, athleteQuerySchema);

    if (user.role === UserRole.ATHLETE) {
      const athleteIds = await getLinkedAthleteIds(user.id);
      const athletes = await prisma.athlete.findMany({
        where: {
          id: { in: athleteIds },
          ...(query.teamId ? { teamId: query.teamId } : {}),
        },
        orderBy: { name: "asc" },
        include: { team: { select: { id: true, name: true } } },
      });

      return NextResponse.json(athletes);
    }

    const teamIds = await resolveScopedTeamIds(user, query.teamId);
    const athletes = await prisma.athlete.findMany({
      where: { teamId: { in: teamIds } },
      orderBy: { name: "asc" },
      include: { team: { select: { id: true, name: true } } },
    });

    return NextResponse.json(athletes);
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
    const body = await parseJsonBody(request, createAthleteSchema);

    await ensureTeamAccess(user, body.teamId);
    validateEventRecords(body.events ?? [], body.eventRecords);

    const athlete = await prisma.athlete.create({
      data: {
        name: body.name,
        teamId: body.teamId,
        jerseyNumber: body.jerseyNumber ?? null,
        height: body.height ?? null,
        weight: body.weight ?? null,
        classYear: body.classYear ?? null,
        sport: body.sport ?? null,
        events: body.events ?? [],
        eventRecords: body.eventRecords as Prisma.InputJsonValue | undefined,
        gpa: body.gpa ?? null,
        academicStanding: body.academicStanding ?? null,
        eligibilityYearsLeft: body.eligibilityYearsLeft ?? null,
        medicalStatus: body.medicalStatus ?? null,
        complianceStatus: body.complianceStatus ?? null,
        riskFlag: body.riskFlag ?? null,
      },
    });

    return NextResponse.json(athlete, { status: 201 });
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
    const query = parseSearchParams(request, updateAthleteQuerySchema);
    const body = await parseJsonBody(request, baseAthleteSchema);
    const athlete = await ensureAthleteAccess(user, query.id);

    if (body.teamId) {
      await ensureTeamAccess(user, body.teamId);
    }

    const currentAthlete = await prisma.athlete.findUnique({
      where: { id: athlete.id },
      select: { events: true },
    });

    validateEventRecords(body.events ?? currentAthlete?.events ?? [], body.eventRecords);

    const updated = await prisma.athlete.update({
      where: { id: query.id },
      data: {
        name: body.name,
        teamId: body.teamId,
        jerseyNumber: body.jerseyNumber,
        height: body.height,
        weight: body.weight,
        classYear: body.classYear,
        sport: body.sport,
        events: body.events,
        eventRecords: body.eventRecords as Prisma.InputJsonValue | undefined,
        gpa: body.gpa,
        academicStanding: body.academicStanding,
        eligibilityYearsLeft: body.eligibilityYearsLeft,
        medicalStatus: body.medicalStatus,
        complianceStatus: body.complianceStatus,
        riskFlag: body.riskFlag,
      },
    });

    return NextResponse.json(updated);
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
    const query = parseSearchParams(request, updateAthleteQuerySchema);

    await ensureAthleteAccess(user, query.id);
    await prisma.athlete.delete({ where: { id: query.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
