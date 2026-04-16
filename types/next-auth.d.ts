// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";
import { UserRole } from "../generated/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id: string;
    role: UserRole;
  }
}
