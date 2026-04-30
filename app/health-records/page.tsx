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

type HealthRecord = {
  id: string;
  athleteId: string;
  injuryType?: string | null;
  injuryDate?: string | null;
  status?: string | null;
  rehabSessions?: number | null;
  appointmentAttendance?: number | null;
  notes?: string | null;
  createdAt: string;
  athlete?: { id: string; name: string };
};

type AthleteOption = {
  id: string;
  name: string;
};

type HealthForm = {
  athleteId: string;
  injuryType: string;
  injuryDate: string;
  status: string;
  rehabSessions: string;
  appointmentAttendance: string;
  notes: string;
};

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm";
const classOption =  "text-slate-900 placeholder:text-slate-400";

const blankRecordForm: HealthForm = {
  athleteId: "",
  injuryType: "",
  injuryDate: "",
  status: "",
  rehabSessions: "",
  appointmentAttendance: "",
  notes: "",
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

export default function HealthRecordsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<HealthForm>(blankRecordForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState({ athleteId: "", status: "" });

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
    queryKey: ["health-records", filter.athleteId, filter.status],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filter.athleteId) params.set("athleteId", filter.athleteId);
      if (filter.status) params.set("status", filter.status);
      return apiJson<HealthRecord[]>(
        `/api/health-records${params.toString() ? `?${params.toString()}` : ""}`,
      );
    },
    enabled: Boolean(session && ["COACH", "AD"].includes(session.user?.role || "")),
  });

  const saveRecordMutation = useMutation({
    mutationFn: (payload: unknown) => {
      if (editingId) {
        return apiJson<HealthRecord>(`/api/health-records?id=${encodeURIComponent(editingId)}`, {
          method: "PUT",
          body: toJsonBody(payload as never),
        });
      }

      return apiJson<HealthRecord>("/api/health-records", {
        method: "POST",
        body: toJsonBody(payload as never),
      });
    },
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [["health-records"]]);
      toast.success(editingId ? "Health record updated." : "Health record created.");
      resetForm();
    },
    onError: (error) => {
      toast.error(toApiErrorMessage(error));
    },
  });

  const deleteRecordMutation = useMutation({
    mutationFn: (recordId: string) =>
      apiJson<{ success: true }>(`/api/health-records?id=${encodeURIComponent(recordId)}`, {
        method: "DELETE",
      }),
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [["health-records"]]);
      toast.success("Health record deleted.");
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

  function setField<K extends keyof HealthForm>(key: K, value: HealthForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(blankRecordForm);
    setEditingId(null);
  }

  function prepareEdit(record: HealthRecord) {
    setEditingId(record.id);
    setPendingDeleteId(null);
    setForm({
      athleteId: record.athleteId ?? "",
      injuryType: record.injuryType ?? "",
      injuryDate: record.injuryDate ? new Date(record.injuryDate).toISOString().slice(0, 10) : "",
      status: record.status ?? "",
      rehabSessions: record.rehabSessions?.toString() ?? "",
      appointmentAttendance: record.appointmentAttendance?.toString() ?? "",
      notes: record.notes ?? "",
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.athleteId.trim()) {
      return;
    }

    await saveRecordMutation.mutateAsync({
      athleteId: form.athleteId.trim(),
      injuryType: parseNullableText(form.injuryType),
      injuryDate: form.injuryDate || null,
      status: parseNullableText(form.status),
      rehabSessions: parseNullableNumber(form.rehabSessions),
      appointmentAttendance: parseNullableNumber(form.appointmentAttendance),
      notes: parseNullableText(form.notes),
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
        Loading health records...
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
          title="Health Records"
          description="Capture clearance, rehab, and attendance context with the same feedback and guardrails as the newer modules."
        />

        {pendingDeleteRecord ? (
          <DeleteConfirmationPanel
            itemLabel={`${pendingDeleteRecord.athlete?.name ?? "Athlete"} • ${pendingDeleteRecord.injuryType ?? "Medical update"}`}
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
                  Keep the latest injury and clearance status easy to review from the dashboard and athlete pages.
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
                className={`${inputClass} ${form.athleteId === '' ? 'text-slate-400' : 'text-slate-900'}`}
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
                placeholder="Injury type or update title"
                value={form.injuryType}
                onChange={(event) => setField("injuryType", event.target.value)}
                className={`${inputClass} ${classOption}`}
              />
              <input
                type="date"
                value={form.injuryDate}
                onChange={(event) => setField("injuryDate", event.target.value)}
                className={`${inputClass} text-slate-900`}
              />
              <select
                value={form.status}
                onChange={(event) => setField("status", event.target.value)}
                className={`${inputClass} ${form.status === '' ? 'text-slate-400' : 'text-slate-900'}`}
              >
                <option value="">Medical status</option>
                <option value="CLEARED">Cleared</option>
                <option value="LIMITED">Limited</option>
                <option value="NOT_CLEARED">Not Cleared</option>
              </select>
              <input
                type="number"
                min="0"
                placeholder="Rehab sessions"
                value={form.rehabSessions}
                onChange={(event) => setField("rehabSessions", event.target.value)}
                className={`${inputClass} ${classOption}`}
              />
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Appointment attendance %"
                value={form.appointmentAttendance}
                onChange={(event) => setField("appointmentAttendance", event.target.value)}
                className={`${inputClass} ${classOption}`}
               />
              <textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(event) => setField("notes", event.target.value)}
                className={`min-h-28 md:col-span-2 ${inputClass} ${classOption}`}
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
                <select
                  value={filter.status}
                  onChange={(event) =>
                    setFilter((current) => ({ ...current, status: event.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="">All statuses</option>
                  <option value="CLEARED">Cleared</option>
                  <option value="LIMITED">Limited</option>
                  <option value="NOT_CLEARED">Not Cleared</option>
                </select>
                <button
                  type="button"
                  onClick={() => setFilter({ athleteId: "", status: "" })}
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
                No health records found for the current filter set.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Athlete</th>
                      <th className="px-3 py-2">Update</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Rehab</th>
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
                          {record.injuryDate ? (
                            <p className="mt-1 text-xs text-slate-500">
                              {new Date(record.injuryDate).toLocaleDateString()}
                            </p>
                          ) : null}
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          <p>{record.injuryType ?? "General update"}</p>
                          {record.notes ? (
                            <p className="mt-1 max-w-xs text-xs text-slate-500">{record.notes}</p>
                          ) : null}
                        </td>
                        <td className="px-3 py-3 text-slate-700">{record.status ?? "-"}</td>
                        <td className="px-3 py-3 text-slate-700">
                          {record.rehabSessions ?? "-"}
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {record.appointmentAttendance != null ? `${record.appointmentAttendance}%` : "-"}
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
