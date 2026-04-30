"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  apiJson,
  invalidateQueryKeys,
  toApiErrorMessage,
  toJsonBody,
} from "@/lib/clientApi";
import {
  analyzeWorkoutResults,
  summarizeWorkoutPerformance,
} from "@/lib/workoutAnalysis";

type Team = {
  id: string;
  name: string;
  sport: string;
};

type Athlete = {
  id: string;
  name: string;
};

type WorkoutTemplate = {
  id: string;
  teamId: string;
  name: string;
  description?: string | null;
  sport: string;
  metrics: Array<{
    id: string;
    name: string;
    targetValue?: number | null;
    unit?: string | null;
  }>;
};

type WorkoutInstance = {
  id: string;
  athleteId: string;
  performedAt: string;
  notes?: string | null;
  results?: unknown;
  workoutTemplate?: WorkoutTemplate | null;
  athlete?: {
    id: string;
    name: string;
  } | null;
};

type WorkoutAnalyticsResponse = {
  athleteId: string;
  snapshot: {
    plannedMetricCount: number;
    aboveTargetCount: number;
    onTargetCount: number;
    belowTargetCount: number;
    adherencePercent?: number | null;
    aiSummary?: string | null;
    rolling7?: {
      workoutCount: number;
      adherencePercent?: number | null;
    } | null;
    rolling30?: {
      workoutCount: number;
      adherencePercent?: number | null;
    } | null;
  } | null;
};

type TemplateMetricInput = {
  name: string;
  targetValue: string;
  unit: string;
};

type ResultMetricInput = {
  metricName: string;
  plannedValue: string;
  value: string;
  unit: string;
  note: string;
};

const unitOptions = ["SECONDS", "MINUTES", "HOURS", "METERS", "KILOMETERS", "YARDS"] as const;

function createEmptyTemplateMetric(): TemplateMetricInput {
  return {
    name: "",
    targetValue: "",
    unit: "SECONDS",
  };
}

function createEmptyResultMetric(): ResultMetricInput {
  return {
    metricName: "",
    plannedValue: "",
    value: "",
    unit: "SECONDS",
    note: "",
  };
}

