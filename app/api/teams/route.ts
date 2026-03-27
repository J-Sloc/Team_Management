// app/api/teams/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import { requireRole } from "@/lib/rbac";

export async function GET(request: Request) {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) return guardError;

  const teams = await prisma.team.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, sport: true },
  });

  return NextResponse.json(teams);
}
