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

type Note = {
  id: string;
  athleteId?: string | null;
  userId: string;
  category: string;
  body: string;
  createdAt: string;
  athlete?: { id: string; name: string } | null;
};

type AthleteOption = {
  id: string;
  name: string;
};

type NoteForm = {
  athleteId: string;
  category: string;
  body: string;
};

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400";

const blankNoteForm: NoteForm = {
  athleteId: "",
  category: "",
  body: "",
};

const noteCategories = [
  { value: "ACADEMIC", label: "Academic" },
  { value: "MEDICAL", label: "Medical" },
  { value: "GENERAL", label: "General" },
  { value: "SPORT_SPECIFIC", label: "Sport Specific" },
];

export default function NotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<NoteForm>(blankNoteForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState({ athleteId: "", category: "" });

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

  const notesQuery = useQuery({
    queryKey: ["notes", filter.athleteId, filter.category],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filter.athleteId) params.set("athleteId", filter.athleteId);
      if (filter.category) params.set("category", filter.category);
      return apiJson<Note[]>(`/api/notes${params.toString() ? `?${params.toString()}` : ""}`);
    },
    enabled: Boolean(session && ["COACH", "AD"].includes(session.user?.role || "")),
  });

  const saveNoteMutation = useMutation({
    mutationFn: (payload: unknown) => {
      if (editingId) {
        return apiJson<Note>(`/api/notes?id=${encodeURIComponent(editingId)}`, {
          method: "PUT",
          body: toJsonBody(payload as never),
        });
      }

      return apiJson<Note>("/api/notes", {
        method: "POST",
        body: toJsonBody(payload as never),
      });
    },
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [["notes"]]);
      toast.success(editingId ? "Note updated." : "Note created.");
      resetForm();
    },
    onError: (error) => {
      toast.error(toApiErrorMessage(error));
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) =>
      apiJson<{ success: true }>(`/api/notes?id=${encodeURIComponent(noteId)}`, {
        method: "DELETE",
      }),
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [["notes"]]);
      toast.success("Note deleted.");
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
  const notes = notesQuery.data ?? [];
  const pendingDeleteNote = notes.find((note) => note.id === pendingDeleteId) ?? null;

  function setField<K extends keyof NoteForm>(key: K, value: NoteForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(blankNoteForm);
    setEditingId(null);
  }

  function prepareEdit(note: Note) {
    setEditingId(note.id);
    setPendingDeleteId(null);
    setForm({
      athleteId: note.athleteId ?? "",
      category: note.category ?? "",
      body: note.body ?? "",
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.category.trim() || !form.body.trim()) {
      return;
    }

    await saveNoteMutation.mutateAsync({
      athleteId: form.athleteId.trim() || undefined,
      category: form.category.trim(),
      body: form.body.trim(),
    });
  }

  async function confirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    await deleteNoteMutation.mutateAsync(pendingDeleteId);
  }

  if (status === "loading" || athletesQuery.isLoading || notesQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading notes...
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
          title="Notes"
          description="Capture academic, medical, general, and sport-specific context with the same shared request and feedback model as the rest of the app."
        />

        {pendingDeleteNote ? (
          <DeleteConfirmationPanel
            itemLabel={pendingDeleteNote.athlete?.name ?? "General note"}
            isPending={deleteNoteMutation.isPending}
            onCancel={() => setPendingDeleteId(null)}
            onConfirm={confirmDelete}
          />
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editingId ? "Edit Note" : "Add Note"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Attach notes to an athlete when possible so they surface on the athlete detail page.
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

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <select
                value={form.athleteId}
                onChange={(event) => setField("athleteId", event.target.value)}
                className={inputClass}
              >
                <option value="">General note (no athlete)</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id} value={athlete.id}>
                    {athlete.name}
                  </option>
                ))}
              </select>
              <select
                value={form.category}
                onChange={(event) => setField("category", event.target.value)}
                className={inputClass}
                required
              >
                <option value="">Category</option>
                {noteCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Write note details"
                value={form.body}
                onChange={(event) => setField("body", event.target.value)}
                className={`min-h-40 ${inputClass}`}
                required
              />
              <button
                type="submit"
                disabled={saveNoteMutation.isPending}
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {saveNoteMutation.isPending
                  ? "Saving..."
                  : editingId
                    ? "Update Note"
                    : "Create Note"}
              </button>
            </form>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Recent Notes</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {notes.length} note{notes.length === 1 ? "" : "s"} matching the current filters.
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
                  value={filter.category}
                  onChange={(event) =>
                    setFilter((current) => ({ ...current, category: event.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="">All categories</option>
                  {noteCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setFilter({ athleteId: "", category: "" })}
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {notesQuery.isError ? (
              <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {toApiErrorMessage(notesQuery.error)}
              </p>
            ) : notes.length === 0 ? (
              <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                No notes found for the current filter set.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {notes.map((note) => (
                  <article key={note.id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-600">
                            {note.category.replaceAll("_", " ")}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(note.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-2 font-medium text-slate-900">
                          {note.athlete?.name ?? "General note"}
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                          {note.body}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => prepareEdit(note)}
                          className="text-sm font-medium text-blue-700 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDeleteId(note.id)}
                          className="text-sm font-medium text-rose-700 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
