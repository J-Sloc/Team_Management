import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import { requireRole } from "@/lib/rbac";
import { NoteCategory } from "../../../generated/prisma";

type NotePayload = {
  athleteId?: string;
  category: NoteCategory;
  body: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const athleteId = url.searchParams.get("athleteId");
  const category = url.searchParams.get("category") as NoteCategory | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (athleteId) where.athleteId = athleteId;
  if (category) where.category = category;

  const notes = await prisma.note.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) return guardError;

  const body = (await request.json()) as NotePayload;
  if (!body.category || !body.body) {
    return NextResponse.json({ error: "category and body are required" }, { status: 400 });
  }

  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unable to resolve user" }, { status: 401 });
  }

  const note = await prisma.note.create({
    data: {
      athleteId: body.athleteId ?? null,
      userId,
      category: body.category,
      body: body.body,
    },
  });

  return NextResponse.json(note, { status: 201 });
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

  await prisma.note.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
