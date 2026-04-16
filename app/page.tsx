import { auth } from "./lib/auth"; // Import auth from your route
import { redirect } from "next/navigation";
import { UserRole } from "../generated/prisma";

export default async function Home() {
  const session = await auth(); // Check session server-side

  if (!session) {
    redirect("/login"); // Redirect to login if not authenticated
  }

  if (session.user.role === UserRole.ATHLETE) {
    redirect("/athlete-portal/dashboard");
  }

  redirect("/overview");
}
