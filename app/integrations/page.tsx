import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { UserRole } from "../../generated/prisma";
import IntegrationsClient from "./IntegrationsClient";

export default async function IntegrationsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== UserRole.COACH && session.user.role !== UserRole.AD) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <IntegrationsClient />
      </div>
    </div>
  );
}
