import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import { requireRole } from "@/lib/rbac";
import { MedicalStatus } from "../../../generated/prisma";

type HealthRecordPayload = {
  athleteId: string;
  injuryType?: string;
  injuryDate?: string;
  status?: MedicalStatus | null;
  rehabSessions?: number;
  appointmentAttendance?: number;
  notes?: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const athleteId = url.searchParams.get("athleteId");
  const status = url.searchParams.get("status") as MedicalStatus | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (athleteId) where.athleteId = athleteId;
  if (status) where.status = status;

  const records = await prisma.healthRecord.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json(records);
}

export async function POST(request: Request) {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) return guardError;

  const body = (await request.json()) as HealthRecordPayload;
  if (!body.athleteId) {
    return NextResponse.json({ error: "athleteId is required" }, { status: 400 });
  }

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

  const body = (await request.json()) as Partial<HealthRecordPayload>;

  const updated = await prisma.healthRecord.update({
    where: { id },
    data: {
      injuryType: body.injuryType,
      injuryDate: body.injuryDate ? new Date(body.injuryDate) : undefined,
      status: body.status ?? undefined,
      rehabSessions: body.rehabSessions,
      appointmentAttendance: body.appointmentAttendance,
      notes: body.notes,
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

  await prisma.healthRecord.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
