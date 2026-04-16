import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import {
  ensureAthleteAccess,
  getAccessibleTeamIds,
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
  MedicalStatus,
  Prisma,
  UserRole,
} from "../../../generated/prisma";

const healthRecordQuerySchema = z.object({
  id: z.string().min(1).optional(),
  athleteId: z.string().min(1).optional(),
  status: z.nativeEnum(MedicalStatus).optional(),
});

const healthRecordSchema = z.object({
  athleteId: z.string().min(1),
  injuryType: z.string().trim().min(1).nullable().optional(),
  injuryDate: dateLikeStringSchema.nullable().optional(),
  status: z.nativeEnum(MedicalStatus).nullable().optional(),
  rehabSessions: z.number().int().min(0).nullable().optional(),
  appointmentAttendance: z.number().min(0).max(100).nullable().optional(),
  notes: z.string().trim().min(1).nullable().optional(),
});

const healthRecordUpdateSchema = healthRecordSchema.partial();

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
    const query = parseSearchParams(request, healthRecordQuerySchema);
    const where: Prisma.HealthRecordWhereInput = {};

    if (query.athleteId) {
      const athlete = await ensureAthleteAccess(user, query.athleteId);
      where.athleteId = athlete.id;
    } else if (user.role === UserRole.ATHLETE) {
      const athlete = await prisma.athlete.findFirst({
        where: { userId: user.id },
        select: { id: true },
      });

      if (!athlete) {
        throw createApiError(404, "Athlete profile not found.");
      }

      where.athleteId = athlete.id;
    } else {
      where.athlete = {
        teamId: {
          in: await getAccessibleTeamIds(user),
        },
      };
    }

    if (query.status) where.status = query.status;

    const records = await prisma.healthRecord.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        athlete: { select: { id: true, name: true, teamId: true } },
      },
    });

    return NextResponse.json(records);
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
    const body = await parseJsonBody(request, healthRecordSchema);

    await ensureAthleteAccess(user, body.athleteId);

    const record = await prisma.healthRecord.create({
      data: {
        athleteId: body.athleteId,
        injuryType: body.injuryType ?? null,
        injuryDate: body.injuryDate ? new Date(body.injuryDate) : null,
        status: body.status ?? null,
        rehabSessions: body.rehabSessions ?? null,
        appointmentAttendance: body.appointmentAttendance ?? null,
        notes: body.notes ?? null,
      },
    });

    return NextResponse.json(record, { status: 201 });
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
    const query = parseSearchParams(request, healthRecordQuerySchema);
    if (!query.id) {
      throw createApiError(400, "id is required");
    }

    const body = await parseJsonBody(request, healthRecordUpdateSchema);
    const existingRecord = await prisma.healthRecord.findUnique({
      where: { id: query.id },
      select: { athleteId: true },
    });

    if (!existingRecord) {
      throw createApiError(404, "Health record not found.");
    }

    await ensureAthleteAccess(user, body.athleteId ?? existingRecord.athleteId);

    const updated = await prisma.healthRecord.update({
      where: { id: query.id },
      data: {
        athleteId: body.athleteId,
        injuryType: body.injuryType,
        injuryDate: body.injuryDate ? new Date(body.injuryDate) : body.injuryDate === null ? null : undefined,
        status: body.status,
        rehabSessions: body.rehabSessions,
        appointmentAttendance: body.appointmentAttendance,
        notes: body.notes,
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
    const query = parseSearchParams(request, healthRecordQuerySchema);
    if (!query.id) {
      throw createApiError(400, "id is required");
    }

    const existingRecord = await prisma.healthRecord.findUnique({
      where: { id: query.id },
      select: { athleteId: true },
    });

    if (!existingRecord) {
      throw createApiError(404, "Health record not found.");
    }

    await ensureAthleteAccess(user, existingRecord.athleteId);
    await prisma.healthRecord.delete({ where: { id: query.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
