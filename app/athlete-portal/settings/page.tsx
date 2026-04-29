import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import LogoutButton from "@/app/components/LogoutButton";
import { UserRole } from "../../../../generated/prisma";

export default async function AthleteSettingsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== UserRole.ATHLETE) {
    redirect("/");
  }

  const athlete = await prisma.athlete.findFirst({
    where: { userId: session.user.id },
    include: {
      team: true,
    },
  });

  if (!athlete) {
    redirect("/login");
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Settings</h2>
          <p className="mt-1 text-sm text-slate-500">
            Profile and account controls for the athlete portal.
          </p>
        </div>
        <LogoutButton className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Name</p>
          <p className="mt-2 font-medium text-slate-900">{athlete.name}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Email</p>
          <p className="mt-2 font-medium text-slate-900">{session.user.email}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Team</p>
          <p className="mt-2 font-medium text-slate-900">{athlete.team.name}</p>
        </div>
      </div>
    </section>
  );
}
