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

type MeetEntry = {
  id: string;
  athleteId: string;
  teamId: string;
  eventName: string;
  heat?: string | null;
  lane?: string | null;
  status?: string | null;
  importedFrom?: string | null;
  athlete?: { name: string };
  team?: { name: string };
};

type MeetEntryFormState = {
  athleteId: string;
  eventName: string;
  heat: string;
  lane: string;
  status: string;
};

function createEmptyForm(): MeetEntryFormState {
  return {
    athleteId: "",
    eventName: "",
    heat: "",
    lane: "",
    status: "CONFIRMED",
  };
}

export default function MeetEntriesPage() {
  const queryClient = useQueryClient();
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [pendingDeleteEntryId, setPendingDeleteEntryId] = useState<string | null>(null);
  const [queuedEntries, setQueuedEntries] = useState<MeetEntryFormState[]>([]);
  const [form, setForm] = useState<MeetEntryFormState>(createEmptyForm());

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

  const entriesQuery = useQuery({
    queryKey: ["meetEntries", effectiveSelectedTeamId],
    enabled: Boolean(effectiveSelectedTeamId),
    queryFn: () =>
      apiJson<MeetEntry[]>(
        `/api/meet-entries?teamId=${encodeURIComponent(effectiveSelectedTeamId)}`,
      ),
  });

  const athletes = athletesQuery.data ?? [];
  const entries = entriesQuery.data ?? [];
  const currentFormAthleteId = athletes.some((athlete) => athlete.id === form.athleteId)
    ? form.athleteId
    : athletes[0]?.id ?? "";

  const createEntriesMutation = useMutation({
    mutationFn: (payload: unknown) =>
      apiJson<{ createdCount: number }>("/api/meet-entries", {
        method: "POST",
        body: toJsonBody(payload as never),
      }),
  });

  const updateEntryMutation = useMutation({
    mutationFn: (payload: { id: string; body: unknown }) =>
      apiJson<MeetEntry>(`/api/meet-entries?id=${encodeURIComponent(payload.id)}`, {
        method: "PUT",
        body: toJsonBody(payload.body as never),
      }),
  });

  const deleteEntryMutation = useMutation({
    mutationFn: (entryId: string) =>
      apiJson<{ success: true }>(`/api/meet-entries?id=${encodeURIComponent(entryId)}`, {
        method: "DELETE",
      }),
  });

  function resetForm() {
    setForm({
      athleteId: athletes[0]?.id ?? "",
      eventName: "",
      heat: "",
      lane: "",
      status: "CONFIRMED",
    });
    setEditingEntryId(null);
    setPendingDeleteEntryId(null);
  }

  function toEntryPayload(entry: MeetEntryFormState) {
    return {
      athleteId: athletes.some((athlete) => athlete.id === entry.athleteId)
        ? entry.athleteId
        : athletes[0]?.id ?? "",
      teamId: effectiveSelectedTeamId,
      eventName: entry.eventName.trim(),
      heat: entry.heat.trim() || null,
      lane: entry.lane.trim() || null,
      status: entry.status.trim() || null,
      importedFrom: "Manual UI",
    };
  }

  function handleQueueEntry() {
    if (!effectiveSelectedTeamId || !currentFormAthleteId || !form.eventName.trim()) {
      return;
    }

    setQueuedEntries((current) => [
      ...current,
      {
        ...form,
        athleteId: currentFormAthleteId,
      },
    ]);
    setForm((current) => ({
      ...current,
      athleteId: currentFormAthleteId,
      eventName: "",
      heat: "",
      lane: "",
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!effectiveSelectedTeamId || !currentFormAthleteId || !form.eventName.trim()) {
      return;
    }

    if (editingEntryId) {
      try {
        await updateEntryMutation.mutateAsync({
          id: editingEntryId,
          body: toEntryPayload({
            ...form,
            athleteId: currentFormAthleteId,
          }),
        });
        await invalidateQueryKeys(queryClient, [["meetEntries", effectiveSelectedTeamId]]);
        toast.success("Meet entry updated.");
        resetForm();
      } catch (error) {
        toast.error(toApiErrorMessage(error));
      }
      return;
    }

    handleQueueEntry();
  }

  async function submitQueuedEntries() {
    if (!queuedEntries.length) {
      return;
    }

    try {
      await createEntriesMutation.mutateAsync({
        entries: queuedEntries.map(toEntryPayload),
      });
      await invalidateQueryKeys(queryClient, [["meetEntries", effectiveSelectedTeamId]]);
      toast.success(`${queuedEntries.length} meet entr${queuedEntries.length === 1 ? "y" : "ies"} saved.`);
      setQueuedEntries([]);
      resetForm();
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  function beginEdit(entry: MeetEntry) {
    setEditingEntryId(entry.id);
    setPendingDeleteEntryId(null);
    setForm({
      athleteId: entry.athleteId,
      eventName: entry.eventName,
      heat: entry.heat ?? "",
      lane: entry.lane ?? "",
      status: entry.status ?? "CONFIRMED",
    });
  }

  async function confirmDelete(entryId: string) {
    try {
      await deleteEntryMutation.mutateAsync(entryId);
      await invalidateQueryKeys(queryClient, [["meetEntries", effectiveSelectedTeamId]]);
      toast.success("Meet entry deleted.");
      if (editingEntryId === entryId) {
        resetForm();
      }
      setPendingDeleteEntryId(null);
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
              {editingEntryId ? "Edit Meet Entry" : "Meet Entry Builder"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Build multiple entries before submit. CSV import remains intentionally deferred.
            </p>
          </div>
          {editingEntryId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <select
            value={effectiveSelectedTeamId}
            onChange={(event) => {
              setSelectedTeamId(event.target.value);
              setQueuedEntries([]);
              setEditingEntryId(null);
              setPendingDeleteEntryId(null);
              setForm(createEmptyForm());
            }}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
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
          <input
            value={form.eventName}
            onChange={(event) =>
              setForm((current) => ({ ...current, eventName: event.target.value }))
            }
            placeholder="Event name"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
          <div className="grid gap-4 md:grid-cols-3">
            <input
              value={form.heat}
              onChange={(event) => setForm((current) => ({ ...current, heat: event.target.value }))}
              placeholder="Heat"
              className="rounded-md border border-slate-300 px-3 py-2"
            />
            <input
              value={form.lane}
              onChange={(event) => setForm((current) => ({ ...current, lane: event.target.value }))}
              placeholder="Lane"
              className="rounded-md border border-slate-300 px-3 py-2"
            />
            <input
              value={form.status}
              onChange={(event) =>
                setForm((current) => ({ ...current, status: event.target.value }))
              }
              placeholder="Status"
              className="rounded-md border border-slate-300 px-3 py-2"
            />
          </div>

          {(teamsQuery.isError || athletesQuery.isError || entriesQuery.isError) && (
            <p className="text-sm text-rose-600">
              {toApiErrorMessage(teamsQuery.error ?? athletesQuery.error ?? entriesQuery.error)}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={updateEntryMutation.isPending || createEntriesMutation.isPending}
              className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {editingEntryId
                ? updateEntryMutation.isPending
                  ? "Saving..."
                  : "Update Entry"
                : "Add To Batch"}
            </button>
            {!editingEntryId && (
              <button
                type="button"
                onClick={submitQueuedEntries}
                disabled={!queuedEntries.length || createEntriesMutation.isPending}
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {createEntriesMutation.isPending
                  ? "Submitting..."
                  : `Submit ${queuedEntries.length} Queued Entr${queuedEntries.length === 1 ? "y" : "ies"}`}
              </button>
            )}
          </div>
        </form>

        {!editingEntryId && (
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Queued Entries
            </h3>
            {queuedEntries.length === 0 ? (
              <p className="text-sm text-slate-500">Add entries to batch them before submit.</p>
            ) : (
              queuedEntries.map((entry, index) => (
                <div key={`${entry.athleteId}-${entry.eventName}-${index}`} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">
                        {athletes.find((athlete) => athlete.id === entry.athleteId)?.name ?? "Athlete"} •{" "}
                        {entry.eventName}
                      </p>
                      <p className="text-sm text-slate-600">
                        {entry.heat ? `Heat ${entry.heat}` : "Open"}
                        {entry.lane ? ` • Lane ${entry.lane}` : ""}
                        {entry.status ? ` • ${entry.status}` : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setQueuedEntries((current) =>
                          current.filter((_, entryIndex) => entryIndex !== index),
                        )
                      }
                      className="rounded-md border border-rose-300 px-3 py-2 text-sm text-rose-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Current Entries</h2>
        <div className="mt-4 space-y-3">
          {entriesQuery.isLoading ? (
            <p className="text-sm text-slate-500">Loading meet entries...</p>
          ) : entries.length === 0 ? (
            <p className="text-sm text-slate-500">No meet entries recorded yet.</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">
                      {entry.athlete?.name ?? "Unknown athlete"} • {entry.eventName}
                    </p>
                    <p className="text-sm text-slate-600">{entry.team?.name ?? "Track team"}</p>
                  </div>
                  <p className="text-sm text-slate-600">
                    {entry.heat ? `Heat ${entry.heat}` : "Open"}
                    {entry.lane ? ` • Lane ${entry.lane}` : ""}
                  </p>
                </div>
                {entry.status && <p className="mt-2 text-sm text-slate-500">{entry.status}</p>}
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => beginEdit(entry)}
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                  >
                    Edit
                  </button>
                  {pendingDeleteEntryId === entry.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => confirmDelete(entry.id)}
                        className="rounded-md bg-rose-600 px-3 py-2 text-sm text-white"
                      >
                        Confirm Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteEntryId(null)}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPendingDeleteEntryId(entry.id)}
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
