import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/app/lib/auth";
import { handleApiError, parseJsonBody } from "@/lib/api";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { type SessionUser } from "@/lib/access";
import {
  createIntegrationRun,
  resolveIntegrationProvider,
} from "@/lib/integrations";

const triggerSchema = z.object({
  triggerType: z.enum(["MANUAL", "SCHEDULED"]).default("MANUAL"),
  teamId: z.string().min(1).optional(),
  notes: z.string().trim().min(1).optional(),
});

function getSessionUser(session: { user?: SessionUser } | null): SessionUser {
  const user = session?.user;
  if (!user) {
    throw new Error("Missing session user.");
  }

  return { id: user.id, role: user.role };
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ provider: string }> },
) {
  try {
    const session = await auth();
    const guardError = requireRole(session, "COACH", "AD");
    if (guardError) return guardError;

    const { provider } = await context.params;
    const resolved = resolveIntegrationProvider(provider);
    const runs = await prisma.integrationRun.findMany({
      where: { provider: resolved.key },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json({
      provider: resolved,
      runs,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ provider: string }> },
) {
  try {
    const session = await auth();
    const guardError = requireRole(session, "COACH", "AD");
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const { provider } = await context.params;
    const resolved = resolveIntegrationProvider(provider);
    const body = await parseJsonBody(request, triggerSchema);

    const run = await createIntegrationRun({
      provider: resolved.key,
      triggerType: body.triggerType,
      triggeredByUserId: user.id,
      scopeJson: {
        teamId: body.teamId ?? null,
        notes: body.notes ?? null,
      },
    });

    return NextResponse.json(
      {
        provider: resolved,
        run,
      },
      { status: 201 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
