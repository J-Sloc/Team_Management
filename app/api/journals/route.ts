import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import {
  ensureAthleteAccess,
  getLinkedAthlete,
  type SessionUser,
} from "@/lib/access";
import {
  createApiError,
  handleApiError,
  parseJsonBody,
  parseSearchParams,
} from "@/lib/api";
import { requireSession } from "@/lib/rbac";
import { UserRole } from "../../../generated/prisma";

const journalQuerySchema = z.object({
  athleteId: z.string().min(1),
});

const journalMutationQuerySchema = z.object({
  id: z.string().min(1),
});

const journalSchema = z.object({
  athleteId: z.string().min(1),
  title: z.string().trim().min(1).nullable().optional(),
  body: z.string().trim().min(1),
  visibility: z.string().trim().min(1).nullable().optional(),
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
    const query = parseSearchParams(request, journalQuerySchema);

    await ensureAthleteAccess(user, query.athleteId);

    const journals = await prisma.athleteJournal.findMany({
      where: { athleteId: query.athleteId },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(journals);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const body = await parseJsonBody(request, journalSchema);

    if (user.role === UserRole.ATHLETE) {
      const linkedAthlete = await getLinkedAthlete(user.id);
      if (!linkedAthlete || linkedAthlete.id !== body.athleteId) {
        throw createApiError(403, "You do not have access to that athlete.");
      }
    } else {
      await ensureAthleteAccess(user, body.athleteId);
    }

    const journal = await prisma.athleteJournal.create({
      data: {
        athleteId: body.athleteId,
        authorId: user.id,
        authorRole: user.role,
        title: body.title ?? null,
        body: body.body,
        visibility: body.visibility ?? "PRIVATE",
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(journal, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, journalMutationQuerySchema);
    const journal = await prisma.athleteJournal.findUnique({
      where: { id: query.id },
      select: {
        id: true,
        athleteId: true,
        authorId: true,
      },
    });

    if (!journal) {
      throw createApiError(404, "Journal entry not found.");
    }

    if (journal.authorId !== user.id) {
      if (user.role !== UserRole.COACH && user.role !== UserRole.AD) {
        throw createApiError(403, "You do not have permission to delete this journal entry.");
      }

      await ensureAthleteAccess(user, journal.athleteId);
    }

    await prisma.athleteJournal.delete({ where: { id: query.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
