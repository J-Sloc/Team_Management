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

type Team = {
  id: string;
  name: string;
  sport: string;
};

type Athlete = {
  id: string;
  name: string;
};

type Ranking = {
  id: string;
  eventName: string;
  rank: number;
  region?: string | null;
  score?: number | null;
  recordedAt: string;
  athlete: {
    id: string;
    name: string;
  };
  rankingSource: {
    id: string;
    name: string;
    type?: string | null;
  };
};

type ProjectionResponse = {
  athleteId: string;
  projections: Array<{
    eventName: string;
    latestValue?: number | null;
    confidenceLabel: string;
    projection: {
      projectedValue?: number | null;
      direction: string;
      estimateLabel: string;
      dataIsSufficient: boolean;
    };
  }>;
};

function toDateInputValue(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

export default function RankingsPage() {
  const queryClient = useQueryClient();
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedAthleteId, setSelectedAthleteId] = useState("");
  const [editingRankingId, setEditingRankingId] = useState<string | null>(null);
  const [pendingDeleteRankingId, setPendingDeleteRankingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    athleteId: "",
    sourceName: "",
    sourceType: "MANUAL",
    eventName: "",
    rank: "",
    region: "",
    score: "",
    recordedAt: "",
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

  const athletes = athletesQuery.data ?? [];
  const effectiveSelectedAthleteId = athletes.some((athlete) => athlete.id === selectedAthleteId)
    ? selectedAthleteId
    : "";
  const currentFormAthleteId = athletes.some((athlete) => athlete.id === form.athleteId)
    ? form.athleteId
    : athletes[0]?.id ?? "";

  const rankingsQuery = useQuery({
    queryKey: ["rankings", effectiveSelectedTeamId, effectiveSelectedAthleteId],
    enabled: Boolean(effectiveSelectedTeamId),
    queryFn: () => {
      const params = new URLSearchParams();
      params.set("teamId", effectiveSelectedTeamId);
      if (effectiveSelectedAthleteId) {
        params.set("athleteId", effectiveSelectedAthleteId);
      }

      return apiJson<Ranking[]>(`/api/rankings?${params.toString()}`);
    },
  });

  const projectionsQuery = useQuery({
    queryKey: ["performanceProjections", effectiveSelectedAthleteId],
    enabled: Boolean(effectiveSelectedAthleteId),
    queryFn: () =>
      apiJson<ProjectionResponse>(
        `/api/analytics/projections?athleteId=${encodeURIComponent(effectiveSelectedAthleteId)}`,
      ),
  });

  const rankings = rankingsQuery.data ?? [];

  const saveRankingMutation = useMutation({
    mutationFn: (payload: { id?: string; body: unknown }) => {
      if (payload.id) {
        return apiJson<Ranking>(`/api/rankings?id=${encodeURIComponent(payload.id)}`, {
          method: "PUT",
          body: toJsonBody(payload.body as never),
        });
      }

      return apiJson<Ranking>("/api/rankings", {
        method: "POST",
        body: toJsonBody({
          type: "entry",
          ...(payload.body as Record<string, unknown>),
        }),
      });
    },
  });

  const deleteRankingMutation = useMutation({
    mutationFn: (rankingId: string) =>
      apiJson<{ success: true }>(`/api/rankings?id=${encodeURIComponent(rankingId)}`, {
        method: "DELETE",
      }),
  });

  function resetForm() {
    setForm({
      athleteId: athletes[0]?.id ?? "",
      sourceName: "",
      sourceType: "MANUAL",
      eventName: "",
      rank: "",
      region: "",
      score: "",
      recordedAt: "",
    });
    setEditingRankingId(null);
    setPendingDeleteRankingId(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!currentFormAthleteId || !form.sourceName.trim() || !form.eventName.trim() || !form.rank) {
      return;
    }

    const payload = {
      athleteId: currentFormAthleteId,
      sourceName: form.sourceName.trim(),
      sourceType: form.sourceType.trim() || undefined,
      eventName: form.eventName.trim(),
      rank: Number(form.rank),
      region: form.region.trim() || null,
      score: form.score ? Number(form.score) : null,
      recordedAt: form.recordedAt ? new Date(form.recordedAt).toISOString() : undefined,
    };

    try {
      await saveRankingMutation.mutateAsync({
        id: editingRankingId ?? undefined,
        body: payload,
      });
      await invalidateQueryKeys(queryClient, [
        ["rankings", effectiveSelectedTeamId, effectiveSelectedAthleteId],
        ["rankings", effectiveSelectedTeamId, ""],
      ]);
      toast.success(editingRankingId ? "Ranking entry updated." : "Ranking entry saved.");
      resetForm();
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  function beginEdit(ranking: Ranking) {
    setEditingRankingId(ranking.id);
    setPendingDeleteRankingId(null);
    setForm({
      athleteId: ranking.athlete.id,
      sourceName: ranking.rankingSource.name,
      sourceType: ranking.rankingSource.type ?? "MANUAL",
      eventName: ranking.eventName,
      rank: ranking.rank.toString(),
      region: ranking.region ?? "",
      score: ranking.score?.toString() ?? "",
      recordedAt: toDateInputValue(ranking.recordedAt),
    });
  }

  async function confirmDelete(rankingId: string) {
    try {
      await deleteRankingMutation.mutateAsync(rankingId);
      await invalidateQueryKeys(queryClient, [
        ["rankings", effectiveSelectedTeamId, effectiveSelectedAthleteId],
        ["rankings", effectiveSelectedTeamId, ""],
      ]);
      toast.success("Ranking entry deleted.");
      if (editingRankingId === rankingId) {
        resetForm();
      }
      setPendingDeleteRankingId(null);
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {editingRankingId ? "Edit Ranking Entry" : "Add Ranking Entry"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Ranking source creation stays inline so coaches can record results quickly.
            </p>
          </div>
          {editingRankingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <select
            value={effectiveSelectedTeamId}
            onChange={(event) => {
              setSelectedTeamId(event.target.value);
              setSelectedAthleteId("");
              setEditingRankingId(null);
              setPendingDeleteRankingId(null);
              setForm((current) => ({ ...current, athleteId: "" }));
            }}
            className="rounded-md border border-slate-300 px-3 py-2"
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <select
            value={effectiveSelectedAthleteId}
            onChange={(event) => setSelectedAthleteId(event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="">All athletes</option>
            {athletes.map((athlete) => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.name}
              </option>
            ))}
          </select>
        </div>

        {(teamsQuery.isError || athletesQuery.isError || rankingsQuery.isError) && (
          <p className="mt-3 text-sm text-rose-600">
            {toApiErrorMessage(teamsQuery.error ?? athletesQuery.error ?? rankingsQuery.error)}
          </p>
        )}

        {effectiveSelectedAthleteId && projectionsQuery.data?.projections.length ? (
          <div className="mt-4 rounded-lg border border-slate-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Projection Preview</p>
                <p className="text-xs text-slate-500">
                  Trend-based estimates only. Do not treat these as guarantees.
                </p>
              </div>
              <Link
                href={`/assistant?scope=performance&athleteId=${encodeURIComponent(effectiveSelectedAthleteId)}&prompt=${encodeURIComponent("Summarize this athlete's performance trend and projection outlook.")}`}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
              >
                Ask Assistant
              </Link>
            </div>
            <div className="mt-3 space-y-2">
              {projectionsQuery.data.projections.slice(0, 3).map((projection) => (
                <div key={projection.eventName} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-900">{projection.eventName}</p>
                  <p>
                    Latest: {projection.latestValue ?? "N/A"} • Direction: {projection.projection.direction}
                  </p>
                  <p>
                    Estimate: {projection.projection.projectedValue ?? "Not enough data"} • Confidence: {projection.confidenceLabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <select
            value={currentFormAthleteId}
            onChange={(event) =>
              setForm((current) => ({ ...current, athleteId: event.target.value }))
            }
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
          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={form.sourceName}
              onChange={(event) =>
                setForm((current) => ({ ...current, sourceName: event.target.value }))
              }
              placeholder="Source name"
              className="w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
            <input
              value={form.sourceType}
              onChange={(event) =>
                setForm((current) => ({ ...current, sourceType: event.target.value }))
              }
              placeholder="Source type"
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>
          <input
            value={form.eventName}
            onChange={(event) =>
              setForm((current) => ({ ...current, eventName: event.target.value }))
            }
            placeholder="Event"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="number"
              value={form.rank}
              onChange={(event) =>
                setForm((current) => ({ ...current, rank: event.target.value }))
              }
              placeholder="Rank"
              className="rounded-md border border-slate-300 px-3 py-2"
              required
            />
            <input
              value={form.region}
              onChange={(event) =>
                setForm((current) => ({ ...current, region: event.target.value }))
              }
              placeholder="Region"
              className="rounded-md border border-slate-300 px-3 py-2"
            />
            <input
              type="number"
              step="0.01"
              value={form.score}
              onChange={(event) =>
                setForm((current) => ({ ...current, score: event.target.value }))
              }
              placeholder="Score / mark"
              className="rounded-md border border-slate-300 px-3 py-2"
            />
          </div>
          <input
            type="date"
            value={form.recordedAt}
            onChange={(event) =>
              setForm((current) => ({ ...current, recordedAt: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
          <button
            type="submit"
            disabled={saveRankingMutation.isPending}
            className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {saveRankingMutation.isPending
              ? "Saving..."
              : editingRankingId
                ? "Update Ranking"
                : "Save Ranking"}
          </button>
        </form>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Ranking Feed</h2>
        <div className="mt-4 space-y-3">
          {rankingsQuery.isLoading ? (
            <p className="text-sm text-slate-500">Loading ranking entries...</p>
          ) : rankings.length === 0 ? (
            <p className="text-sm text-slate-500">No rankings available for the current filter.</p>
          ) : (
            rankings.map((ranking) => (
              <div key={ranking.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">
                      {ranking.athlete.name} • {ranking.eventName}
                    </p>
                    <p className="text-sm text-slate-600">
                      {ranking.rankingSource.name}
                      {ranking.rankingSource.type ? ` • ${ranking.rankingSource.type}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-slate-900">#{ranking.rank}</p>
                    {ranking.score != null && (
                      <p className="text-sm text-slate-600">{ranking.score}</p>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {ranking.region ? `${ranking.region} • ` : ""}
                  {new Date(ranking.recordedAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => beginEdit(ranking)}
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                  >
                    Edit
                  </button>
                  {pendingDeleteRankingId === ranking.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => confirmDelete(ranking.id)}
                        className="rounded-md bg-rose-600 px-3 py-2 text-sm text-white"
                      >
                        Confirm Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteRankingId(null)}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPendingDeleteRankingId(ranking.id)}
                      className="rounded-md border border-rose-300 px-3 py-2 text-sm text-rose-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
