"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";

type HealthRecord = {
  id: string;
  athleteId: string;
  injuryType?: string;
  injuryDate?: string;
  status?: string;
  rehabSessions?: number;
  appointmentAttendance?: number;
  notes?: string;
  createdAt: string;
  athlete?: { id: string; name: string };
};

type AthleteOption = { id: string; name: string };

const blankRecordForm = {
  athleteId: "",
  injuryType: "",
  injuryDate: "",
  status: "",
  rehabSessions: "",
  appointmentAttendance: "",
  notes: "",
};

export default function HealthRecordsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [athletes, setAthletes] = useState<AthleteOption[]>([]);
  const [form, setForm] = useState(blankRecordForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ athleteId: "", status: "" });

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.athleteId) params.set("athleteId", filter.athleteId);
      if (filter.status) params.set("status", filter.status);

      const res = await fetch(`/api/health-records?${params}`);
      if (!res.ok) throw new Error("Failed to fetch records");
      const data = await res.json();
      setRecords(data);
    } catch (error) {
      console.error("Could not load records:", error);
    } finally {
      setLoading(false);
    }
  }, [filter.athleteId, filter.status]);

  const fetchAthletes = useCallback(async () => {
    try {
      const res = await fetch("/api/athletes");
      if (!res.ok) throw new Error("Failed to fetch athletes");
      const data: { id: string; name: string }[] = await res.json();
      setAthletes(data.map((a) => ({ id: a.id, name: a.name })));
    } catch (error) {
      console.error("Could not load athletes:", error);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
      return;
    }
    if (!["COACH", "AD"].includes(session.user?.role || "")) {
      router.push("/");
      return;
    }

    fetchAthletes();
    fetchRecords();
  }, [session, status, router, fetchRecords, fetchAthletes]);

  function setField<K extends keyof typeof blankRecordForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm(blankRecordForm);
    setEditingId(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.athleteId.trim()) return;

    const payload = {
      athleteId: form.athleteId.trim(),
      injuryType: form.injuryType.trim() || undefined,
      injuryDate: form.injuryDate || undefined,
      status: form.status.trim() || undefined,
      rehabSessions: form.rehabSessions ? Number(form.rehabSessions) : undefined,
      appointmentAttendance: form.appointmentAttendance ? Number(form.appointmentAttendance) : undefined,
      notes: form.notes.trim() || undefined,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `/api/health-records?id=${encodeURIComponent(editingId)}`
      : "/api/health-records";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Save failed");
      await fetchRecords();
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save record");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete health record?")) return;
    const res = await fetch(`/api/health-records?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Delete failed");
    await fetchRecords();
  }

  function prepareEdit(record: HealthRecord) {
    setEditingId(record.id);
    setForm({
      athleteId: record.athleteId ?? "",
      injuryType: record.injuryType ?? "",
      injuryDate: record.injuryDate ? new Date(record.injuryDate).toISOString().split('T')[0] : "",
      status: record.status ?? "",
      rehabSessions: record.rehabSessions?.toString() ?? "",
      appointmentAttendance: record.appointmentAttendance?.toString() ?? "",
      notes: record.notes ?? "",
    });
  }

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading health records...</div>;
  }

  if (!session || !["COACH", "AD"].includes(session.user?.role || "")) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">403 - Forbidden</h1>
          <p className="text-slate-600 mb-4">You do not have permission to access this page.</p>
          <Link href="/overview" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="mx-auto max-w-6xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Health Records</h1>
          <Link href="/overview" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-medium mb-3">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filter.athleteId}
              onChange={(e) => setFilter(prev => ({ ...prev, athleteId: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Athletes</option>
              {athletes.map(athlete => (
                <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
              ))}
            </select>
            <select
              value={filter.status}
              onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Statuses</option>
              <option value="CLEARED">Cleared</option>
              <option value="LIMITED">Limited</option>
              <option value="NOT_CLEARED">Not Cleared</option>
            </select>
            <button
              onClick={fetchRecords}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-medium mb-4">
            {editingId ? "Edit Health Record" : "Add Health Record"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <select
              value={form.athleteId}
              onChange={(e) => setField("athleteId", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Athlete</option>
              {athletes.map(athlete => (
                <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Injury Type"
              value={form.injuryType}
              onChange={(e) => setField("injuryType", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="date"
              placeholder="Injury Date"
              value={form.injuryDate}
              onChange={(e) => setField("injuryDate", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <select
              value={form.status}
              onChange={(e) => setField("status", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Medical Status</option>
              <option value="CLEARED">Cleared</option>
              <option value="LIMITED">Limited</option>
              <option value="NOT_CLEARED">Not Cleared</option>
            </select>
            <input
              type="number"
              placeholder="Rehab Sessions"
              value={form.rehabSessions}
              onChange={(e) => setField("rehabSessions", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Appointment Attendance %"
              value={form.appointmentAttendance}
              onChange={(e) => setField("appointmentAttendance", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <textarea
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 md:col-span-2 lg:col-span-3"
              rows={3}
            />
            <div className="md:col-span-2 lg:col-span-3 flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editingId ? "Update" : "Add"} Record
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-medium">Health Records ({records.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Athlete
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Injury Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rehab Sessions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.athlete?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.injuryType || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.status || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.rehabSessions || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.appointmentAttendance ? `${record.appointmentAttendance}%` : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => prepareEdit(record)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}