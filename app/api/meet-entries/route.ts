import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import {
  ensureAthleteAccess,
  ensureTeamAccess,
  getLinkedAthlete,
  resolveScopedTeamIds,
  type SessionUser,
} from "@/lib/access";
import {
  createApiError,
  handleApiError,
  parseJsonBody,
  parseSearchParams,
} from "@/lib/api";
import { requireRole, requireSession } from "@/lib/rbac";
import { UserRole } from "../../../generated/prisma";

const meetEntriesQuerySchema = z.object({
  teamId: z.string().min(1).optional(),
  athleteId: z.string().min(1).optional(),
});

const meetEntryMutationQuerySchema = z.object({
  id: z.string().min(1),
});

const meetEntrySchema = z.object({
  athleteId: z.string().min(1),
  teamId: z.string().min(1),
  eventName: z.string().trim().min(1),
  heat: z.string().trim().min(1).nullable().optional(),
  lane: z.string().trim().min(1).nullable().optional(),
  status: z.string().trim().min(1).nullable().optional(),
  importedFrom: z.string().trim().min(1).nullable().optional(),
});

const meetEntriesPostSchema = z.union([
  z.object({
    entries: z.array(meetEntrySchema).min(1),
  }),
  z.object({
    csvData: z.string().min(1),
  }),
]);

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

async function validateMeetEntryAccess(user: SessionUser, entry: z.infer<typeof meetEntrySchema>) {
  const athlete = await ensureAthleteAccess(user, entry.athleteId);
  await ensureTeamAccess(user, entry.teamId);

  if (athlete.teamId !== entry.teamId) {
    throw createApiError(400, "Each meet entry teamId must match the athlete's assigned team.");
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, meetEntriesQuerySchema);

    if (user.role === UserRole.ATHLETE) {
      const athlete = await getLinkedAthlete(user.id);
      if (!athlete) {
        throw createApiError(404, "Athlete profile not found.");
      }

      if (query.athleteId && query.athleteId !== athlete.id) {
        throw createApiError(403, "You do not have access to that athlete.");
      }

      if (query.teamId && query.teamId !== athlete.teamId) {
        throw createApiError(403, "You do not have access to that team.");
      }

      const entries = await prisma.meetEntry.findMany({
        where: { athleteId: athlete.id },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(entries);
    }

    const teamIds = await resolveScopedTeamIds(user, query.teamId);
    const entries = await prisma.meetEntry.findMany({
      where: {
        teamId: { in: teamIds },
        ...(query.athleteId ? { athleteId: query.athleteId } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        athlete: { select: { id: true, name: true } },
        team: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(entries);
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
    const body = await parseJsonBody(request, meetEntriesPostSchema);

    if ("csvData" in body) {
      return NextResponse.json(
        {
          message:
            "CSV import is deferred for this pass. Send structured entry data with entries[] for the current MVP.",
        },
        { status: 202 },
      );
    }

    for (const entry of body.entries) {
      await validateMeetEntryAccess(user, entry);
    }

    const created = await prisma.meetEntry.createMany({
      data: body.entries.map((entry) => ({
        athleteId: entry.athleteId,
        teamId: entry.teamId,
        eventName: entry.eventName,
        heat: entry.heat ?? null,
        lane: entry.lane ?? null,
        status: entry.status ?? null,
        importedFrom: entry.importedFrom ?? null,
        createdByUserId: user.id,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ createdCount: created.count }, { status: 201 });
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
    const query = parseSearchParams(request, meetEntryMutationQuerySchema);
    const body = await parseJsonBody(request, meetEntrySchema);
    const existing = await prisma.meetEntry.findUnique({
      where: { id: query.id },
      select: { id: true, athleteId: true, teamId: true },
    });

    if (!existing) {
      throw createApiError(404, "Meet entry not found.");
    }

    await ensureAthleteAccess(user, existing.athleteId);
    await ensureTeamAccess(user, existing.teamId);
    await validateMeetEntryAccess(user, body);

    const entry = await prisma.meetEntry.update({
      where: { id: query.id },
      data: {
        athleteId: body.athleteId,
        teamId: body.teamId,
        eventName: body.eventName,
        heat: body.heat ?? null,
        lane: body.lane ?? null,
        status: body.status ?? null,
        importedFrom: body.importedFrom ?? null,
      },
      include: {
        athlete: { select: { id: true, name: true } },
        team: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(entry);
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
    const query = parseSearchParams(request, meetEntryMutationQuerySchema);
    const existing = await prisma.meetEntry.findUnique({
      where: { id: query.id },
      select: { athleteId: true },
    });

    if (!existing) {
      throw createApiError(404, "Meet entry not found.");
    }

    await ensureAthleteAccess(user, existing.athleteId);
    await prisma.meetEntry.delete({ where: { id: query.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
