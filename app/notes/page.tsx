"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Note = {
  id: string;
  athleteId?: string;
  userId: string;
  category: string;
  body: string;
  createdAt: string;
  athlete?: { id: string; name: string };
};

type AthleteOption = { id: string; name: string };

const blankNoteForm = {
  athleteId: "",
  category: "",
  body: "",
};

export default function NotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [athletes, setAthletes] = useState<AthleteOption[]>([]);
  const [form, setForm] = useState(blankNoteForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ athleteId: "", category: "" });

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.athleteId) params.set("athleteId", filter.athleteId);
      if (filter.category) params.set("category", filter.category);

      const res = await fetch(`/api/notes?${params}`);
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Could not load notes:", error);
    } finally {
      setLoading(false);
    }
  }, [filter.athleteId, filter.category]);

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
    fetchNotes();
  }, [session, status, router, fetchNotes, fetchAthletes]);

  function setField<K extends keyof typeof blankNoteForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm(blankNoteForm);
    setEditingId(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.category.trim() || !form.body.trim()) return;

    const payload = {
      athleteId: form.athleteId.trim() || undefined,
      category: form.category.trim(),
      body: form.body.trim(),
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `/api/notes?id=${encodeURIComponent(editingId)}`
      : "/api/notes";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Save failed");
      await fetchNotes();
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save note");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete note?")) return;
    const res = await fetch(`/api/notes?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Delete failed");
    await fetchNotes();
  }

  function prepareEdit(note: Note) {
    setEditingId(note.id);
    setForm({
      athleteId: note.athleteId ?? "",
      category: note.category ?? "",
      body: note.body ?? "",
    });
  }

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading notes...</div>;
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
          <h1 className="text-3xl font-bold">Notes</h1>
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
              value={filter.category}
              onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Categories</option>
              <option value="ACADEMIC">Academic</option>
              <option value="MEDICAL">Medical</option>
              <option value="GENERAL">General</option>
              <option value="SPORT_SPECIFIC">Sport Specific</option>
            </select>
            <button
              onClick={fetchNotes}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-medium mb-4">
            {editingId ? "Edit Note" : "Add Note"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={form.athleteId}
              onChange={(e) => setField("athleteId", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">General Note (No Athlete)</option>
              {athletes.map(athlete => (
                <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
              ))}
            </select>
            <select
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Category</option>
              <option value="ACADEMIC">Academic</option>
              <option value="MEDICAL">Medical</option>
              <option value="GENERAL">General</option>
              <option value="SPORT_SPECIFIC">Sport Specific</option>
            </select>
            <textarea
              placeholder="Note body"
              value={form.body}
              onChange={(e) => setField("body", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
              rows={4}
              required
            />
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editingId ? "Update" : "Add"} Note
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

        {/* Notes List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-medium">Notes ({notes.length})</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {notes.map((note) => (
              <div key={note.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        note.category === 'ACADEMIC' ? 'bg-blue-100 text-blue-800' :
                        note.category === 'MEDICAL' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {note.category}
                      </span>
                      {note.athlete && (
                        <span className="text-sm text-gray-600">
                          Athlete: {note.athlete.name}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-900 whitespace-pre-wrap">{note.body}</p>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <button
                      onClick={() => prepareEdit(note)}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
