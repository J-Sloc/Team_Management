"use client";

import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CoachPageHeader from "@/app/components/CoachPageHeader";
import DeleteConfirmationPanel from "@/app/components/DeleteConfirmationPanel";
import {
  apiJson,
  invalidateQueryKeys,
  toApiErrorMessage,
  toJsonBody,
} from "@/lib/clientApi";

type AcademicRecord = {
  id: string;
  athleteId: string;
  semester: string;
  finalScore?: number | null;
  termGpa?: number | null;
  academicStanding?: string | null;
  complianceStatus?: string | null;
  attendancePercent?: number | null;
  tutoringHours?: number | null;
  advisorNotes?: string | null;
  createdAt: string;
  athlete?: { id: string; name: string };
};

type AthleteOption = {
  id: string;
  name: string;
};

type AcademicForm = {
  athleteId: string;
  semester: string;
  finalScore: string;
  termGpa: string;
  academicStanding: string;
  complianceStatus: string;
  attendancePercent: string;
  tutoringHours: string;
  advisorNotes: string;
};

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400";

const blankRecordForm: AcademicForm = {
  athleteId: "",
  semester: "",
  finalScore: "",
  termGpa: "",
  academicStanding: "",
  complianceStatus: "",
  attendancePercent: "",
  tutoringHours: "",
  advisorNotes: "",
};

