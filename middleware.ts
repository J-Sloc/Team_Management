// middleware.ts
import { auth } from "./app/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  
  // If no session and not on login page, redirect to login
  if (!session && request.nextUrl.pathname !== "/login") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // Allow the request to proceed if authenticated or on login
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Protects all routes except API, static assets, and login
};

export const runtime = 'nodejs'; // Add this to allow Node.js modules like crypto