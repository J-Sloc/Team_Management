import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import { UserRole } from "../../../generated/prisma";

export default async function AthleteDashboardPage() {
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
      personalRecords: {
        orderBy: { recordedAt: "desc" },
        take: 5,
      },
      eventRankings: {
        orderBy: { recordedAt: "desc" },
        take: 5,
        include: { rankingSource: true },
      },
      workoutInstances: {
        orderBy: { performedAt: "desc" },
        take: 5,
        include: {
          workoutTemplate: {
            include: { metrics: true },
          },
        },
      },
      journals: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      academicRecords: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      healthRecords: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!athlete) {
    redirect("/login");
  }

  const upcomingEvents = await prisma.event.findMany({
    where: {
      teamId: athlete.teamId,
      startTime: { gte: new Date() },
    },
    orderBy: { startTime: "asc" },
    take: 5,
  });

  const latestAcademic = athlete.academicRecords[0];
  const latestHealth = athlete.healthRecords[0];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Team</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{athlete.team.name}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">GPA</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {athlete.gpa?.toFixed(2) ?? "Not available"}
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Medical Status</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {latestHealth?.status ?? athlete.medicalStatus ?? "No current status"}
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Academic Standing</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {latestAcademic?.academicStanding ?? athlete.academicStanding ?? "No current status"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent Workouts</h2>
          <div className="mt-4 space-y-3">
            {athlete.workoutInstances.length === 0 ? (
              <p className="text-sm text-slate-500">No workouts logged yet.</p>
            ) : (
              athlete.workoutInstances.map((instance) => (
                <div key={instance.id} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-medium text-slate-900">
                    {instance.workoutTemplate?.name ?? "Ad hoc workout"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {new Date(instance.performedAt).toLocaleString()}
                  </p>
                  {instance.notes && (
                    <p className="mt-2 text-sm text-slate-700">{instance.notes}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Upcoming Team Events</h2>
          <div className="mt-4 space-y-3">
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-slate-500">No upcoming events scheduled.</p>
            ) : (
              upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/athlete-portal/calendar`}
                  className="block rounded-lg border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50/40"
                >
                  <p className="font-medium text-slate-900">{event.title}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(event.startTime).toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                    Team shared
                  </p>
                  {event.location && (
                    <p className="mt-1 text-sm text-slate-700">{event.location}</p>
                  )}
                </Link>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Personal Records</h2>
          <div className="mt-4 space-y-3">
            {athlete.personalRecords.length === 0 ? (
              <p className="text-sm text-slate-500">No PRs recorded yet.</p>
            ) : (
              athlete.personalRecords.map((record) => (
                <div key={record.id} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-medium text-slate-900">{record.eventName}</p>
                  <p className="text-sm text-slate-700">
                    {record.result} {record.unit.toLowerCase()}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Recent Rankings</h2>
          <div className="mt-4 space-y-3">
            {athlete.eventRankings.length === 0 ? (
              <p className="text-sm text-slate-500">No rankings available yet.</p>
            ) : (
              athlete.eventRankings.map((ranking) => (
                <div key={ranking.id} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-medium text-slate-900">{ranking.eventName}</p>
                  <p className="text-sm text-slate-700">
                    Rank {ranking.rank}
                    {ranking.region ? ` • ${ranking.region}` : ""}
                  </p>
                  <p className="text-xs text-slate-500">{ranking.rankingSource.name}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Recent Journals</h2>
          <div className="mt-4 space-y-3">
            {athlete.journals.length === 0 ? (
              <p className="text-sm text-slate-500">No journal entries yet.</p>
            ) : (
              athlete.journals.map((journal) => (
                <div key={journal.id} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-medium text-slate-900">
                    {journal.title ?? "Untitled entry"}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{journal.body}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
