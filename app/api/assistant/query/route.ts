import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/app/lib/auth";
import {
  buildAssistantContext,
  enforceAssistantRateLimit,
  generateAssistantReply,
} from "@/lib/assistant";
import { handleApiError, parseJsonBody } from "@/lib/api";
import { requireSession } from "@/lib/rbac";
import { type SessionUser } from "@/lib/access";

const assistantQuerySchema = z.object({
  prompt: z.string().trim().min(1),
  scope: z.enum(["global", "athlete", "performance"]).default("global"),
  athleteId: z.string().min(1).optional(),
  teamId: z.string().min(1).optional(),
});

function getSessionUser(session: { user?: SessionUser } | null): SessionUser {
  const user = session?.user;
  if (!user) {
    throw new Error("Missing session user.");
  }

  return { id: user.id, role: user.role };
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    enforceAssistantRateLimit(user.id);

    const body = await parseJsonBody(request, assistantQuerySchema);
    const context = await buildAssistantContext(user, {
      scope: body.scope,
      athleteId: body.athleteId,
      teamId: body.teamId,
    });
    const result = await generateAssistantReply(body.prompt, context);

    return NextResponse.json({
      reply: result.reply,
      provider: result.provider,
      model: result.model,
      context,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
