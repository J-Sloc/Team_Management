import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import {
  createApiError,
  handleApiError,
  parseJsonBody,
} from "@/lib/api";
import { requireRole } from "@/lib/rbac";
import { Prisma } from "../../../generated/prisma";

const userSettingsSchema = z.object({
  gpaThresholds: z
    .object({
      ineligible: z.number().min(0).max(4),
      atRisk: z.number().min(0).max(4),
    })
    .optional(),
  medicalStatuses: z
    .object({
      attendanceThreshold: z.number().min(0).max(100),
    })
    .optional(),
  defaultFilters: z.record(z.string(), z.unknown()).optional(),
});

function getUserId(session: { user?: { id: string } } | null) {
  const userId = session?.user?.id;
  if (!userId) {
    throw createApiError(401, "Unauthorized");
  }

  return userId;
}

export async function GET() {
  try {
    const session = await auth();
    const guardError = requireRole(session, "COACH", "AD");
    if (guardError) return guardError;

    const userId = getUserId(session);
    const settings = await prisma.userSettings.findUnique({
      where: { userId },
    });

    return NextResponse.json(settings || {});
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const guardError = requireRole(session, "COACH", "AD");
    if (guardError) return guardError;

    const userId = getUserId(session);
    const body = await parseJsonBody(request, userSettingsSchema);

    const settings = await prisma.userSettings.upsert({
      where: { userId },
      update: {
        gpaThresholds: body.gpaThresholds as Prisma.InputJsonValue | undefined,
        medicalStatuses: body.medicalStatuses as Prisma.InputJsonValue | undefined,
        defaultFilters: body.defaultFilters as Prisma.InputJsonValue | undefined,
      },
      create: {
        userId,
        gpaThresholds: body.gpaThresholds as Prisma.InputJsonValue | undefined,
        medicalStatuses: body.medicalStatuses as Prisma.InputJsonValue | undefined,
        defaultFilters: body.defaultFilters as Prisma.InputJsonValue | undefined,
      },
    });

    return NextResponse.json(settings, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    const guardError = requireRole(session, "COACH", "AD");
    if (guardError) return guardError;

    const userId = getUserId(session);
    const body = await parseJsonBody(request, userSettingsSchema);

    const existingSettings = await prisma.userSettings.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!existingSettings) {
      throw createApiError(404, "User settings not found.");
    }

    const settings = await prisma.userSettings.update({
      where: { userId },
      data: {
        gpaThresholds: body.gpaThresholds as Prisma.InputJsonValue | undefined,
        medicalStatuses: body.medicalStatuses as Prisma.InputJsonValue | undefined,
        defaultFilters: body.defaultFilters as Prisma.InputJsonValue | undefined,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return handleApiError(error);
  }
}
