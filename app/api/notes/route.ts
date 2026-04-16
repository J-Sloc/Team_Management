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
import { requireRole } from "@/lib/rbac";
import { NoteCategory, Prisma } from "../../../generated/prisma";

const noteQuerySchema = z.object({
  id: z.string().min(1).optional(),
  athleteId: z.string().min(1).optional(),
  category: z.nativeEnum(NoteCategory).optional(),
});

const noteSchema = z.object({
  athleteId: z.string().min(1).optional(),
  category: z.nativeEnum(NoteCategory),
  body: z.string().trim().min(1),
});

const noteUpdateSchema = noteSchema.partial();

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

async function ensureNoteAccess(user: SessionUser, noteId: string) {
  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: {
      athlete: {
        select: {
          id: true,
          teamId: true,
        },
      },
    },
  });

  if (!note) {
    throw createApiError(404, "Note not found.");
  }

  if (!note.athleteId) {
    if (note.userId !== user.id) {
      throw createApiError(403, "You do not have access to that note.");
    }

    return note;
  }

  await ensureAthleteAccess(user, note.athleteId);
  return note;
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    const guardError = requireRole(session, "COACH", "AD");
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, noteQuerySchema);
    const where: Prisma.NoteWhereInput = {};

    if (query.athleteId) {
      await ensureAthleteAccess(user, query.athleteId);
      where.athleteId = query.athleteId;
    } else {
      const teamIds = await getAccessibleTeamIds(user);
      where.OR = [
        {
          athlete: {
            teamId: { in: teamIds },
          },
        },
        {
          athleteId: null,
          userId: user.id,
        },
      ];
    }

    if (query.category) {
      where.category = query.category;
    }

    const notes = await prisma.note.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        athlete: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(notes);
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
    const body = await parseJsonBody(request, noteSchema);

    if (body.athleteId) {
      await ensureAthleteAccess(user, body.athleteId);
    }

    const note = await prisma.note.create({
      data: {
        athleteId: body.athleteId ?? null,
        userId: user.id,
        category: body.category,
        body: body.body,
      },
    });

    return NextResponse.json(note, { status: 201 });
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
    const query = parseSearchParams(request, noteQuerySchema);
    if (!query.id) {
      throw createApiError(400, "id is required");
    }

    const body = await parseJsonBody(request, noteUpdateSchema);
    const note = await ensureNoteAccess(user, query.id);

    if (body.athleteId) {
      await ensureAthleteAccess(user, body.athleteId);
    } else if (body.athleteId === undefined && note.athleteId) {
      await ensureAthleteAccess(user, note.athleteId);
    }

    const updated = await prisma.note.update({
      where: { id: query.id },
      data: {
        athleteId: body.athleteId ?? (body.athleteId === undefined ? undefined : null),
        category: body.category,
        body: body.body,
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
    const query = parseSearchParams(request, noteQuerySchema);
    if (!query.id) {
      throw createApiError(400, "id is required");
    }

    await ensureNoteAccess(user, query.id);
    await prisma.note.delete({ where: { id: query.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
