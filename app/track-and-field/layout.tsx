import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { UserRole } from "../../generated/prisma";

const links = [
  { name: "Workouts", href: "/track-and-field/workouts" },
  { name: "Rankings", href: "/track-and-field/rankings" },
  { name: "Meet Entries", href: "/track-and-field/meet-entries" },
  { name: "Journals", href: "/track-and-field/journals" },
  { name: "Assistant", href: "/assistant?scope=performance" },
];

export default async function TrackAndFieldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
                Track & Field
              </p>
              <h1 className="text-3xl font-bold text-slate-900">
                Coach Operations
              </h1>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-medium">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-slate-300 px-4 py-2 text-slate-700"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
