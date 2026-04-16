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
  handleApiError,
  parseJsonBody,
  parseSearchParams,
} from "@/lib/api";
import { requireRole, requireSession } from "@/lib/rbac";
import {
  AcademicStanding,
  ComplianceStatus,
  Prisma,
  UserRole,
} from "../../../generated/prisma";

const academicRecordQuerySchema = z.object({
  id: z.string().min(1).optional(),
  athleteId: z.string().min(1).optional(),
  semester: z.string().min(1).optional(),
  academicStanding: z.nativeEnum(AcademicStanding).optional(),
});

const academicRecordSchema = z.object({
  athleteId: z.string().min(1),
  semester: z.string().trim().min(1),
  finalScore: z.number().nullable().optional(),
  termGpa: z.number().min(0).max(4).nullable().optional(),
  academicStanding: z.nativeEnum(AcademicStanding).nullable().optional(),
  complianceStatus: z.nativeEnum(ComplianceStatus).nullable().optional(),
  attendancePercent: z.number().min(0).max(100).nullable().optional(),
  tutoringHours: z.number().min(0).nullable().optional(),
  advisorNotes: z.string().trim().min(1).nullable().optional(),
});

const academicRecordUpdateSchema = academicRecordSchema.partial();

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
    const query = parseSearchParams(request, academicRecordQuerySchema);
    const where: Prisma.AcademicRecordWhereInput = {};

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

    if (query.semester) where.semester = query.semester;
    if (query.academicStanding) where.academicStanding = query.academicStanding;

    const records = await prisma.academicRecord.findMany({
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
    const body = await parseJsonBody(request, academicRecordSchema);

    await ensureAthleteAccess(user, body.athleteId);

    const record = await prisma.academicRecord.create({
      data: {
        athleteId: body.athleteId,
        semester: body.semester,
        finalScore: body.finalScore ?? null,
        termGpa: body.termGpa ?? null,
        academicStanding: body.academicStanding ?? null,
        complianceStatus: body.complianceStatus ?? null,
        attendancePercent: body.attendancePercent ?? null,
        tutoringHours: body.tutoringHours ?? null,
        advisorNotes: body.advisorNotes ?? null,
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
    const query = parseSearchParams(request, academicRecordQuerySchema);
    if (!query.id) {
      throw createApiError(400, "id is required");
    }

    const body = await parseJsonBody(request, academicRecordUpdateSchema);
    const existingRecord = await prisma.academicRecord.findUnique({
      where: { id: query.id },
      select: { athleteId: true },
    });

    if (!existingRecord) {
      throw createApiError(404, "Academic record not found.");
    }

    await ensureAthleteAccess(user, body.athleteId ?? existingRecord.athleteId);

    const updated = await prisma.academicRecord.update({
      where: { id: query.id },
      data: {
        athleteId: body.athleteId,
        semester: body.semester,
        finalScore: body.finalScore,
        termGpa: body.termGpa,
        academicStanding: body.academicStanding,
        complianceStatus: body.complianceStatus,
        attendancePercent: body.attendancePercent,
        tutoringHours: body.tutoringHours,
        advisorNotes: body.advisorNotes,
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
    const query = parseSearchParams(request, academicRecordQuerySchema);
    if (!query.id) {
      throw createApiError(400, "id is required");
    }

    const existingRecord = await prisma.academicRecord.findUnique({
      where: { id: query.id },
      select: { athleteId: true },
    });

    if (!existingRecord) {
      throw createApiError(404, "Academic record not found.");
    }

    await ensureAthleteAccess(user, existingRecord.athleteId);
    await prisma.academicRecord.delete({ where: { id: query.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
