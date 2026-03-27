import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import { requireRole } from "@/lib/rbac";
import { EventType, EventGroup } from "../../../generated/prisma";

type EventPayload = {
  teamId: string;
  type: EventType;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  opponent?: string;
  group: EventGroup;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const teamId = url.searchParams.get("teamId");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (teamId) where.teamId = teamId;
  if (from || to) {
    where.startTime = {};
    if (from) where.startTime.gte = new Date(from);
    if (to) where.startTime.lte = new Date(to);
  }

  const events = await prisma.event.findMany({ where, orderBy: { startTime: "asc" } });
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) return guardError;

  const body = (await request.json()) as EventPayload;
  if (!body.teamId || !body.type || !body.title || !body.startTime || !body.endTime || !body.group) {
    return NextResponse.json({ error: "teamId, type, title, startTime, endTime, group are required" }, { status: 400 });
  }

  const event = await prisma.event.create({
    data: {
      teamId: body.teamId,
      type: body.type,
      title: body.title,
      description: body.description ?? null,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      location: body.location ?? null,
      opponent: body.opponent ?? null,
      group: body.group,
      createdByUserId: session?.user?.id ?? null,
    },
  });

  return NextResponse.json(event, { status: 201 });
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

  const body = (await request.json()) as Partial<EventPayload>;
  const updated = await prisma.event.update({
    where: { id },
    data: {
      type: body.type,
      title: body.title,
      description: body.description ?? undefined,
      startTime: body.startTime ? new Date(body.startTime) : undefined,
      endTime: body.endTime ? new Date(body.endTime) : undefined,
      location: body.location ?? undefined,
      opponent: body.opponent ?? undefined,
      group: body.group,
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

  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
