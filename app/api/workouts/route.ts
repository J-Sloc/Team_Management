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
  dateLikeStringSchema,
  handleApiError,
  parseJsonBody,
  parseSearchParams,
} from "@/lib/api";
import { requireRole, requireSession } from "@/lib/rbac";
import { MeasurementUnit, Prisma, Sport, UserRole } from "../../../generated/prisma";

const workoutQuerySchema = z.object({
  teamId: z.string().min(1).optional(),
  athleteId: z.string().min(1).optional(),
});

const workoutMutationQuerySchema = z.object({
  id: z.string().min(1),
  type: z.enum(["template", "instance"]),
});

const workoutMetricSchema = z.object({
  name: z.string().trim().min(1),
  targetValue: z.number().nullable().optional(),
  unit: z.nativeEnum(MeasurementUnit).nullable().optional(),
  params: z.unknown().nullable().optional(),
});

const workoutTemplateSchema = z.object({
  teamId: z.string().min(1),
  name: z.string().trim().min(1),
  description: z.string().trim().min(1).nullable().optional(),
  sport: z.nativeEnum(Sport),
  params: z.unknown().nullable().optional(),
  metrics: z.array(workoutMetricSchema).optional(),
});

const workoutInstanceSchema = z.object({
  athleteId: z.string().min(1),
  workoutTemplateId: z.string().min(1).nullable().optional(),
  performedAt: dateLikeStringSchema.optional(),
  notes: z.string().trim().min(1).nullable().optional(),
  results: z.unknown().nullable().optional(),
});