function parseNumber(value: string) {
  if (!value.trim()) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toDateTimeLocalValue(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

function normalizeTemplateMetrics(template?: WorkoutTemplate | null) {
  if (!template?.metrics?.length) {
    return [createEmptyTemplateMetric()];
  }

  return template.metrics.map((metric) => ({
    name: metric.name,
    targetValue: metric.targetValue?.toString() ?? "",
    unit: metric.unit ?? "SECONDS",
  }));
}

function normalizeResultMetrics(
  results: unknown,
  template?: WorkoutTemplate | null,
): ResultMetricInput[] {
  if (results && typeof results === "object" && "metrics" in results) {
    const metrics = Array.isArray(results.metrics) ? results.metrics : [];
    const normalized = metrics
      .map((metric) => {
        if (!metric || typeof metric !== "object") {
          return null;
        }

        const record = metric as Record<string, unknown>;
        return {
          metricName:
            typeof record.metricName === "string"
              ? record.metricName
              : typeof record.name === "string"
                ? record.name
                : "",
          plannedValue:
            typeof record.plannedValue === "number"
              ? record.plannedValue.toString()
              : "",
          value:
            typeof record.actualValue === "number"
              ? record.actualValue.toString()
              : typeof record.value === "number"
                ? record.value.toString()
              : typeof record.value === "string"
                ? record.value
                : "",
          unit: typeof record.unit === "string" ? record.unit : "SECONDS",
          note:
            typeof record.note === "string"
              ? record.note
              : typeof record.notes === "string"
                ? record.notes
                : "",
        };
      })
      .filter((metric): metric is ResultMetricInput => Boolean(metric));

    if (normalized.length > 0) {
      return normalized;
    }
  }

  if (results && typeof results === "object" && !Array.isArray(results)) {
    const normalized = Object.entries(results).map(([key, value]) => ({
      metricName: key,
      plannedValue: "",
      value: typeof value === "number" ? value.toString() : "",
      unit: "SECONDS",
      note:
        typeof value === "string"
          ? value
          : typeof value === "number"
            ? ""
            : JSON.stringify(value),
    }));

    if (normalized.length > 0) {
      return normalized;
    }
  }

  if (template?.metrics?.length) {
    return template.metrics.map((metric) => ({
      metricName: metric.name,
      plannedValue: metric.targetValue?.toString() ?? "",
      value: "",
      unit: metric.unit ?? "SECONDS",
      note: "",
    }));
  }

  return [createEmptyResultMetric()];
}

export default function TrackWorkoutsPage() {
  const queryClient = useQueryClient();
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedAthleteId, setSelectedAthleteId] = useState("");
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [editingInstanceId, setEditingInstanceId] = useState<string | null>(null);
  const [pendingDeleteTemplateId, setPendingDeleteTemplateId] = useState<string | null>(null);
  const [pendingDeleteInstanceId, setPendingDeleteInstanceId] = useState<string | null>(null);
  const [templateForm, setTemplateForm] = useState({
    name: "",
    description: "",
    metrics: [createEmptyTemplateMetric()],
  });
  const [instanceForm, setInstanceForm] = useState({
    athleteId: "",
    workoutTemplateId: "",
    performedAt: "",
    notes: "",
    metrics: [createEmptyResultMetric()],
  });

  const teamsQuery = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const data = await apiJson<Team[]>("/api/teams");
      return data.filter((team) => team.sport === "TRACK_AND_FIELD");
    },
  });

  const teams = teamsQuery.data ?? [];
  const effectiveSelectedTeamId = teams.some((team) => team.id === selectedTeamId)
    ? selectedTeamId
    : teams[0]?.id ?? "";

  const athletesQuery = useQuery({
    queryKey: ["athletes", effectiveSelectedTeamId],
    enabled: Boolean(effectiveSelectedTeamId),
    queryFn: () =>
      apiJson<Athlete[]>(
        `/api/athletes?teamId=${encodeURIComponent(effectiveSelectedTeamId)}`,
      ),
  });

  const templatesQuery = useQuery({
    queryKey: ["workoutTemplates", effectiveSelectedTeamId],
    enabled: Boolean(effectiveSelectedTeamId),
    queryFn: () =>
      apiJson<WorkoutTemplate[]>(
        `/api/workouts?teamId=${encodeURIComponent(effectiveSelectedTeamId)}`,
      ),
  });

  const athletes = athletesQuery.data ?? [];
  const effectiveSelectedAthleteId = athletes.some((athlete) => athlete.id === selectedAthleteId)
    ? selectedAthleteId
    : athletes[0]?.id ?? "";

  const instancesQuery = useQuery({
    queryKey: ["workoutInstances", effectiveSelectedAthleteId],
    enabled: Boolean(effectiveSelectedAthleteId),
    queryFn: () =>
      apiJson<WorkoutInstance[]>(
        `/api/workouts?athleteId=${encodeURIComponent(effectiveSelectedAthleteId)}`,
      ),
  });

  const workoutAnalyticsQuery = useQuery({
    queryKey: ["workoutAnalytics", effectiveSelectedAthleteId],
    enabled: Boolean(effectiveSelectedAthleteId),
    queryFn: () =>
      apiJson<WorkoutAnalyticsResponse>(
        `/api/analytics/workouts?athleteId=${encodeURIComponent(effectiveSelectedAthleteId)}`,
      ),
  });

  const templates = templatesQuery.data ?? [];
  const instances = instancesQuery.data ?? [];
  const currentInstanceAthleteId = athletes.some((athlete) => athlete.id === instanceForm.athleteId)
    ? instanceForm.athleteId
    : effectiveSelectedAthleteId;

  const saveTemplateMutation = useMutation({
    mutationFn: async (payload: { id?: string; body: unknown }) => {
      if (payload.id) {
        return apiJson<WorkoutTemplate>(
          `/api/workouts?type=template&id=${encodeURIComponent(payload.id)}`,
          {
            method: "PUT",
            body: toJsonBody(payload.body as never),
          },
        );
      }

      return apiJson<WorkoutTemplate>("/api/workouts", {
        method: "POST",
        body: toJsonBody({
          type: "template",
          ...(payload.body as Record<string, unknown>),
        }),
      });
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: (templateId: string) =>
      apiJson<{ success: true }>(
        `/api/workouts?type=template&id=${encodeURIComponent(templateId)}`,
        { method: "DELETE" },
      ),
  });

  const saveInstanceMutation = useMutation({
    mutationFn: async (payload: { id?: string; body: unknown }) => {
      if (payload.id) {
        return apiJson<WorkoutInstance>(
          `/api/workouts?type=instance&id=${encodeURIComponent(payload.id)}`,
          {
            method: "PUT",
            body: toJsonBody(payload.body as never),
          },
        );
      }

      return apiJson<WorkoutInstance>("/api/workouts", {
        method: "POST",
        body: toJsonBody({
          type: "instance",
          ...(payload.body as Record<string, unknown>),
        }),
      });
    },
  });

  const deleteInstanceMutation = useMutation({
    mutationFn: (instanceId: string) =>
      apiJson<{ success: true }>(
        `/api/workouts?type=instance&id=${encodeURIComponent(instanceId)}`,
        { method: "DELETE" },
      ),
  });

  function resetTemplateForm() {
    setTemplateForm({
      name: "",
      description: "",
      metrics: [createEmptyTemplateMetric()],
    });
    setEditingTemplateId(null);
    setPendingDeleteTemplateId(null);
  }

  function resetInstanceForm(nextTemplateId = "") {
    setInstanceForm({
      athleteId: effectiveSelectedAthleteId,
      workoutTemplateId: nextTemplateId,
      performedAt: "",
      notes: "",
      metrics: nextTemplateId
        ? normalizeResultMetrics(
            undefined,
            templates.find((template) => template.id === nextTemplateId) ?? null,
          )
        : [createEmptyResultMetric()],
    });
    setEditingInstanceId(null);
    setPendingDeleteInstanceId(null);
  }

  async function handleTemplateSubmit(event: FormEvent) {
    event.preventDefault();
    if (!effectiveSelectedTeamId || !templateForm.name.trim()) {
      return;
    }

    const payload = {
      teamId: effectiveSelectedTeamId,
      name: templateForm.name.trim(),
      description: templateForm.description.trim() || null,
      sport: "TRACK_AND_FIELD",
      metrics: templateForm.metrics
        .filter((metric) => metric.name.trim())
        .map((metric) => ({
          name: metric.name.trim(),
          targetValue: parseNumber(metric.targetValue),
          unit: metric.unit || null,
        })),
    };

    try {
      await saveTemplateMutation.mutateAsync({
        id: editingTemplateId ?? undefined,
        body: payload,
      });
      await invalidateQueryKeys(queryClient, [["workoutTemplates", effectiveSelectedTeamId]]);
      toast.success(editingTemplateId ? "Workout template updated." : "Workout template created.");
      resetTemplateForm();
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  async function handleInstanceSubmit(event: FormEvent) {
    event.preventDefault();
    if (!currentInstanceAthleteId) {
      return;
    }

    const metrics = instanceForm.metrics
      .filter(
        (metric) =>
          metric.metricName.trim() ||
          metric.plannedValue.trim() ||
          metric.value.trim() ||
          metric.note.trim(),
      )
      .map((metric) => ({
        metricName: metric.metricName.trim(),
        plannedValue: parseNumber(metric.plannedValue),
        actualValue: parseNumber(metric.value),
        unit: metric.unit || null,
        note: metric.note.trim() || null,
      }));

    const payload = {
      athleteId: currentInstanceAthleteId,
      workoutTemplateId: instanceForm.workoutTemplateId || null,
      performedAt: instanceForm.performedAt
        ? new Date(instanceForm.performedAt).toISOString()
        : undefined,
      notes: instanceForm.notes.trim() || null,
      results: {
        metrics,
      },
    };

    try {
      await saveInstanceMutation.mutateAsync({
        id: editingInstanceId ?? undefined,
        body: payload,
      });
      await invalidateQueryKeys(queryClient, [
        ["workoutInstances", currentInstanceAthleteId],
        ["workoutTemplates", effectiveSelectedTeamId],
        ["workoutAnalytics", currentInstanceAthleteId],
      ]);
      toast.success(editingInstanceId ? "Workout log updated." : "Workout log created.");
      resetInstanceForm(instanceForm.workoutTemplateId);
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  async function confirmTemplateDelete(templateId: string) {
    try {
      await deleteTemplateMutation.mutateAsync(templateId);
      await invalidateQueryKeys(queryClient, [
        ["workoutTemplates", effectiveSelectedTeamId],
        ["workoutInstances", effectiveSelectedAthleteId],
      ]);
      toast.success("Workout template deleted.");
      if (editingTemplateId === templateId) {
        resetTemplateForm();
      }
      setPendingDeleteTemplateId(null);
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  async function confirmInstanceDelete(instanceId: string) {
    try {
      await deleteInstanceMutation.mutateAsync(instanceId);
      await invalidateQueryKeys(queryClient, [["workoutInstances", effectiveSelectedAthleteId]]);
      await invalidateQueryKeys(queryClient, [["workoutAnalytics", effectiveSelectedAthleteId]]);
      toast.success("Workout log deleted.");
      if (editingInstanceId === instanceId) {
        resetInstanceForm(instanceForm.workoutTemplateId);
      }
      setPendingDeleteInstanceId(null);
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  function beginTemplateEdit(template: WorkoutTemplate) {
    setEditingTemplateId(template.id);
    setPendingDeleteTemplateId(null);
    setTemplateForm({
      name: template.name,
      description: template.description ?? "",
      metrics: normalizeTemplateMetrics(template),
    });
  }

  function beginInstanceEdit(instance: WorkoutInstance) {
    setSelectedAthleteId(instance.athleteId);
    setEditingInstanceId(instance.id);
    setPendingDeleteInstanceId(null);
    setInstanceForm({
      athleteId: instance.athleteId,
      workoutTemplateId: instance.workoutTemplate?.id ?? "",
      performedAt: toDateTimeLocalValue(instance.performedAt),
      notes: instance.notes ?? "",
      metrics: normalizeResultMetrics(instance.results, instance.workoutTemplate),
    });
  }

  function updateTemplateMetric(
    index: number,
    field: keyof TemplateMetricInput,
    value: string,
  ) {
    setTemplateForm((current) => ({
      ...current,
      metrics: current.metrics.map((metric, metricIndex) =>
        metricIndex === index ? { ...metric, [field]: value } : metric,
      ),
    }));
  }

  function updateResultMetric(index: number, field: keyof ResultMetricInput, value: string) {
    setInstanceForm((current) => ({
      ...current,
      metrics: current.metrics.map((metric, metricIndex) =>
        metricIndex === index ? { ...metric, [field]: value } : metric,
      ),
    }));
  }

  function setInstanceTemplate(templateId: string) {
    const template = templates.find((item) => item.id === templateId) ?? null;
    setInstanceForm((current) => ({
      ...current,
      workoutTemplateId: templateId,
      metrics:
        editingInstanceId && current.workoutTemplateId === templateId
          ? current.metrics
          : normalizeResultMetrics(undefined, template),
    }));
  }

  const isLoading = teamsQuery.isLoading || athletesQuery.isLoading || templatesQuery.isLoading;
  const inputClass = "text-slate-900 placeholder:text-slate-400";

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Track Team</label>
            <select
              value={effectiveSelectedTeamId}
              onChange={(event) => {
                setSelectedTeamId(event.target.value);
                setSelectedAthleteId("");
                setEditingTemplateId(null);
                setEditingInstanceId(null);
                setPendingDeleteTemplateId(null);
                setPendingDeleteInstanceId(null);
                setInstanceForm((current) => ({
                  ...current,
                  athleteId: "",
                }));
              }}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            >
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Athlete for Workout Logs
            </label>
            <select
              value={effectiveSelectedAthleteId}
              onChange={(event) => {
                setSelectedAthleteId(event.target.value);
                setEditingInstanceId(null);
                setPendingDeleteInstanceId(null);
                setInstanceForm((current) => ({
                  ...current,
                  athleteId: event.target.value,
                }));
              }}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            >
              {athletes.map((athlete) => (
                <option key={athlete.id} value={athlete.id}>
                  {athlete.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {(teamsQuery.isError || athletesQuery.isError || templatesQuery.isError) && (
          <p className="mt-3 text-sm text-rose-600">
            {toApiErrorMessage(teamsQuery.error ?? athletesQuery.error ?? templatesQuery.error)}
          </p>
        )}
        {workoutAnalyticsQuery.data?.snapshot ? (
          <div className="mt-4 space-y-4">
            {effectiveSelectedAthleteId ? (
              <Link
                href={`/assistant?scope=performance&athleteId=${encodeURIComponent(effectiveSelectedAthleteId)}&prompt=${encodeURIComponent("Summarize this athlete's performance trend and workload adherence.")}`}
                className="inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
              >
                Ask Assistant About This Athlete
              </Link>
            ) : null}
            <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Planned Metrics</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {workoutAnalyticsQuery.data.snapshot.plannedMetricCount}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Adherence</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {workoutAnalyticsQuery.data.snapshot.adherencePercent != null
                  ? `${workoutAnalyticsQuery.data.snapshot.adherencePercent}%`
                  : "N/A"}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">7-Day Workouts</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {workoutAnalyticsQuery.data.snapshot.rolling7?.workoutCount ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Trend</p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                {workoutAnalyticsQuery.data.snapshot.aiSummary ?? "No summary yet."}
              </p>
            </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {editingTemplateId ? "Edit Workout Template" : "Workout Templates"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Build templates with multiple target metrics instead of a single row.
              </p>
            </div>
            {editingTemplateId && (
              <button
                type="button"
                onClick={resetTemplateForm}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleTemplateSubmit} className="mt-4 space-y-4">
            <input
              value={templateForm.name}
              onChange={(event) =>
                setTemplateForm((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Template name"
              className={`w-full rounded-md border border-slate-300 px-3 py-2 ${inputClass}`}
              required
            />
            <textarea
              value={templateForm.description}
              onChange={(event) =>
                setTemplateForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Description"
              rows={3}
              className={`w-full rounded-md border border-slate-300 px-3 py-2 ${inputClass}`}
            />
            <div className="space-y-3">
              {templateForm.metrics.map((metric, index) => (
                <div key={`template-metric-${index}`} className="rounded-lg border border-slate-200 p-4">
                  <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]">
                    <input
                      value={metric.name}
                      onChange={(event) => updateTemplateMetric(index, "name", event.target.value)}
                      placeholder="Metric name"
                      className={`rounded-md border border-slate-300 px-3 py-2 ${inputClass}`}
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={metric.targetValue}
                      onChange={(event) =>
                        updateTemplateMetric(index, "targetValue", event.target.value)
                      }
                      placeholder="Target value"
                      className={`rounded-md border border-slate-300 px-3 py-2 ${inputClass}`}
                    />
                    <select
                      value={metric.unit}
                      onChange={(event) => updateTemplateMetric(index, "unit", event.target.value)}
                      className="rounded-md border border-slate-300 px-3 py-2 text-slate-900"
                    >
                      {unitOptions.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit.toLowerCase()}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        setTemplateForm((current) => ({
                          ...current,
                          metrics:
                            current.metrics.length === 1
                              ? [createEmptyTemplateMetric()]
                              : current.metrics.filter((_, metricIndex) => metricIndex !== index),
                        }))
                      }
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setTemplateForm((current) => ({
                    ...current,
                    metrics: [...current.metrics, createEmptyTemplateMetric()],
                  }))
                }
                className="rounded-md border border-emerald-300 px-3 py-2 text-sm font-medium text-emerald-700"
              >
                Add Metric
              </button>
            </div>
            <button
              type="submit"
              disabled={saveTemplateMutation.isPending || !effectiveSelectedTeamId}
              className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {saveTemplateMutation.isPending
                ? "Saving..."
                : editingTemplateId
                  ? "Update Template"
                  : "Create Template"}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            {isLoading ? (
              <p className="text-sm text-slate-500">Loading templates...</p>
            ) : templates.length === 0 ? (
              <p className="text-sm text-slate-500">No templates created for this team yet.</p>
            ) : (
              templates.map((template) => (
                <div key={template.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-slate-900">{template.name}</h3>
                      {template.description && (
                        <p className="mt-1 text-sm text-slate-600">{template.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => beginTemplateEdit(template)}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                      >
                        Edit
                      </button>
                      {pendingDeleteTemplateId === template.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => confirmTemplateDelete(template.id)}
                            className="rounded-md bg-rose-600 px-3 py-2 text-sm text-white"
                          >
                            Confirm Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingDeleteTemplateId(null)}
                            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPendingDeleteTemplateId(template.id)}
                          className="rounded-md border border-rose-300 px-3 py-2 text-sm text-rose-700"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {template.metrics.length === 0 ? (
                      <span className="text-sm text-slate-500">No target metrics configured.</span>
                    ) : (
                      template.metrics.map((metric) => (
                        <span
                          key={metric.id}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {metric.name}
                          {metric.targetValue != null ? `: ${metric.targetValue}` : ""}
                          {metric.unit ? ` ${metric.unit.toLowerCase()}` : ""}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {editingInstanceId ? "Edit Workout Log" : "Log Workout Instance"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Structured result rows keep reps, marks, and notes readable for later analytics.
              </p>
            </div>
            {editingInstanceId && (
              <button
                type="button"
                onClick={() => resetInstanceForm(instanceForm.workoutTemplateId)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleInstanceSubmit} className="mt-4 space-y-4">
            <select
              value={currentInstanceAthleteId}
              onChange={(event) => {
                setSelectedAthleteId(event.target.value);
                setEditingInstanceId(null);
                setPendingDeleteInstanceId(null);
                setInstanceForm((current) => ({
                  ...current,
                  athleteId: event.target.value,
                }));
              }}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
              required
            >
              <option value="">Select athlete</option>
              {athletes.map((athlete) => (
                <option key={athlete.id} value={athlete.id}>
                  {athlete.name}
                </option>
              ))}
            </select>
            <select
              value={instanceForm.workoutTemplateId}
              onChange={(event) => setInstanceTemplate(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option value="">Ad hoc workout</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              value={instanceForm.performedAt}
              onChange={(event) =>
                setInstanceForm((current) => ({
                  ...current,
                  performedAt: event.target.value,
                }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
            <textarea
              value={instanceForm.notes}
              onChange={(event) =>
                setInstanceForm((current) => ({
                  ...current,
                  notes: event.target.value,
                }))
              }
              placeholder="Coaching notes or athlete context"
              rows={3}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
            <div className="space-y-3">
              {instanceForm.metrics.map((metric, index) => (
                <div key={`result-metric-${index}`} className="rounded-lg border border-slate-200 p-4">
                  <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
                    <input
                      value={metric.metricName}
                      onChange={(event) =>
                        updateResultMetric(index, "metricName", event.target.value)
                      }
                      placeholder="Metric"
                      className="rounded-md border border-slate-300 px-3 py-2"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={metric.plannedValue}
                      onChange={(event) =>
                        updateResultMetric(index, "plannedValue", event.target.value)
                      }
                      placeholder="Planned value"
                      className="rounded-md border border-slate-300 px-3 py-2"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={metric.value}
                      onChange={(event) => updateResultMetric(index, "value", event.target.value)}
                      placeholder="Actual value"
                      className="rounded-md border border-slate-300 px-3 py-2"
                    />
                    <select
                      value={metric.unit}
                      onChange={(event) => updateResultMetric(index, "unit", event.target.value)}
                      className="rounded-md border border-slate-300 px-3 py-2"
                    >
                      {unitOptions.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit.toLowerCase()}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        setInstanceForm((current) => ({
                          ...current,
                          metrics:
                            current.metrics.length === 1
                              ? [createEmptyResultMetric()]
                              : current.metrics.filter((_, metricIndex) => metricIndex !== index),
                        }))
                      }
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    value={metric.note}
                    onChange={(event) => updateResultMetric(index, "note", event.target.value)}
                    placeholder="Rep notes, wind, split context, or recovery detail"
                    rows={2}
                    className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setInstanceForm((current) => ({
                    ...current,
                    metrics: [...current.metrics, createEmptyResultMetric()],
                  }))
                }
                className="rounded-md border border-emerald-300 px-3 py-2 text-sm font-medium text-emerald-700"
              >
                Add Result Row
              </button>
            </div>
            <button
              type="submit"
              disabled={saveInstanceMutation.isPending || !currentInstanceAthleteId}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {saveInstanceMutation.isPending
                ? "Saving..."
                : editingInstanceId
                  ? "Update Workout Log"
                  : "Save Workout Log"}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            {instancesQuery.isLoading ? (
              <p className="text-sm text-slate-500">Loading workout logs...</p>
            ) : instances.length === 0 ? (
              <p className="text-sm text-slate-500">No logged workouts for the selected athlete.</p>
            ) : (
              instances.map((instance) => {
                const resultMetrics = normalizeResultMetrics(
                  instance.results,
                  instance.workoutTemplate ?? null,
                );
                const analysis = analyzeWorkoutResults(instance.results);

                return (
                  <div key={instance.id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">
                          {instance.workoutTemplate?.name ?? "Ad hoc workout"}
                        </p>
                        <p className="text-sm text-slate-500">
                          {new Date(instance.performedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => beginInstanceEdit(instance)}
                          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                        >
                          Edit
                        </button>
                        {pendingDeleteInstanceId === instance.id ? (
                          <>
                            <button
                              type="button"
                              onClick={() => confirmInstanceDelete(instance.id)}
                              className="rounded-md bg-rose-600 px-3 py-2 text-sm text-white"
                            >
                              Confirm Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => setPendingDeleteInstanceId(null)}
                              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPendingDeleteInstanceId(instance.id)}
                            className="rounded-md border border-rose-300 px-3 py-2 text-sm text-rose-700"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                    {instance.notes && <p className="mt-3 text-sm text-slate-700">{instance.notes}</p>}
                    <p className="mt-3 text-sm font-medium text-slate-700">
                      {summarizeWorkoutPerformance(instance.results)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {resultMetrics.map((metric, index) => {
                        const metricAnalysis = analysis[index];
                        const badgeClass =
                          metricAnalysis?.classification === "excellent"
                            ? "bg-emerald-100 text-emerald-800"
                            : metricAnalysis?.classification === "under-goal"
                              ? "bg-rose-100 text-rose-800"
                              : metricAnalysis?.classification === "on-plan"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-slate-100 text-slate-700";

                        return (
                          <span
                            key={`${instance.id}-${metric.metricName}-${index}`}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}
                          >
                            {metric.metricName || "Untitled metric"}
                            {metric.plannedValue ? ` • target ${metric.plannedValue}` : ""}
                            {metric.value ? ` • actual ${metric.value}` : ""}
                            {metric.unit ? ` ${metric.unit.toLowerCase()}` : ""}
                            {metric.note ? ` • ${metric.note}` : ""}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
