"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Event = {
  id: string;
  teamId: string;
  type: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  opponent?: string;
  group: string;
  createdAt: string;
  team?: { id: string; name: string };
};

type TeamOption = { id: string; name: string };

const blankEventForm = {
  teamId: "",
  type: "",
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  location: "",
  opponent: "",
  group: "",
};

export default function EventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [teams, setTeams] = useState<TeamOption[]>([]);
  const [form, setForm] = useState(blankEventForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ teamId: "", from: "", to: "" });

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.teamId) params.set("teamId", filter.teamId);
      if (filter.from) params.set("from", filter.from);
      if (filter.to) params.set("to", filter.to);

      const res = await fetch(`/api/events?${params}`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Could not load events:", error);
    } finally {
      setLoading(false);
    }
  }, [filter.teamId, filter.from, filter.to]);

  const fetchTeams = useCallback(async () => {
    try {
      const res = await fetch("/api/teams");
      if (!res.ok) throw new Error("Failed to fetch teams");
      const data: { id: string; name: string }[] = await res.json();
      setTeams(data.map((t) => ({ id: t.id, name: t.name })));
    } catch (error) {
      console.error("Could not load teams:", error);
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

    fetchTeams();
    fetchEvents();
  }, [session, status, router, fetchEvents, fetchTeams]);

  function setField<K extends keyof typeof blankEventForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm(blankEventForm);
    setEditingId(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.teamId.trim() || !form.type.trim() || !form.title.trim() || !form.startTime || !form.endTime || !form.group.trim()) return;

    const payload = {
      teamId: form.teamId.trim(),
      type: form.type.trim(),
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      startTime: form.startTime,
      endTime: form.endTime,
      location: form.location.trim() || undefined,
      opponent: form.opponent.trim() || undefined,
      group: form.group.trim(),
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `/api/events?id=${encodeURIComponent(editingId)}`
      : "/api/events";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Save failed");
      await fetchEvents();
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save event");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete event?")) return;
    const res = await fetch(`/api/events?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Delete failed");
    await fetchEvents();
  }

  function prepareEdit(event: Event) {
    setEditingId(event.id);
    setForm({
      teamId: event.teamId ?? "",
      type: event.type ?? "",
      title: event.title ?? "",
      description: event.description ?? "",
      startTime: new Date(event.startTime).toISOString().slice(0, 16),
      endTime: new Date(event.endTime).toISOString().slice(0, 16),
      location: event.location ?? "",
      opponent: event.opponent ?? "",
      group: event.group ?? "",
    });
  }

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading events...</div>;
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
          <h1 className="text-3xl font-bold">Events</h1>
          <Link href="/overview" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-medium mb-3">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filter.teamId}
              onChange={(e) => setFilter(prev => ({ ...prev, teamId: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Teams</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <input
              type="date"
              placeholder="From Date"
              value={filter.from}
              onChange={(e) => setFilter(prev => ({ ...prev, from: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="date"
              placeholder="To Date"
              value={filter.to}
              onChange={(e) => setFilter(prev => ({ ...prev, to: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <button
              onClick={fetchEvents}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-medium mb-4">
            {editingId ? "Edit Event" : "Add Event"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <select
              value={form.teamId}
              onChange={(e) => setField("teamId", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Team</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <select
              value={form.type}
              onChange={(e) => setField("type", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Event Type</option>
              <option value="GAME">Game</option>
              <option value="PRACTICE">Practice</option>
              <option value="MEETING">Meeting</option>
              <option value="MEDICAL">Medical</option>
              <option value="ACADEMIC">Academic</option>
              <option value="RECRUITING">Recruiting</option>
            </select>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="datetime-local"
              placeholder="Start Time"
              value={form.startTime}
              onChange={(e) => setField("startTime", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="datetime-local"
              placeholder="End Time"
              value={form.endTime}
              onChange={(e) => setField("endTime", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <select
              value={form.group}
              onChange={(e) => setField("group", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Group</option>
              <option value="TEAM">Team</option>
              <option value="PERSONAL">Personal</option>
            </select>
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Opponent"
              value={form.opponent}
              onChange={(e) => setField("opponent", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 md:col-span-2 lg:col-span-3"
              rows={3}
            />
            <div className="md:col-span-2 lg:col-span-3 flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editingId ? "Update" : "Add"} Event
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

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-medium">Events ({events.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opponent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(event.startTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.location || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.opponent || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => prepareEdit(event)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
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