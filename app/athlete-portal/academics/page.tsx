import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import { UserRole } from "../../../generated/prisma";

export default async function AthleteAcademicsPage() {
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
      academicRecords: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!athlete) {
    redirect("/login");
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Academics</h2>
      <div className="mt-4 space-y-3">
        {athlete.academicRecords.length === 0 ? (
          <p className="text-sm text-slate-500">No academic records available yet.</p>
        ) : (
          athlete.academicRecords.map((record) => (
            <div key={record.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-medium text-slate-900">{record.semester}</p>
              <p className="text-sm text-slate-700">
                GPA: {record.termGpa?.toFixed(2) ?? "N/A"}
              </p>
              <p className="text-sm text-slate-500">
                {record.academicStanding ?? "No standing recorded"}
              </p>
              {record.advisorNotes ? (
                <p className="mt-2 text-sm text-slate-700">{record.advisorNotes}</p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
