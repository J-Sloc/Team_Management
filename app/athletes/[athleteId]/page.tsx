import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import { ensureAthleteAccess, type SessionUser } from "@/lib/access";
import { requireRole } from "@/lib/rbac";
import { EventGroup } from "../../../../generated/prisma";

function getSessionUser(session: { user?: SessionUser } | null): SessionUser {
  const user = session?.user;
  if (!user) {
    throw new Error("Missing session user.");
  }

  return { id: user.id, role: user.role };
}

export default async function AthleteDetailPage({
  params,
}: {
  params: Promise<{ athleteId: string }>;
}) {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) {
    redirect("/login");
  }

  const user = getSessionUser(session);
  const { athleteId } = await params;
  await ensureAthleteAccess(user, athleteId);

  const athlete = await prisma.athlete.findUnique({
    where: { id: athleteId },
    include: {
      team: true,
      notes: {
        orderBy: { createdAt: "desc" },
        take: 8,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
      },
      academicRecords: {
        orderBy: { createdAt: "desc" },
        take: 8,
      },
      healthRecords: {
        orderBy: { createdAt: "desc" },
        take: 8,
      },
      workoutInstances: {
        orderBy: { performedAt: "desc" },
        take: 8,
        include: {
          workoutTemplate: {
            include: { metrics: true },
          },
        },
      },
      eventRankings: {
        orderBy: { recordedAt: "desc" },
        take: 8,
        include: { rankingSource: true },
      },
      personalRecords: {
        orderBy: { recordedAt: "desc" },
        take: 8,
      },
      journals: {
        orderBy: { createdAt: "desc" },
        take: 8,
        include: {
          author: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
      },
    },
  });

  if (!athlete) {
    redirect("/athletes");
  }

  const calendarItems = await prisma.event.findMany({
    where: {
      OR: [
        {
          teamId: athlete.teamId,
          group: EventGroup.TEAM,
        },
        {
          athleteId: athlete.id,
          group: EventGroup.PERSONAL,
        },
      ],
    },
    orderBy: { startTime: "asc" },
    take: 10,
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
                Athlete Detail
              </p>
              <h1 className="mt-1 text-3xl font-bold text-slate-900">{athlete.name}</h1>
              <p className="mt-2 text-sm text-slate-600">
                {athlete.team.name}
                {athlete.classYear ? ` • ${athlete.classYear}` : ""}
                {athlete.sport ? ` • ${athlete.sport}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-medium">
              <Link
                href={`/events?athleteId=${encodeURIComponent(athlete.id)}`}
                className="rounded-md bg-slate-900 px-4 py-2 text-white"
              >
                View Calendar
              </Link>
              <Link
                href="/athletes"
                className="rounded-md border border-slate-300 px-4 py-2 text-slate-700"
              >
                Back to Roster
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">GPA</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {athlete.gpa?.toFixed(2) ?? "Not available"}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Academic Standing</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {athlete.academicStanding ?? "Not available"}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Medical Status</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {athlete.medicalStatus ?? "Not available"}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Risk Flag</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {athlete.riskFlag ?? "None"}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Calendar Context</h2>
            <div className="mt-4 space-y-3">
              {calendarItems.length === 0 ? (
                <p className="text-sm text-slate-500">No upcoming calendar context yet.</p>
              ) : (
                calendarItems.map((event) => (
                  <div key={event.id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-slate-900">{event.title}</p>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-600">
                        {event.group === EventGroup.PERSONAL ? "Personal" : "Team"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {new Date(event.startTime).toLocaleString()}
                    </p>
                    {event.location ? (
                      <p className="mt-1 text-sm text-slate-700">{event.location}</p>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Notes</h2>
            <div className="mt-4 space-y-3">
              {athlete.notes.length === 0 ? (
                <p className="text-sm text-slate-500">No notes attached yet.</p>
              ) : (
                athlete.notes.map((note) => (
                  <div key={note.id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-600">
                        {note.category.replaceAll("_", " ")}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(note.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{note.body}</p>
                    <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
                      {note.user.role}
                      {note.user.email ? ` • ${note.user.email}` : ""}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Academics</h2>
            <div className="mt-4 space-y-3">
              {athlete.academicRecords.length === 0 ? (
                <p className="text-sm text-slate-500">No academic records yet.</p>
              ) : (
                athlete.academicRecords.map((record) => (
                  <div key={record.id} className="rounded-lg border border-slate-200 p-4">
                    <p className="font-medium text-slate-900">{record.semester}</p>
                    <p className="text-sm text-slate-700">
                      GPA: {record.termGpa?.toFixed(2) ?? "N/A"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {record.academicStanding ?? "No standing"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Medical</h2>
            <div className="mt-4 space-y-3">
              {athlete.healthRecords.length === 0 ? (
                <p className="text-sm text-slate-500">No medical records yet.</p>
              ) : (
                athlete.healthRecords.map((record) => (
                  <div key={record.id} className="rounded-lg border border-slate-200 p-4">
                    <p className="font-medium text-slate-900">
                      {record.injuryType ?? "General update"}
                    </p>
                    <p className="text-sm text-slate-700">{record.status ?? "No status"}</p>
                    {record.notes ? (
                      <p className="mt-2 text-sm text-slate-500">{record.notes}</p>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Workouts</h2>
            <div className="mt-4 space-y-3">
              {athlete.workoutInstances.length === 0 ? (
                <p className="text-sm text-slate-500">No workouts logged yet.</p>
              ) : (
                athlete.workoutInstances.map((workout) => (
                  <div key={workout.id} className="rounded-lg border border-slate-200 p-4">
                    <p className="font-medium text-slate-900">
                      {workout.workoutTemplate?.name ?? "Ad hoc workout"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(workout.performedAt).toLocaleString()}
                    </p>
                    {workout.notes ? (
                      <p className="mt-2 text-sm text-slate-700">{workout.notes}</p>
                    ) : null}
                  </div>
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
                <p className="text-sm text-slate-500">No personal records yet.</p>
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
            <h2 className="text-lg font-semibold text-slate-900">Rankings</h2>
            <div className="mt-4 space-y-3">
              {athlete.eventRankings.length === 0 ? (
                <p className="text-sm text-slate-500">No rankings yet.</p>
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
            <h2 className="text-lg font-semibold text-slate-900">Journals</h2>
            <div className="mt-4 space-y-3">
              {athlete.journals.length === 0 ? (
                <p className="text-sm text-slate-500">No journals yet.</p>
              ) : (
                athlete.journals.map((journal) => (
                  <div key={journal.id} className="rounded-lg border border-slate-200 p-4">
                    <p className="font-medium text-slate-900">
                      {journal.title ?? "Untitled entry"}
                    </p>
                    <p className="mt-2 text-sm text-slate-700">{journal.body}</p>
                    <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
                      {journal.author.role}
                      {journal.author.email ? ` • ${journal.author.email}` : ""}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
