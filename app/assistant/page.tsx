import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { UserRole } from "../../generated/prisma";
import AssistantClient from "./AssistantClient";

export default async function AssistantPage({
  searchParams,
}: {
  searchParams: Promise<{
    scope?: string;
    athleteId?: string;
    teamId?: string;
    prompt?: string;
  }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AssistantClient
          initialScope={
            params.scope === "athlete" || params.scope === "performance" ? params.scope : "global"
          }
          initialAthleteId={params.athleteId ?? ""}
          initialTeamId={params.teamId ?? ""}
          initialPrompt={params.prompt ?? ""}
          backHref={
            session.user.role === UserRole.ATHLETE
              ? "/athlete-portal/dashboard"
              : "/overview"
          }
        />
      </div>
    </div>
  );
}