const workoutPostSchema = z.union([
  z.object({
    type: z.literal("template"),
    ...workoutTemplateSchema.shape,
  }),
  z.object({
    type: z.literal("instance"),
    ...workoutInstanceSchema.shape,
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

function toJsonValue(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return Prisma.JsonNull;
  }

  return value as Prisma.InputJsonValue;
}

async function resolveTemplateForInstance(workoutTemplateId: string, athleteId: string) {
  const [template, athlete] = await Promise.all([
    prisma.workoutTemplate.findUnique({
      where: { id: workoutTemplateId },
      select: { id: true, teamId: true },
    }),
    prisma.athlete.findUnique({
      where: { id: athleteId },
      select: { teamId: true },
    }),
  ]);

  if (!template) {
    throw createApiError(404, "Workout template not found.");
  }

  if (!athlete || athlete.teamId !== template.teamId) {
    throw createApiError(400, "Workout template team must match the athlete's assigned team.");
  }

  return template;
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const query = parseSearchParams(request, workoutQuerySchema);

    if (query.athleteId) {
      const athlete = await ensureAthleteAccess(user, query.athleteId);
      const instances = await prisma.workoutInstance.findMany({
        where: { athleteId: athlete.id },
        orderBy: { performedAt: "desc" },
        include: {
          workoutTemplate: { include: { metrics: true } },
          athlete: { select: { id: true, name: true, userId: true, teamId: true } },
        },
      });

      return NextResponse.json(instances);
    }

    if (user.role === UserRole.ATHLETE) {
      const athlete = await getLinkedAthlete(user.id);
      if (!athlete) {
        throw createApiError(404, "Athlete profile not found.");
      }

      if (query.teamId && query.teamId !== athlete.teamId) {
        throw createApiError(403, "You do not have access to that team.");
      }

      const templates = await prisma.workoutTemplate.findMany({
        where: { teamId: athlete.teamId },
        orderBy: { createdAt: "desc" },
        include: { metrics: true },
      });

      return NextResponse.json(templates);
    }

    const teamIds = await resolveScopedTeamIds(user, query.teamId);
    const templates = await prisma.workoutTemplate.findMany({
      where: { teamId: { in: teamIds } },
      orderBy: { createdAt: "desc" },
      include: { metrics: true },
    });

    return NextResponse.json(templates);
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
    const body = await parseJsonBody(request, workoutPostSchema);

    if (body.type === "template") {
      if (user.role !== UserRole.COACH && user.role !== UserRole.AD) {
        throw createApiError(403, "Only coaches and ADs can create workout templates.");
      }

      await ensureTeamAccess(user, body.teamId);

      const template = await prisma.workoutTemplate.create({
        data: {
          teamId: body.teamId,
          createdByUserId: user.id,
          name: body.name,
          description: body.description ?? null,
          sport: body.sport,
          params: toJsonValue(body.params),
          metrics: {
            create:
              body.metrics?.map((metric) => ({
                name: metric.name,
                targetValue: metric.targetValue ?? null,
                unit: metric.unit ?? null,
                params: toJsonValue(metric.params),
              })) ?? [],
          },
        },
        include: { metrics: true },
      });

      return NextResponse.json(template, { status: 201 });
    }

    await ensureAthleteAccess(user, body.athleteId);

    if (body.workoutTemplateId) {
      const template = await resolveTemplateForInstance(body.workoutTemplateId, body.athleteId);
      await ensureTeamAccess(user, template.teamId);
    }

    const instance = await prisma.workoutInstance.create({
      data: {
        workoutTemplateId: body.workoutTemplateId ?? null,
        athleteId: body.athleteId,
        createdByUserId: user.id,
        performedAt: body.performedAt ? new Date(body.performedAt) : undefined,
        notes: body.notes ?? null,
        results: toJsonValue(body.results),
      },
      include: {
        workoutTemplate: { include: { metrics: true } },
        athlete: { select: { id: true, name: true, userId: true, teamId: true } },
      },
    });

    return NextResponse.json(instance, { status: 201 });
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
    const query = parseSearchParams(request, workoutMutationQuerySchema);

    if (query.type === "template") {
      const body = await parseJsonBody(request, workoutTemplateSchema);
      const existing = await prisma.workoutTemplate.findUnique({
        where: { id: query.id },
        select: { id: true, teamId: true },
      });

      if (!existing) {
        throw createApiError(404, "Workout template not found.");
      }

      await ensureTeamAccess(user, existing.teamId);
      await ensureTeamAccess(user, body.teamId);

      const template = await prisma.workoutTemplate.update({
        where: { id: query.id },
        data: {
          teamId: body.teamId,
          name: body.name,
          description: body.description ?? null,
          sport: body.sport,
          params: toJsonValue(body.params),
          metrics: {
            deleteMany: {},
            create:
              body.metrics?.map((metric) => ({
                name: metric.name,
                targetValue: metric.targetValue ?? null,
                unit: metric.unit ?? null,
                params: toJsonValue(metric.params),
              })) ?? [],
          },
        },
        include: { metrics: true },
      });

      return NextResponse.json(template);
    }

    const body = await parseJsonBody(request, workoutInstanceSchema);
    const existing = await prisma.workoutInstance.findUnique({
      where: { id: query.id },
      select: { id: true, athleteId: true },
    });

    if (!existing) {
      throw createApiError(404, "Workout instance not found.");
    }

    await ensureAthleteAccess(user, existing.athleteId);
    await ensureAthleteAccess(user, body.athleteId);

    if (body.workoutTemplateId) {
      const template = await resolveTemplateForInstance(body.workoutTemplateId, body.athleteId);
      await ensureTeamAccess(user, template.teamId);
    }

    const instance = await prisma.workoutInstance.update({
      where: { id: query.id },
      data: {
        workoutTemplateId: body.workoutTemplateId ?? null,
        athleteId: body.athleteId,
        performedAt: body.performedAt ? new Date(body.performedAt) : undefined,
        notes: body.notes ?? null,
        results: toJsonValue(body.results),
      },
      include: {
        workoutTemplate: { include: { metrics: true } },
        athlete: { select: { id: true, name: true, userId: true, teamId: true } },
      },
    });

    return NextResponse.json(instance);
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
    const query = parseSearchParams(request, workoutMutationQuerySchema);

    if (query.type === "template") {
      const template = await prisma.workoutTemplate.findUnique({
        where: { id: query.id },
        select: { id: true, teamId: true },
      });

      if (!template) {
        throw createApiError(404, "Workout template not found.");
      }

      await ensureTeamAccess(user, template.teamId);

      await prisma.$transaction([
        prisma.workoutInstance.updateMany({
          where: { workoutTemplateId: query.id },
          data: { workoutTemplateId: null },
        }),
        prisma.workoutMetric.deleteMany({
          where: { workoutTemplateId: query.id },
        }),
        prisma.workoutTemplate.delete({
          where: { id: query.id },
        }),
      ]);

      return NextResponse.json({ success: true });
    }

    const instance = await prisma.workoutInstance.findUnique({
      where: { id: query.id },
      select: { id: true, athleteId: true },
    });

    if (!instance) {
      throw createApiError(404, "Workout instance not found.");
    }

    await ensureAthleteAccess(user, instance.athleteId);
    await prisma.workoutInstance.delete({ where: { id: query.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
