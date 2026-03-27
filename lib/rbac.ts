import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { UserRole } from "../generated/prisma";

/**
 * Guard for API routes: checks if session exists and user has required role
 * @param session - NextAuth session object
 * @param requiredRoles - one or more required roles (e.g., "COACH", "AD")
 * @returns null if authorized, otherwise NextResponse with 401 error
 */
export function requireRole(session: Session | null, ...requiredRoles: UserRole[]) {
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized: No session" },
      { status: 401 }
    );
  }

  const userRole = session.user.role as UserRole;
  if (!requiredRoles.includes(userRole)) {
    return NextResponse.json(
      { error: `Unauthorized: Requires one of ${requiredRoles.join(", ")}` },
      { status: 401 }
    );
  }

  return null; // Authorized
}

/**
 * Guard for API routes: checks if session exists
 * @param session - NextAuth session object
 * @returns null if authorized, otherwise NextResponse with 401 error
 */
export function requireSession(session: Session | null) {
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized: No session" },
      { status: 401 }
    );
  }

  return null; // Authorized
}
