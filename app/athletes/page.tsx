"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePagination } from "@/lib/hooks/usePagination";

const commonInputClass = "input text-black placeholder:text-slate-400 focus:text-black";

type TeamOption = { id: string; name: string; sport?: string };

type Athlete = {
  id: string;
  name: string;
  teamId: string;
  team?: { id: string; name: string };
  jerseyNumber?: number;
  height?: number;
  weight?: number;
  classYear?: string;
  sport?: string;
  events?: string[];
  eventRecords?: Record<string, { personalBest?: number; historical?: number[] }>;
  gpa?: number;
  academicStanding?: string;
  eligibilityYearsLeft?: number;
  medicalStatus?: string;
  complianceStatus?: string;
  riskFlag?: string;
};

const blankAthleteForm = {
  name: "",
  teamId: "",
  jerseyNumber: "",
  height: "",
  weight: "",
  classYear: "",
  sport: "Track & Field",
  events: "" as string,
  eventRecords: {} as Record<string, { personalBest?: number; historical?: number[] }>,
  gpa: "",
  academicStanding: "",
  eligibilityYearsLeft: "",
  medicalStatus: "",
  complianceStatus: "",
  riskFlag: "",
};

export default function AthletesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [teams, setTeams] = useState<TeamOption[]>([]);
  const [form, setForm] = useState(blankAthleteForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"table" | "cards">("table");
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("imperial");
  usePagination(10);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
      return;
    }
    // Redirect if not COACH or AD
    if (!["COACH", "AD"].includes(session.user?.role || "")) {
      router.push("/");
      return;
    }

    fetchTeams();
    fetchAthletes();
  }, [session, status, router]);

  async function fetchTeams() {
    try {
      const res = await fetch("/api/teams");
      if (!res.ok) throw new Error("Failed to fetch teams");
      setTeams(await res.json());
    } catch (error) {
      console.error("Could not load teams:", error);
      alert("Could not load teams. Make sure you are authenticated.");
    }
  }

  async function fetchAthletes() {
    setLoading(true);
    try {
      const res = await fetch("/api/athletes");
      if (!res.ok) throw new Error("Failed to fetch athletes");
      setAthletes(await res.json());
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setField<K extends keyof typeof blankAthleteForm>(key: K, value: string | Record<string, any>) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm(blankAthleteForm);
    setEditingId(null);
  }

  const cmToInches = (cm?: number): number | undefined =>
    cm != null ? cm / 2.54 : undefined;
  const inchesToCm = (inches?: number): number | undefined =>
    inches != null ? inches * 2.54 : undefined;
  const kgToLbs = (kg?: number): number | undefined =>
    kg != null ? kg * 2.20462 : undefined;
  const lbsToKg = (lbs?: number): number | undefined =>
    lbs != null ? lbs * 0.453592 : undefined;

  function formatHeightForDisplay(cm?: number) {
    if (cm == null) return "-";
    const totalInches = cmToInches(cm);
    if (!totalInches) return `${cm.toFixed(1)} cm`;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}ft ${inches}in (${cm.toFixed(1)} cm)`;
  }

  function formatWeightForDisplay(kg?: number) {
    if (kg == null) return "-";
    const lbs = kgToLbs(kg);
    return `${lbs?.toFixed(1)} lbs (${kg.toFixed(1)} kg)`;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.teamId.trim()) return;

    // Parse events from comma-separated string to array
    const eventsArray = form.events
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    const heightMetric = form.height ? Number(form.height) : undefined;
    const weightMetric = form.weight ? Number(form.weight) : undefined;

    const payload = {
      name: form.name.trim(),
      teamId: form.teamId.trim(),
      jerseyNumber: form.jerseyNumber ? Number(form.jerseyNumber) : undefined,
      height:
        unitSystem === "imperial" && heightMetric !== undefined
          ? inchesToCm(heightMetric)
          : heightMetric,
      weight:
        unitSystem === "imperial" && weightMetric !== undefined
          ? lbsToKg(weightMetric)
          : weightMetric,
      classYear: form.classYear.trim() || undefined,
      sport: form.sport.trim() || undefined,
      events: eventsArray,
      eventRecords:
        Object.keys(form.eventRecords).length > 0 ? form.eventRecords : undefined,
      gpa: form.gpa ? Number(form.gpa) : undefined,
      academicStanding: form.academicStanding.trim() || undefined,
      eligibilityYearsLeft: form.eligibilityYearsLeft
        ? Number(form.eligibilityYearsLeft)
        : undefined,
      medicalStatus: form.medicalStatus.trim() || undefined,
      complianceStatus: form.complianceStatus.trim() || undefined,
      riskFlag: form.riskFlag.trim() || undefined,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `/api/athletes?id=${encodeURIComponent(editingId)}`
      : "/api/athletes";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Save failed");
      await fetchAthletes();
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save athlete");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete athlete?")) return;
    const res = await fetch(`/api/athletes?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Delete failed");
    await fetchAthletes();
  }

  function prepareEdit(athlete: Athlete) {
    setEditingId(athlete.id);
    setForm({
      name: athlete.name ?? "",
      teamId: athlete.teamId ?? "",
      jerseyNumber: athlete.jerseyNumber?.toString() ?? "",
      height:
        unitSystem === "imperial"
          ? athlete.height != null
            ? (() => {
                const converted = cmToInches(athlete.height);
                return converted != null ? converted.toFixed(1) : "";
              })()
            : ""
          : athlete.height?.toString() ?? "",
      weight:
        unitSystem === "imperial"
          ? athlete.weight != null
            ? (() => {
                const converted = kgToLbs(athlete.weight);
                return converted != null ? converted.toFixed(1) : "";
              })()
            : ""
          : athlete.weight?.toString() ?? "",
      classYear: athlete.classYear ?? "",
      sport: athlete.sport ?? "Track & Field",
      events: athlete.events?.join(", ") ?? "",
      eventRecords: athlete.eventRecords ?? {},
      gpa: athlete.gpa?.toString() ?? "",
      academicStanding: athlete.academicStanding ?? "",
      eligibilityYearsLeft: athlete.eligibilityYearsLeft?.toString() ?? "",
      medicalStatus: athlete.medicalStatus ?? "",
      complianceStatus: athlete.complianceStatus ?? "",
      riskFlag: athlete.riskFlag ?? "",
    });
  }

  if (status === "loading" || loading) {
    return <div>Loading athletes...</div>;
  }

  // Show 403 if unauthorized
  if (!session || !["COACH", "AD"].includes(session.user?.role || "")) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">403 - Forbidden</h1>
          <p className="text-slate-600 mb-4">You do not have permission to access this page.</p>
          <Link href="/overview" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-200">
      <div className="mx-auto max-w-4xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Athlete Roster</h1>
            <p className="text-sm text-slate-800 mt-1">
              {session?.user?.email} ({session?.user?.role})
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Logout
          </button>
        </div>

        <section className="mt-5 rounded-lg bg-white p-5 shadow">
          <h2 className="text-lg font-medium mb-3 text-slate-700">{editingId ? "Edit Athlete" : "Add Athlete"}</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              className={commonInputClass}
              placeholder="Name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
            <div className="space-y-1">
              <label className="text-xs text-slate-600">Team</label>
              <select
                className={commonInputClass}
                value={form.teamId}
                onChange={(e) => setField("teamId", e.target.value)}
              >
                <option value="">Select Team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Hide Jersey Number for Track & Field */}
            {form.sport !== "Track & Field" && (
              <input
                className={commonInputClass}
                placeholder="Jersey #"
                value={form.jerseyNumber}
                onChange={(e) => setField("jerseyNumber", e.target.value)}
                type="number"
              />
            )}

            <div className="flex gap-2 items-center">
              <span className="text-sm">Units:</span>
              <button
                type="button"
                className={`px-2 py-1 rounded ${unitSystem === "imperial" ? "bg-indigo-600 text-white" : "bg-slate-100"}`}
                onClick={() => setUnitSystem("imperial")}
              >
                Imperial
              </button>
              <button
                type="button"
                className={`px-2 py-1 rounded ${unitSystem === "metric" ? "bg-indigo-600 text-white" : "bg-slate-100"}`}
                onClick={() => setUnitSystem("metric")}
              >
                Metric
              </button>
            </div>

            <input
              className={commonInputClass}
              placeholder={unitSystem === "imperial" ? "Height (inches)" : "Height (cm)"}
              value={form.height}
              onChange={(e) => setField("height", e.target.value)}
              type="number"
              step="0.1"
            />
            <input
              className={commonInputClass}
              placeholder={unitSystem === "imperial" ? "Weight (lbs)" : "Weight (kg)"}
              value={form.weight}
              onChange={(e) => setField("weight", e.target.value)}
              type="number"
              step="0.1"
            />
            <input
              className={commonInputClass}
              placeholder="Class Year"
              value={form.classYear}
              onChange={(e) => setField("classYear", e.target.value)}
            />

            {/* Sport field - Read-only for Track & Field */}
            <input
              className={commonInputClass}
              placeholder="Sport"
              value={form.sport}
              readOnly
            />

            {/* Events field - Track & Field specific */}
            {form.sport === "Track & Field" && (
              <input
                className={commonInputClass}
                placeholder="Events (comma-separated, e.g. 100m, 200m)"
                value={form.events}
                onChange={(e) => setField("events", e.target.value)}
              />
            )}

            <input
              className={commonInputClass}
              placeholder="GPA"
              value={form.gpa}
              onChange={(e) => setField("gpa", e.target.value)}
              type="number"
              step="0.01"
              min={0}
              max={4}
            />
            <select
              className={commonInputClass}
              value={form.academicStanding}
              onChange={(e) => setField("academicStanding", e.target.value)}
            >
              <option value="">Academic Standing</option>
              <option value="GOOD">GOOD</option>
              <option value="NEUTRAL">NEUTRAL</option>
              <option value="BAD">BAD</option>
            </select>
            <input
              className={commonInputClass}
              placeholder="Eligibility Years Left"
              value={form.eligibilityYearsLeft}
              onChange={(e) => setField("eligibilityYearsLeft", e.target.value)}
              type="number"
            />
            <select
              className={commonInputClass}
              value={form.medicalStatus}
              onChange={(e) => setField("medicalStatus", e.target.value)}
            >
              <option value="">Medical Status</option>
              <option value="CLEARED">CLEARED</option>
              <option value="LIMITED">LIMITED</option>
              <option value="NOT_CLEARED">NOT_CLEARED</option>
            </select>
            <select
              className={commonInputClass}
              value={form.complianceStatus}
              onChange={(e) => setField("complianceStatus", e.target.value)}
            >
              <option value="">Compliance Status</option>
              <option value="COMPLIANT">COMPLIANT</option>
              <option value="WARNING">WARNING</option>
              <option value="NON_COMPLIANT">NON_COMPLIANT</option>
            </select>
            <select
              className={commonInputClass}
              value={form.riskFlag}
              onChange={(e) => setField("riskFlag", e.target.value)}
            >
              <option value="">Risk Flag</option>
              <option value="NONE">NONE</option>
              <option value="LOW">LOW</option>
              <option value="MODERATE">MODERATE</option>
              <option value="HIGH">HIGH</option>
            </select>

            <div className="sm:col-span-2 flex items-center gap-2 mt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700"
              >
                {editingId ? "Update" : "Add"} Athlete
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-lg bg-white p-5 shadow text-slate-700">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-medium">Athlete List</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setView("table")}
                className={`px-3 py-1 rounded ${
                  view === "table"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Table
              </button>
              <button
                type="button"
                onClick={() => setView("cards")}
                className={`px-3 py-1 rounded ${
                  view === "cards"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Cards
              </button>
            </div>
          </div>

          {view === "table" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-900 uppercase text-xs">
                  <tr>
                    <th className="px-3 py-2">Name</th>
                    <th>Team</th>
                    <th>Sport</th>
                    <th>Events</th>
                    <th>Height</th>
                    <th>Weight</th>
                    {athletes.some((a) => a.sport !== "Track & Field") && (
                      <th>Jersey</th>
                    )}
                    <th>GPA</th>
                    <th>Class</th>
                    <th>Medical</th>
                    <th>Compliance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {athletes.map((athlete) => (
                    <tr key={athlete.id} className="border-t">
                      <td className="px-3 py-2">{athlete.name}</td>
                      <td>{athlete.team?.name || athlete.teamId}</td>
                      <td>{athlete.sport ?? "-"}</td>
                      <td>{athlete.events?.join(", ") ?? "-"}</td>
                      <td>{formatHeightForDisplay(athlete.height)}</td>
                      <td>{formatWeightForDisplay(athlete.weight)}</td>
                      {athletes.some((a) => a.sport !== "Track & Field") && (
                        <td>{athlete.jerseyNumber ?? "-"}</td>
                      )}
                      <td>{athlete.gpa ?? "-"}</td>
                      <td>{athlete.classYear ?? "-"}</td>
                      <td>{athlete.medicalStatus ?? "-"}</td>
                      <td>{athlete.complianceStatus ?? "-"}</td>
                      <td className="space-x-2">
                        <button
                          onClick={() => prepareEdit(athlete)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(athlete.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {athletes.map((athlete) => (
                <article key={athlete.id} className="rounded border p-3 bg-slate-50">
                  <h3 className="font-semibold text-slate-900">{athlete.name}</h3>
                  <p className="text-xs text-slate-700">Sport: {athlete.sport ?? "-"}</p>
                  <p className="text-xs text-slate-700">
                    Events: {athlete.events?.join(", ") ?? "-"}
                  </p>
                  <p className="text-xs text-slate-700">
                    Team: {athlete.team?.name || athlete.teamId}
                  </p>
                  <p className="text-xs text-slate-700">
                    Height: {formatHeightForDisplay(athlete.height)}, Weight: {formatWeightForDisplay(athlete.weight)}
                  </p>
                  {athlete.sport !== "Track & Field" && (
                    <p className="text-xs text-slate-700">
                      Jersey: {athlete.jerseyNumber ?? "-"}
                    </p>
                  )}
                  <p className="text-sm text-slate-700 mt-1">
                    GPA: {athlete.gpa ?? "-"}
                  </p>
                  <p className="text-sm text-slate-700">
                    Class: {athlete.classYear ?? "-"}, Medical: {athlete.medicalStatus ?? "-"}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => prepareEdit(athlete)}
                      className="text-blue-600 text-xs hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(athlete.id)}
                      className="text-red-600 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
          {athletes.length === 0 && (
            <p className="py-4 text-sm text-slate-500">No athletes yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