function parseNullableNumber(value: string) {
  if (!value.trim()) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseNullableText(value: string) {
  return value.trim() ? value.trim() : null;
}

export default function AcademicRecordsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<AcademicForm>(blankRecordForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState({ athleteId: "", semester: "" });

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push("/login");
      return;
    }

    if (!["COACH", "AD"].includes(session.user?.role || "")) {
      router.push("/");
    }
  }, [router, session, status]);

  const athletesQuery = useQuery({
    queryKey: ["athletes"],
    queryFn: () => apiJson<AthleteOption[]>("/api/athletes"),
    enabled: Boolean(session && ["COACH", "AD"].includes(session.user?.role || "")),
  });

  const recordsQuery = useQuery({
    queryKey: ["academic-records", filter.athleteId, filter.semester],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filter.athleteId) params.set("athleteId", filter.athleteId);
      if (filter.semester.trim()) params.set("semester", filter.semester.trim());
      return apiJson<AcademicRecord[]>(
        `/api/academic-records${params.toString() ? `?${params.toString()}` : ""}`,
      );
    },
    enabled: Boolean(session && ["COACH", "AD"].includes(session.user?.role || "")),
  });

  const saveRecordMutation = useMutation({
    mutationFn: (payload: unknown) => {
      if (editingId) {
        return apiJson<AcademicRecord>(
          `/api/academic-records?id=${encodeURIComponent(editingId)}`,
          {
            method: "PUT",
            body: toJsonBody(payload as never),
          },
        );
      }

      return apiJson<AcademicRecord>("/api/academic-records", {
        method: "POST",
        body: toJsonBody(payload as never),
      });
    },
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [["academic-records"]]);
      toast.success(editingId ? "Academic record updated." : "Academic record created.");
      resetForm();
    },
    onError: (error) => {
      toast.error(toApiErrorMessage(error));
    },
  });

  const deleteRecordMutation = useMutation({
    mutationFn: (recordId: string) =>
      apiJson<{ success: true }>(`/api/academic-records?id=${encodeURIComponent(recordId)}`, {
        method: "DELETE",
      }),
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [["academic-records"]]);
      toast.success("Academic record deleted.");
      if (pendingDeleteId === editingId) {
        resetForm();
      }
      setPendingDeleteId(null);
    },
    onError: (error) => {
      toast.error(toApiErrorMessage(error));
    },
  });

  const athletes = athletesQuery.data ?? [];
  const records = recordsQuery.data ?? [];
  const pendingDeleteRecord = records.find((record) => record.id === pendingDeleteId) ?? null;

  function setField<K extends keyof AcademicForm>(key: K, value: AcademicForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(blankRecordForm);
    setEditingId(null);
  }

  function prepareEdit(record: AcademicRecord) {
    setEditingId(record.id);
    setPendingDeleteId(null);
    setForm({
      athleteId: record.athleteId ?? "",
      semester: record.semester ?? "",
      finalScore: record.finalScore?.toString() ?? "",
      termGpa: record.termGpa?.toString() ?? "",
      academicStanding: record.academicStanding ?? "",
      complianceStatus: record.complianceStatus ?? "",
      attendancePercent: record.attendancePercent?.toString() ?? "",
      tutoringHours: record.tutoringHours?.toString() ?? "",
      advisorNotes: record.advisorNotes ?? "",
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.athleteId.trim() || !form.semester.trim()) {
      return;
    }

    await saveRecordMutation.mutateAsync({
      athleteId: form.athleteId.trim(),
      semester: form.semester.trim(),
      finalScore: parseNullableNumber(form.finalScore),
      termGpa: parseNullableNumber(form.termGpa),
      academicStanding: parseNullableText(form.academicStanding),
      complianceStatus: parseNullableText(form.complianceStatus),
      attendancePercent: parseNullableNumber(form.attendancePercent),
      tutoringHours: parseNullableNumber(form.tutoringHours),
      advisorNotes: parseNullableText(form.advisorNotes),
    });
  }

  async function confirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    await deleteRecordMutation.mutateAsync(pendingDeleteId);
  }

  if (status === "loading" || athletesQuery.isLoading || recordsQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading academic records...
      </div>
    );
  }

  if (!session || !["COACH", "AD"].includes(session.user?.role || "")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <CoachPageHeader
          title="Academic Records"
          description="Track semester snapshots, compliance, attendance, and academic notes without leaving the coaching workflow."
        />

        {pendingDeleteRecord ? (
          <DeleteConfirmationPanel
            itemLabel={`${pendingDeleteRecord.athlete?.name ?? "Athlete"} • ${pendingDeleteRecord.semester}`}
            isPending={deleteRecordMutation.isPending}
            onCancel={() => setPendingDeleteId(null)}
            onConfirm={confirmDelete}
          />
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editingId ? "Edit Record" : "Add Record"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Use semester-level entries for the current workflow; richer course detail can layer on later.
                </p>
              </div>
              {editingId ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  Cancel
                </button>
              ) : null}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
              <select
                value={form.athleteId}
                onChange={(event) => setField("athleteId", event.target.value)}
                className={inputClass}
                required
              >
                <option value="">Select athlete</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id} value={athlete.id}>
                    {athlete.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Semester"
                value={form.semester}
                onChange={(event) => setField("semester", event.target.value)}
                className={inputClass}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Final score"
                value={form.finalScore}
                onChange={(event) => setField("finalScore", event.target.value)}
                className={inputClass}
              />
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                placeholder="Term GPA"
                value={form.termGpa}
                onChange={(event) => setField("termGpa", event.target.value)}
                className={inputClass}
              />
              <select
                value={form.academicStanding}
                onChange={(event) => setField("academicStanding", event.target.value)}
                className={inputClass}
              >
                <option value="">Academic standing</option>
                <option value="GOOD">Good</option>
                <option value="NEUTRAL">Neutral</option>
                <option value="BAD">Bad</option>
              </select>
              <select
                value={form.complianceStatus}
                onChange={(event) => setField("complianceStatus", event.target.value)}
                className={inputClass}
              >
                <option value="">Compliance status</option>
                <option value="COMPLIANT">Compliant</option>
                <option value="WARNING">Warning</option>
                <option value="NON_COMPLIANT">Non-Compliant</option>
              </select>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Attendance %"
                value={form.attendancePercent}
                onChange={(event) => setField("attendancePercent", event.target.value)}
                className={inputClass}
              />
              <input
                type="number"
                min="0"
                placeholder="Tutoring hours"
                value={form.tutoringHours}
                onChange={(event) => setField("tutoringHours", event.target.value)}
                className={inputClass}
              />
              <textarea
                placeholder="Advisor notes"
                value={form.advisorNotes}
                onChange={(event) => setField("advisorNotes", event.target.value)}
                className={`min-h-28 md:col-span-2 ${inputClass}`}
              />
              <button
                type="submit"
                disabled={saveRecordMutation.isPending}
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {saveRecordMutation.isPending
                  ? "Saving..."
                  : editingId
                    ? "Update Record"
                    : "Create Record"}
              </button>
            </form>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Current Records</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {records.length} result{records.length === 1 ? "" : "s"} matching the current filters.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <select
                  value={filter.athleteId}
                  onChange={(event) =>
                    setFilter((current) => ({ ...current, athleteId: event.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="">All athletes</option>
                  {athletes.map((athlete) => (
                    <option key={athlete.id} value={athlete.id}>
                      {athlete.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Filter by semester"
                  value={filter.semester}
                  onChange={(event) =>
                    setFilter((current) => ({ ...current, semester: event.target.value }))
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setFilter({ athleteId: "", semester: "" })}
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {recordsQuery.isError ? (
              <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {toApiErrorMessage(recordsQuery.error)}
              </p>
            ) : records.length === 0 ? (
              <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                No academic records found for the current filter set.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Athlete</th>
                      <th className="px-3 py-2">Semester</th>
                      <th className="px-3 py-2">GPA</th>
                      <th className="px-3 py-2">Standing</th>
                      <th className="px-3 py-2">Attendance</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id} className="border-t border-slate-200 align-top">
                        <td className="px-3 py-3">
                          <p className="font-medium text-slate-900">
                            {record.athlete?.name ?? "Unknown athlete"}
                          </p>
                          {record.advisorNotes ? (
                            <p className="mt-1 max-w-xs text-xs text-slate-500">
                              {record.advisorNotes}
                            </p>
                          ) : null}
                        </td>
                        <td className="px-3 py-3 text-slate-700">{record.semester}</td>
                        <td className="px-3 py-3 text-slate-700">
                          {record.termGpa != null ? record.termGpa.toFixed(2) : "-"}
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {record.academicStanding ?? "-"}
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {record.attendancePercent != null ? `${record.attendancePercent}%` : "-"}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => prepareEdit(record)}
                              className="text-sm font-medium text-blue-700 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setPendingDeleteId(record.id)}
                              className="text-sm font-medium text-rose-700 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
