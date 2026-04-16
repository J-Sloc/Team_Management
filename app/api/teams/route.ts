import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { getAccessibleTeamIds, type SessionUser } from "@/lib/access";
import { handleApiError } from "@/lib/api";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/rbac";

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

export async function GET() {
  try {
    const session = await auth();
    const guardError = requireSession(session);
    if (guardError) return guardError;

    const user = getSessionUser(session);
    const teamIds = await getAccessibleTeamIds(user);

    const teams = await prisma.team.findMany({
      where: {
        id: {
          in: teamIds,
        },
      },
      orderBy: { name: "asc" },
      select: { id: true, name: true, sport: true },
    });

    return NextResponse.json(teams);
  } catch (error) {
    return handleApiError(error);
  }
}
