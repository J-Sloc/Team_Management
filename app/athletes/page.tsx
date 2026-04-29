"use client";

import Link from "next/link";
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

type TeamOption = {
  id: string;
  name: string;
  sport?: string;
};

type Athlete = {
  id: string;
  name: string;
  teamId: string;
  team?: { id: string; name: string };
  jerseyNumber?: number | null;
  height?: number | null;
  weight?: number | null;
  classYear?: string | null;
  sport?: string | null;
  events?: string[];
  eventRecords?: Record<string, { personalBest?: number; historical?: number[] }>;
  gpa?: number | null;
  academicStanding?: string | null;
  eligibilityYearsLeft?: number | null;
  medicalStatus?: string | null;
  complianceStatus?: string | null;
  riskFlag?: string | null;
};

type AthleteForm = {
  name: string;
  teamId: string;
  jerseyNumber: string;
  height: string;
  weight: string;
  classYear: string;
  sport: string;
  events: string;
  eventRecords: Record<string, { personalBest?: number; historical?: number[] }>;
  gpa: string;
  academicStanding: string;
  eligibilityYearsLeft: string;
  medicalStatus: string;
  complianceStatus: string;
  riskFlag: string;
};

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400";

const blankAthleteForm: AthleteForm = {
  name: "",
  teamId: "",
  jerseyNumber: "",
  height: "",
  weight: "",
  classYear: "",
  sport: "Track & Field",
  events: "",
  eventRecords: {},
  gpa: "",
  academicStanding: "",
  eligibilityYearsLeft: "",
  medicalStatus: "",
  complianceStatus: "",
  riskFlag: "",
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

function cmToInches(cm?: number | null) {
  return cm != null ? cm / 2.54 : undefined;
}

function inchesToCm(inches?: number | null) {
  return inches != null ? inches * 2.54 : undefined;
}

function kgToLbs(kg?: number | null) {
  return kg != null ? kg * 2.20462 : undefined;
}

function lbsToKg(lbs?: number | null) {
  return lbs != null ? lbs * 0.453592 : undefined;
}

function formatHeightForDisplay(cm?: number | null) {
  if (cm == null) return "-";

  const totalInches = cmToInches(cm);
  if (!totalInches) return `${cm.toFixed(1)} cm`;

  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}ft ${inches}in (${cm.toFixed(1)} cm)`;
}

function formatWeightForDisplay(kg?: number | null) {
  if (kg == null) return "-";

  const lbs = kgToLbs(kg);
  return `${lbs?.toFixed(1)} lbs (${kg.toFixed(1)} kg)`;
}

export default function AthletesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<AthleteForm>(blankAthleteForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [view, setView] = useState<"table" | "cards">("table");
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("imperial");

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

  const teamsQuery = useQuery({
    queryKey: ["teams"],
    queryFn: () => apiJson<TeamOption[]>("/api/teams"),
    enabled: Boolean(session && ["COACH", "AD"].includes(session.user?.role || "")),
  });

  const athletesQuery = useQuery({
    queryKey: ["athletes"],
    queryFn: () => apiJson<Athlete[]>("/api/athletes"),
    enabled: Boolean(session && ["COACH", "AD"].includes(session.user?.role || "")),
  });

  const saveAthleteMutation = useMutation({
    mutationFn: (payload: unknown) => {
      if (editingId) {
        return apiJson<Athlete>(`/api/athletes?id=${encodeURIComponent(editingId)}`, {
          method: "PUT",
          body: toJsonBody(payload as never),
        });
      }

      return apiJson<Athlete>("/api/athletes", {
        method: "POST",
        body: toJsonBody(payload as never),
      });
    },
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [["athletes"]]);
      toast.success(editingId ? "Athlete updated." : "Athlete created.");
      resetForm();
    },
    onError: (error) => {
      toast.error(toApiErrorMessage(error));
    },
  });

  const deleteAthleteMutation = useMutation({
    mutationFn: (athleteId: string) =>
      apiJson<{ success: true }>(`/api/athletes?id=${encodeURIComponent(athleteId)}`, {
        method: "DELETE",
      }),
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [["athletes"]]);
      toast.success("Athlete deleted.");
      if (editingId === pendingDeleteId) {
        resetForm();
      }
      setPendingDeleteId(null);
    },
    onError: (error) => {
      toast.error(toApiErrorMessage(error));
    },
  });

  const teams = teamsQuery.data ?? [];
  const athletes = athletesQuery.data ?? [];
  const pendingDeleteAthlete = athletes.find((athlete) => athlete.id === pendingDeleteId) ?? null;

  function setField<K extends keyof AthleteForm>(key: K, value: AthleteForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(blankAthleteForm);
    setEditingId(null);
  }

  function prepareEdit(athlete: Athlete) {
    setEditingId(athlete.id);
    setPendingDeleteId(null);
    setForm({
      name: athlete.name ?? "",
      teamId: athlete.teamId ?? "",
      jerseyNumber: athlete.jerseyNumber?.toString() ?? "",
      height:
        unitSystem === "imperial"
          ? athlete.height != null
            ? cmToInches(athlete.height)?.toFixed(1) ?? ""
            : ""
          : athlete.height?.toString() ?? "",
      weight:
        unitSystem === "imperial"
          ? athlete.weight != null
            ? kgToLbs(athlete.weight)?.toFixed(1) ?? ""
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.teamId.trim()) {
      return;
    }

    const heightMetric = parseNullableNumber(form.height);
    const weightMetric = parseNullableNumber(form.weight);
    const events = form.events
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      name: form.name.trim(),
      teamId: form.teamId.trim(),
      jerseyNumber: parseNullableNumber(form.jerseyNumber),
      height:
        unitSystem === "imperial"
          ? inchesToCm(heightMetric ?? undefined) ?? null
          : heightMetric,
      weight:
        unitSystem === "imperial"
          ? lbsToKg(weightMetric ?? undefined) ?? null
          : weightMetric,
      classYear: parseNullableText(form.classYear),
      sport: parseNullableText(form.sport),
      events,
      eventRecords: Object.keys(form.eventRecords).length > 0 ? form.eventRecords : undefined,
      gpa: parseNullableNumber(form.gpa),
      academicStanding: parseNullableText(form.academicStanding),
      eligibilityYearsLeft: parseNullableNumber(form.eligibilityYearsLeft),
      medicalStatus: parseNullableText(form.medicalStatus),
      complianceStatus: parseNullableText(form.complianceStatus),
      riskFlag: parseNullableText(form.riskFlag),
    };

    await saveAthleteMutation.mutateAsync(payload);
  }

  async function confirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    await deleteAthleteMutation.mutateAsync(pendingDeleteId);
  }

  if (status === "loading" || teamsQuery.isLoading || athletesQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading athletes...
      </div>
    );
  }

  if (!session || !["COACH", "AD"].includes(session.user?.role || "")) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <CoachPageHeader
          title="Athlete Roster"
          description="Manage roster details, eligibility context, and profile links from one place."
        />

        {pendingDeleteAthlete ? (
          <DeleteConfirmationPanel
            itemLabel={pendingDeleteAthlete.name}
            isPending={deleteAthleteMutation.isPending}
            onCancel={() => setPendingDeleteId(null)}
            onConfirm={confirmDelete}
          />
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editingId ? "Edit Athlete" : "Add Athlete"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep roster data, health flags, and academic indicators current for the dashboard.
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
              <input
                className={inputClass}
                placeholder="Athlete name"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                required
              />
              <select
                className={inputClass}
                value={form.teamId}
                onChange={(event) => setField("teamId", event.target.value)}
                required
              >
                <option value="">Select team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Units</span>
                <button
                  type="button"
                  onClick={() => setUnitSystem("imperial")}
                  className={`rounded-md px-3 py-1 text-sm ${
                    unitSystem === "imperial"
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-700"
                  }`}
                >
                  Imperial
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem("metric")}
                  className={`rounded-md px-3 py-1 text-sm ${
                    unitSystem === "metric"
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-700"
                  }`}
                >
                  Metric
                </button>
              </div>

              <input
                className={inputClass}
                placeholder={unitSystem === "imperial" ? "Height (inches)" : "Height (cm)"}
                value={form.height}
                onChange={(event) => setField("height", event.target.value)}
                type="number"
                step="0.1"
              />
              <input
                className={inputClass}
                placeholder={unitSystem === "imperial" ? "Weight (lbs)" : "Weight (kg)"}
                value={form.weight}
                onChange={(event) => setField("weight", event.target.value)}
                type="number"
                step="0.1"
              />
              <input
                className={inputClass}
                placeholder="Class year"
                value={form.classYear}
                onChange={(event) => setField("classYear", event.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Sport"
                value={form.sport}
                onChange={(event) => setField("sport", event.target.value)}
              />

              {form.sport !== "Track & Field" ? (
                <input
                  className={inputClass}
                  placeholder="Jersey number"
                  value={form.jerseyNumber}
                  onChange={(event) => setField("jerseyNumber", event.target.value)}
                  type="number"
                />
              ) : null}

              <input
                className={`md:col-span-2 ${inputClass}`}
                placeholder="Events (comma-separated, e.g. 100m, 200m)"
                value={form.events}
                onChange={(event) => setField("events", event.target.value)}
              />
              <input
                className={inputClass}
                placeholder="GPA"
                value={form.gpa}
                onChange={(event) => setField("gpa", event.target.value)}
                type="number"
                min="0"
                max="4"
                step="0.01"
              />
              <select
                className={inputClass}
                value={form.academicStanding}
                onChange={(event) => setField("academicStanding", event.target.value)}
              >
                <option value="">Academic standing</option>
                <option value="GOOD">GOOD</option>
                <option value="NEUTRAL">NEUTRAL</option>
                <option value="BAD">BAD</option>
              </select>
              <input
                className={inputClass}
                placeholder="Eligibility years left"
                value={form.eligibilityYearsLeft}
                onChange={(event) => setField("eligibilityYearsLeft", event.target.value)}
                type="number"
              />
              <select
                className={inputClass}
                value={form.medicalStatus}
                onChange={(event) => setField("medicalStatus", event.target.value)}
              >
                <option value="">Medical status</option>
                <option value="CLEARED">CLEARED</option>
                <option value="LIMITED">LIMITED</option>
                <option value="NOT_CLEARED">NOT_CLEARED</option>
              </select>
              <select
                className={inputClass}
                value={form.complianceStatus}
                onChange={(event) => setField("complianceStatus", event.target.value)}
              >
                <option value="">Compliance status</option>
                <option value="COMPLIANT">COMPLIANT</option>
                <option value="WARNING">WARNING</option>
                <option value="NON_COMPLIANT">NON_COMPLIANT</option>
              </select>
              <select
                className={inputClass}
                value={form.riskFlag}
                onChange={(event) => setField("riskFlag", event.target.value)}
              >
                <option value="">Risk flag</option>
                <option value="NONE">NONE</option>
                <option value="LOW">LOW</option>
                <option value="MODERATE">MODERATE</option>
                <option value="HIGH">HIGH</option>
              </select>

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={saveAthleteMutation.isPending}
                  className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {saveAthleteMutation.isPending
                    ? "Saving..."
                    : editingId
                      ? "Update Athlete"
                      : "Create Athlete"}
                </button>
                {editingId ? (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    Reset
                  </button>
                ) : null}
              </div>
            </form>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Roster</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {athletes.length} athlete{athletes.length === 1 ? "" : "s"} in scope.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setView("table")}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    view === "table"
                      ? "bg-slate-900 text-white"
                      : "border border-slate-300 text-slate-700"
                  }`}
                >
                  Table
                </button>
                <button
                  type="button"
                  onClick={() => setView("cards")}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    view === "cards"
                      ? "bg-slate-900 text-white"
                      : "border border-slate-300 text-slate-700"
                  }`}
                >
                  Cards
                </button>
              </div>
            </div>

            {athletesQuery.isError ? (
              <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {toApiErrorMessage(athletesQuery.error)}
              </p>
            ) : athletes.length === 0 ? (
              <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                No athletes yet. Add the first athlete from the form to start building the roster.
              </p>
            ) : view === "table" ? (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Athlete</th>
                      <th className="px-3 py-2">Team</th>
                      <th className="px-3 py-2">Events</th>
                      <th className="px-3 py-2">GPA</th>
                      <th className="px-3 py-2">Medical</th>
                      <th className="px-3 py-2">Compliance</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {athletes.map((athlete) => (
                      <tr key={athlete.id} className="border-t border-slate-200 align-top">
                        <td className="px-3 py-3">
                          <Link
                            href={`/athletes/${athlete.id}`}
                            className="font-medium text-blue-700 hover:underline"
                          >
                            {athlete.name}
                          </Link>
                          <p className="mt-1 text-xs text-slate-500">
                            {athlete.sport ?? "No sport"}
                            {athlete.classYear ? ` • ${athlete.classYear}` : ""}
                          </p>
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          <p>{athlete.team?.name ?? athlete.teamId}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {formatHeightForDisplay(athlete.height)} •{" "}
                            {formatWeightForDisplay(athlete.weight)}
                          </p>
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {athlete.events?.length ? athlete.events.join(", ") : "-"}
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {athlete.gpa != null ? athlete.gpa.toFixed(2) : "-"}
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {athlete.medicalStatus ?? "-"}
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {athlete.complianceStatus ?? "-"}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => prepareEdit(athlete)}
                              className="text-sm font-medium text-blue-700 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setPendingDeleteId(athlete.id)}
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
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {athletes.map((athlete) => (
                  <article key={athlete.id} className="rounded-lg border border-slate-200 p-4">
                    <Link href={`/athletes/${athlete.id}`} className="block">
                      <h3 className="font-semibold text-slate-900 hover:text-blue-700">
                        {athlete.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm text-slate-600">
                      {athlete.team?.name ?? athlete.teamId}
                      {athlete.classYear ? ` • ${athlete.classYear}` : ""}
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      Events: {athlete.events?.length ? athlete.events.join(", ") : "-"}
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Height: {formatHeightForDisplay(athlete.height)}
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Weight: {formatWeightForDisplay(athlete.weight)}
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      GPA: {athlete.gpa != null ? athlete.gpa.toFixed(2) : "-"}
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Medical: {athlete.medicalStatus ?? "-"}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => prepareEdit(athlete)}
                        className="text-sm font-medium text-blue-700 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(athlete.id)}
                        className="text-sm font-medium text-rose-700 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
