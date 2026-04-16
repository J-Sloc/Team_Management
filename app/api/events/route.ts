import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import {
  ensureTeamAccess,
  getLinkedAthlete,
  resolveScopedTeamIds,
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
  EventGroup,
  EventType,
  Prisma,
  UserRole,
} from "../../../generated/prisma";

const eventQuerySchema = z.object({
  id: z.string().min(1).optional(),
  teamId: z.string().min(1).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

const eventSchema = z.object({
  teamId: z.string().min(1),
  type: z.nativeEnum(EventType),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1).nullable().optional(),
  startTime: dateLikeStringSchema,
  endTime: dateLikeStringSchema,
  location: z.string().trim().min(1).nullable().optional(),
  opponent: z.string().trim().min(1).nullable().optional(),
  group: z.nativeEnum(EventGroup),
});

const eventUpdateSchema = eventSchema.partial();

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
    const query = parseSearchParams(request, eventQuerySchema);
    const where: Prisma.EventWhereInput = {};

    if (user.role === UserRole.ATHLETE) {
      const athlete = await getLinkedAthlete(user.id);
      if (!athlete) {
        throw createApiError(404, "Athlete profile not found.");
      }

      if (query.teamId && query.teamId !== athlete.teamId) {
        throw createApiError(403, "You do not have access to that team.");
      }

      where.teamId = athlete.teamId;
    } else {
      const teamIds = await resolveScopedTeamIds(user, query.teamId);
      where.teamId = { in: teamIds };
    }

    if (query.from || query.to) {
      where.startTime = {};
      if (query.from) where.startTime.gte = new Date(query.from);
      if (query.to) where.startTime.lte = new Date(query.to);
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { startTime: "asc" },
      include: {
        team: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(events);
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
    const body = await parseJsonBody(request, eventSchema);

    await ensureTeamAccess(user, body.teamId);

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
        createdByUserId: user.id,
      },
    });

    return NextResponse.json(event, { status: 201 });
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
    const query = parseSearchParams(request, eventQuerySchema);
    if (!query.id) {
      throw createApiError(400, "id is required");
    }

    const body = await parseJsonBody(request, eventUpdateSchema);
    const existingEvent = await prisma.event.findUnique({
      where: { id: query.id },
      select: { teamId: true },
    });

    if (!existingEvent) {
      throw createApiError(404, "Event not found.");
    }

    await ensureTeamAccess(user, existingEvent.teamId);
    if (body.teamId) {
      await ensureTeamAccess(user, body.teamId);
    }

    const updated = await prisma.event.update({
      where: { id: query.id },
      data: {
        teamId: body.teamId,
        type: body.type,
        title: body.title,
        description: body.description,
        startTime: body.startTime ? new Date(body.startTime) : undefined,
        endTime: body.endTime ? new Date(body.endTime) : undefined,
        location: body.location,
        opponent: body.opponent,
        group: body.group,
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
    const query = parseSearchParams(request, eventQuerySchema);
    if (!query.id) {
      throw createApiError(400, "id is required");
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: query.id },
      select: { teamId: true },
    });

    if (!existingEvent) {
      throw createApiError(404, "Event not found.");
    }

    await ensureTeamAccess(user, existingEvent.teamId);
    await prisma.event.delete({ where: { id: query.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
