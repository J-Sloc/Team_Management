"use client";

import Link from "next/link";
import { ReactNode } from "react";
import LogoutButton from "@/app/components/LogoutButton";

type CoachPageHeaderProps = {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  children?: ReactNode;
};

export default function CoachPageHeader({
  title,
  description,
  backHref = "/overview",
  backLabel = "Back to Dashboard",
  children,
}: CoachPageHeaderProps) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {children}
          <Link
            href={backHref}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            {backLabel}
          </Link>
          <LogoutButton className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700" />
        </div>
      </div>
    </section>
  );
}
