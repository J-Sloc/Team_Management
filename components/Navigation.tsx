"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { UserRole } from "../generated/prisma";

const coachNavigationItems = [
  { name: "Dashboard", href: "/overview" },
  { name: "Athletes", href: "/athletes" },
  { name: "Academic", href: "/academic-records" },
  { name: "Health", href: "/health-records" },
  { name: "Events", href: "/events" },
  { name: "Notes", href: "/notes" },
  { name: "Assistant", href: "/assistant" },
  { name: "Integrations", href: "/integrations" },
  { name: "Workouts", href: "/track-and-field/workouts" },
  { name: "Rankings", href: "/track-and-field/rankings" },
  { name: "Meet Entries", href: "/track-and-field/meet-entries" },
  { name: "Journals", href: "/track-and-field/journals" },
  { name: "Settings", href: "/settings" },
];

const athleteNavigationItems = [
  { name: "Dashboard", href: "/athlete-portal/dashboard" },
  { name: "Assistant", href: "/assistant" },
  { name: "Calendar", href: "/athlete-portal/calendar" },
  { name: "Workouts", href: "/athlete-portal/workouts" },
  { name: "Academics", href: "/athlete-portal/academics" },
  { name: "Medical", href: "/athlete-portal/medical" },
  { name: "Journals", href: "/athlete-portal/journals" },
  { name: "Settings", href: "/athlete-portal/settings" },
];

export default function Navigation() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Only show navigation for authenticated users with appropriate roles
  if (status !== "authenticated" || !session?.user?.role) {
    return null;
  }

  const userRole = session.user.role;
  if (
    userRole !== UserRole.COACH &&
    userRole !== UserRole.AD &&
    userRole !== UserRole.ATHLETE
  ) {
    return null;
  }

  const navigationItems =
    userRole === UserRole.ATHLETE ? athleteNavigationItems : coachNavigationItems;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link
              href={userRole === UserRole.ATHLETE ? "/athlete-portal/dashboard" : "/overview"}
              className="text-xl font-bold text-gray-900"
            >
              Team Management
            </Link>
          </div>
          <div className="flex space-x-4">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
