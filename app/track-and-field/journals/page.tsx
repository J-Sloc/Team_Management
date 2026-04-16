"use client";

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

type Journal = {
  id: string;
  title?: string | null;
  body: string;
  visibility?: string | null;
  createdAt: string;
  author?: {
    id: string;
    email?: string | null;
    role: string;
  };
};

export default function CoachJournalsPage() {
  const queryClient = useQueryClient();
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedAthleteId, setSelectedAthleteId] = useState("");
  const [pendingDeleteJournalId, setPendingDeleteJournalId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    body: "",
    visibility: "PRIVATE",
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
    : athletes[0]?.id ?? "";

  const journalsQuery = useQuery({
    queryKey: ["journals", effectiveSelectedAthleteId],
    enabled: Boolean(effectiveSelectedAthleteId),
    queryFn: () =>
      apiJson<Journal[]>(`/api/journals?athleteId=${encodeURIComponent(effectiveSelectedAthleteId)}`),
  });

  const journals = journalsQuery.data ?? [];

  const createJournalMutation = useMutation({
    mutationFn: (payload: unknown) =>
      apiJson<Journal>("/api/journals", {
        method: "POST",
        body: toJsonBody(payload as never),
      }),
  });

  const deleteJournalMutation = useMutation({
    mutationFn: (journalId: string) =>
      apiJson<{ success: true }>(`/api/journals?id=${encodeURIComponent(journalId)}`, {
        method: "DELETE",
      }),
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!effectiveSelectedAthleteId || !form.body.trim()) {
      return;
    }

    try {
      await createJournalMutation.mutateAsync({
        athleteId: effectiveSelectedAthleteId,
        title: form.title.trim() || null,
        body: form.body.trim(),
        visibility: form.visibility,
      });
      await invalidateQueryKeys(queryClient, [["journals", effectiveSelectedAthleteId]]);
      toast.success("Coach feedback posted.");
      setForm((current) => ({
        ...current,
        title: "",
        body: "",
      }));
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  async function confirmDelete(journalId: string) {
    try {
      await deleteJournalMutation.mutateAsync(journalId);
      await invalidateQueryKeys(queryClient, [["journals", effectiveSelectedAthleteId]]);
      toast.success("Journal entry deleted.");
      setPendingDeleteJournalId(null);
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Coach Feedback</h2>
        <p className="mt-1 text-sm text-slate-500">
          Journal history stays append-only, but coaches can now add contextual feedback entries.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <select
            value={effectiveSelectedTeamId}
            onChange={(event) => {
              setSelectedTeamId(event.target.value);
              setSelectedAthleteId("");
              setPendingDeleteJournalId(null);
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
            onChange={(event) => {
              setSelectedAthleteId(event.target.value);
              setPendingDeleteJournalId(null);
            }}
            className="rounded-md border border-slate-300 px-3 py-2"
          >
            {athletes.map((athlete) => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.name}
              </option>
            ))}
          </select>
        </div>

        {(teamsQuery.isError || athletesQuery.isError || journalsQuery.isError) && (
          <p className="mt-3 text-sm text-rose-600">
            {toApiErrorMessage(teamsQuery.error ?? athletesQuery.error ?? journalsQuery.error)}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Optional title"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
          <textarea
            value={form.body}
            onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
            placeholder="Share training feedback, recovery observations, or next-session priorities."
            rows={8}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
          <select
            value={form.visibility}
            onChange={(event) =>
              setForm((current) => ({ ...current, visibility: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="PRIVATE">Private</option>
            <option value="SHARED">Shared</option>
          </select>
          <button
            type="submit"
            disabled={createJournalMutation.isPending || !effectiveSelectedAthleteId}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {createJournalMutation.isPending ? "Posting..." : "Post Feedback"}
          </button>
        </form>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Journal History</h2>
        <div className="mt-4 space-y-4">
          {journalsQuery.isLoading ? (
            <p className="text-sm text-slate-500">Loading journal entries...</p>
          ) : journals.length === 0 ? (
            <p className="text-sm text-slate-500">
              No journal entries available for the selected athlete.
            </p>
          ) : (
            journals.map((journal) => (
              <div key={journal.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-slate-900">
                      {journal.title ?? "Untitled entry"}
                    </h3>
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      {journal.visibility ?? "PRIVATE"}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(journal.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-700">{journal.body}</p>
                {journal.author && (
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                    {journal.author.role}
                    {journal.author.email ? ` • ${journal.author.email}` : ""}
                  </p>
                )}
                <div className="mt-4 flex gap-2">
                  {pendingDeleteJournalId === journal.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => confirmDelete(journal.id)}
                        className="rounded-md bg-rose-600 px-3 py-2 text-sm text-white"
                      >
                        Confirm Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteJournalId(null)}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPendingDeleteJournalId(journal.id)}
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
