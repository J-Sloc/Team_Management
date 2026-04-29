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
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <p className="text-sm text-slate-700">
                  GPA: {record.termGpa?.toFixed(2) ?? "N/A"}
                </p>
                <p className="text-sm text-slate-700">
                  Final Score: {record.finalScore ?? "N/A"}
                </p>
                <p className="text-sm text-slate-500">
                  Standing: {record.academicStanding ?? "No standing recorded"}
                </p>
                <p className="text-sm text-slate-500">
                  Compliance: {record.complianceStatus ?? "No compliance status"}
                </p>
                <p className="text-sm text-slate-500">
                  Attendance: {record.attendancePercent != null ? `${record.attendancePercent}%` : "N/A"}
                </p>
                <p className="text-sm text-slate-500">
                  Tutoring Hours: {record.tutoringHours ?? 0}
                </p>
              </div>
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
