import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import { requireRole } from "@/lib/rbac";
import { AcademicStanding, ComplianceStatus } from "../../../generated/prisma";

type AcademicRecordPayload = {
  athleteId: string;
  semester: string;
  finalScore?: number;
  termGpa?: number;
  academicStanding?: AcademicStanding | null;
  complianceStatus?: ComplianceStatus | null;
  attendancePercent?: number;
  tutoringHours?: number;
  advisorNotes?: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const athleteId = url.searchParams.get("athleteId");
  const semester = url.searchParams.get("semester");
  const academicStanding = url.searchParams.get("academicStanding") as AcademicStanding | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (athleteId) where.athleteId = athleteId;
  if (semester) where.semester = semester;
  if (academicStanding) where.academicStanding = academicStanding;

  const records = await prisma.academicRecord.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json(records);
}

export async function POST(request: Request) {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) return guardError;

  const body = (await request.json()) as AcademicRecordPayload;
  if (!body.athleteId || !body.semester) {
    return NextResponse.json({ error: "athleteId and semester are required" }, { status: 400 });
  }

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
}

export async function PUT(request: Request) {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) return guardError;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const body = (await request.json()) as Partial<AcademicRecordPayload>;

  const updated = await prisma.academicRecord.update({
    where: { id },
    data: {
      semester: body.semester,
      finalScore: body.finalScore,
      termGpa: body.termGpa,
      academicStanding: body.academicStanding ?? undefined,
      complianceStatus: body.complianceStatus ?? undefined,
      attendancePercent: body.attendancePercent,
      tutoringHours: body.tutoringHours,
      advisorNotes: body.advisorNotes,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) return guardError;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await prisma.academicRecord.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
