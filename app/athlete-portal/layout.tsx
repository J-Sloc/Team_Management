import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { UserRole } from "../../generated/prisma";

const links = [
  { name: "Dashboard", href: "/athlete-portal/dashboard" },
  { name: "Calendar", href: "/athlete-portal/calendar" },
  { name: "Workouts", href: "/athlete-portal/workouts" },
  { name: "Academics", href: "/athlete-portal/academics" },
  { name: "Medical", href: "/athlete-portal/medical" },
  { name: "Journals", href: "/athlete-portal/journals" },
  { name: "Settings", href: "/athlete-portal/settings" },
];

export default async function AthletePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== UserRole.ATHLETE) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
                Athlete Portal
              </p>
              <h1 className="text-3xl font-bold text-slate-900">
                Personal Dashboard
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
