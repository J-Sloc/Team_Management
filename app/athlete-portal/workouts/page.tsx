import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import { UserRole } from "../../../../generated/prisma";

export default async function AthleteWorkoutsPage() {
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
      workoutInstances: {
        orderBy: { performedAt: "desc" },
        include: {
          workoutTemplate: {
            include: { metrics: true },
          },
        },
      },
    },
  });

  if (!athlete) {
    redirect("/login");
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Workouts</h2>
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
              {workout.workoutTemplate?.metrics.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {workout.workoutTemplate.metrics.map((metric) => (
                    <span
                      key={metric.id}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {metric.name}
                      {metric.targetValue != null ? `: ${metric.targetValue}` : ""}
                      {metric.unit ? ` ${metric.unit.toLowerCase()}` : ""}
                    </span>
                  ))}
                </div>
              ) : null}
              {workout.notes ? (
                <p className="mt-2 text-sm text-slate-700">{workout.notes}</p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
