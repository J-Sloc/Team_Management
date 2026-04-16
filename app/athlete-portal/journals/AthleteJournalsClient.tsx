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

export default function AthleteJournalsClient({ athlete }: { athlete: Athlete }) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pendingDeleteJournalId, setPendingDeleteJournalId] = useState<string | null>(null);

  const journalsQuery = useQuery({
    queryKey: ["journals", athlete.id],
    queryFn: () =>
      apiJson<Journal[]>(`/api/journals?athleteId=${encodeURIComponent(athlete.id)}`),
  });

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
    if (!body.trim()) {
      return;
    }

    try {
      await createJournalMutation.mutateAsync({
        athleteId: athlete.id,
        title: title.trim() || null,
        body: body.trim(),
      });
      await invalidateQueryKeys(queryClient, [["journals", athlete.id]]);
      toast.success("Journal entry saved.");
      setTitle("");
      setBody("");
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  async function confirmDelete(journalId: string) {
    try {
      await deleteJournalMutation.mutateAsync(journalId);
      await invalidateQueryKeys(queryClient, [["journals", athlete.id]]);
      toast.success("Journal entry deleted.");
      setPendingDeleteJournalId(null);
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  const journals = journalsQuery.data ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Journal History</h2>
            <p className="mt-1 text-sm text-slate-500">{athlete.name}</p>
          </div>
        </div>

        {journalsQuery.isError && (
          <p className="mt-3 text-sm text-rose-600">{toApiErrorMessage(journalsQuery.error)}</p>
        )}

        <div className="mt-4 space-y-4">
          {journalsQuery.isLoading ? (
            <p className="text-sm text-slate-500">Loading journals...</p>
          ) : journals.length === 0 ? (
            <p className="text-sm text-slate-500">No journal entries yet.</p>
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

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">New Journal Entry</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write your training notes, recovery updates, or questions for your coach."
            rows={8}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
          <button
            type="submit"
            disabled={createJournalMutation.isPending}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {createJournalMutation.isPending ? "Saving..." : "Save Entry"}
          </button>
        </form>
      </section>
    </div>
  );
}
