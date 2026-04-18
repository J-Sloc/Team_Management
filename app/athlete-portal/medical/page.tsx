import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import { UserRole } from "../../../../generated/prisma";

export default async function AthleteMedicalPage() {
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
      healthRecords: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!athlete) {
    redirect("/login");
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Medical</h2>
      <div className="mt-4 space-y-3">
        {athlete.healthRecords.length === 0 ? (
          <p className="text-sm text-slate-500">No medical updates available yet.</p>
        ) : (
          athlete.healthRecords.map((record) => (
            <div key={record.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-medium text-slate-900">
                {record.injuryType ?? "General medical update"}
              </p>
              <p className="text-sm text-slate-700">{record.status ?? "No status"}</p>
              {record.injuryDate ? (
                <p className="text-sm text-slate-500">
                  {new Date(record.injuryDate).toLocaleDateString()}
                </p>
              ) : null}
              {record.notes ? (
                <p className="mt-2 text-sm text-slate-700">{record.notes}</p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
