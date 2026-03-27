// app/api/athletes/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import { requireRole } from "@/lib/rbac";
import { AcademicStanding, MedicalStatus, ComplianceStatus, RiskFlag } from "../../../generated/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateEventRecords(events: string[], eventRecords?: Record<string, any>) {
  if (!eventRecords) return;
  const recordKeys = Object.keys(eventRecords);
  if (!recordKeys.every(key => events.includes(key))) {
    throw new Error("Event records must match the athlete's events.");
  }
}

type AthletePayload = {
  name: string;
  teamId: string;
  jerseyNumber?: number;
  height?: number;
  weight?: number;
  sport?: string;
  events?: string[];
  eventRecords?: Record<string, { personalBest: number; historical: number[] }>;
  classYear?: string;
  gpa?: number;
  academicStanding?: AcademicStanding | null;
  eligibilityYearsLeft?: number;
  medicalStatus?: MedicalStatus | null;
  complianceStatus?: ComplianceStatus | null;
  riskFlag?: RiskFlag | null;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const teamId = url.searchParams.get("teamId");

  const athletes = await prisma.athlete.findMany({
    where: teamId ? { teamId } : {},
    orderBy: { name: "asc" },
    include: { team: { select: { id: true, name: true } } },
  });

  return NextResponse.json(athletes);
}

export async function POST(request: Request) {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) return guardError;

  const body = (await request.json()) as AthletePayload;
  if (!body.name || !body.teamId) {
    return NextResponse.json(
      { error: "name and teamId are required" },
      { status: 400 }
    );
  }

  validateEventRecords(body.events || [], body.eventRecords);

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
      eventRecords: body.eventRecords || undefined,
      gpa: body.gpa ?? null,
      academicStanding: body.academicStanding ?? null,
      eligibilityYearsLeft: body.eligibilityYearsLeft ?? null,
      medicalStatus: body.medicalStatus ?? null,
      complianceStatus: body.complianceStatus ?? null,
      riskFlag: body.riskFlag ?? null,
    },
  });

  return NextResponse.json(athlete, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) return guardError;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const body = (await request.json()) as Partial<AthletePayload>;

  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const updated = await prisma.athlete.update({
    where: { id },
    data: {
      name: body.name,
      teamId: body.teamId,
      jerseyNumber: body.jerseyNumber,
      height: body.height,
      weight: body.weight,
      classYear: body.classYear,
      sport: body.sport,
      events: body.events,
      eventRecords: body.eventRecords || undefined,
      gpa: body.gpa,
      academicStanding: body.academicStanding,
      eligibilityYearsLeft: body.eligibilityYearsLeft,
      medicalStatus: body.medicalStatus,
      complianceStatus: body.complianceStatus,
      riskFlag: body.riskFlag,
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
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  await prisma.athlete.delete({ where: { id } });
  return NextResponse.json({ success: true });
}