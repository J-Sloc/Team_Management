"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";

type AcademicRecord = {
  id: string;
  athleteId: string;
  semester: string;
  finalScore?: number;
  termGpa?: number;
  academicStanding?: string;
  complianceStatus?: string;
  attendancePercent?: number;
  tutoringHours?: number;
  advisorNotes?: string;
  createdAt: string;
  athlete?: { id: string; name: string };
};

type AthleteOption = { id: string; name: string };

const blankRecordForm = {
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

export default function AcademicRecordsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [records, setRecords] = useState<AcademicRecord[]>([]);
  const [athletes, setAthletes] = useState<AthleteOption[]>([]);
  const [form, setForm] = useState(blankRecordForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ athleteId: "", semester: "" });

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.athleteId) params.set("athleteId", filter.athleteId);
      if (filter.semester) params.set("semester", filter.semester);

      const res = await fetch(`/api/academic-records?${params}`);
      if (!res.ok) throw new Error("Failed to fetch records");
      const data = await res.json();
      setRecords(data);
    } catch (error) {
      console.error("Could not load records:", error);
    } finally {
      setLoading(false);
    }
  }, [filter.athleteId, filter.semester]);

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
    if (!form.athleteId.trim() || !form.semester.trim()) return;

    const payload = {
      athleteId: form.athleteId.trim(),
      semester: form.semester.trim(),
      finalScore: form.finalScore ? Number(form.finalScore) : undefined,
      termGpa: form.termGpa ? Number(form.termGpa) : undefined,
      academicStanding: form.academicStanding.trim() || undefined,
      complianceStatus: form.complianceStatus.trim() || undefined,
      attendancePercent: form.attendancePercent ? Number(form.attendancePercent) : undefined,
      tutoringHours: form.tutoringHours ? Number(form.tutoringHours) : undefined,
      advisorNotes: form.advisorNotes.trim() || undefined,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `/api/academic-records?id=${encodeURIComponent(editingId)}`
      : "/api/academic-records";

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
    if (!confirm("Delete academic record?")) return;
    const res = await fetch(`/api/academic-records?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Delete failed");
    await fetchRecords();
  }

  function prepareEdit(record: AcademicRecord) {
    setEditingId(record.id);
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

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading academic records...</div>;
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
          <h1 className="text-3xl font-bold">Academic Records</h1>
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
            <input
              type="text"
              placeholder="Semester (e.g., Fall 2024)"
              value={filter.semester}
              onChange={(e) => setFilter(prev => ({ ...prev, semester: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2"
            />
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
            {editingId ? "Edit Academic Record" : "Add Academic Record"}
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
              placeholder="Semester"
              value={form.semester}
              onChange={(e) => setField("semester", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Final Score"
              value={form.finalScore}
              onChange={(e) => setField("finalScore", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Term GPA"
              value={form.termGpa}
              onChange={(e) => setField("termGpa", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <select
              value={form.academicStanding}
              onChange={(e) => setField("academicStanding", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Academic Standing</option>
              <option value="GOOD">Good</option>
              <option value="NEUTRAL">Neutral</option>
              <option value="BAD">Bad</option>
            </select>
            <select
              value={form.complianceStatus}
              onChange={(e) => setField("complianceStatus", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Compliance Status</option>
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
              onChange={(e) => setField("attendancePercent", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Tutoring Hours"
              value={form.tutoringHours}
              onChange={(e) => setField("tutoringHours", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <textarea
              placeholder="Advisor Notes"
              value={form.advisorNotes}
              onChange={(e) => setField("advisorNotes", e.target.value)}
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
            <h2 className="text-xl font-medium">Academic Records ({records.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Athlete
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Standing
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
                      {record.semester}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.termGpa?.toFixed(2) || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.academicStanding || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.attendancePercent ? `${record.attendancePercent}%` : "-"}
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