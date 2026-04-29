"use client";

import Link from "next/link";
import { connection } from "next/server"
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import ScheduleCalendar, {
  type ScheduleCalendarEvent,
} from "@/app/components/ScheduleCalendar";
import LogoutButton from "@/app/components/LogoutButton";
import {
  apiJson,
  invalidateQueryKeys,
  toApiErrorMessage,
  toJsonBody,
} from "@/lib/clientApi";

type CalendarEvent = ScheduleCalendarEvent & {
  id: string;
  teamId: string;
  athleteId?: string | null;
  type: string;
  description?: string | null;
  group: string;
  team?: { id: string; name: string };
};

type TeamOption = {
  id: string;
  name: string;
  sport?: string;
};

type AthleteOption = {
  id: string;
  name: string;
  teamId: string;
  team?: { id: string; name: string };
};

const blankForm = {
  teamId: "",
  type: "MEETING",
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  location: "",
  opponent: "",
};
const emptyEvents: CalendarEvent[] = [];

export default async function EventsPage() {
  await connection(); // Ensure this is a client component
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const initialEventId = searchParams.get("eventId");
  const initialAthleteId = searchParams.get("athleteId") ?? "";
  const [selectedEventId, setSelectedEventId] = useState<string | null>(initialEventId);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    ...blankForm,
    teamId: "",
  });
  const [filter, setFilter] = useState({
    teamId: "",
    athleteId: initialAthleteId,
    from: "",
    to: "",
  });

  const teamsQuery = useQuery({
    queryKey: ["teams"],
    queryFn: () => apiJson<TeamOption[]>("/api/teams"),
    enabled: Boolean(session && ["COACH", "AD"].includes(session.user?.role || "")),
  });

  const athletesQuery = useQuery({
    queryKey: ["athletes"],
    queryFn: () => apiJson<AthleteOption[]>("/api/athletes"),
    enabled: Boolean(session && ["COACH", "AD"].includes(session.user?.role || "")),
  });

  const eventsQuery = useQuery({
    queryKey: ["events", filter.teamId, filter.athleteId, filter.from, filter.to],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filter.teamId) params.set("teamId", filter.teamId);
      if (filter.athleteId) params.set("athleteId", filter.athleteId);
      if (filter.from) params.set("from", filter.from);
      if (filter.to) params.set("to", filter.to);
      return apiJson<CalendarEvent[]>(
        `/api/events${params.toString() ? `?${params.toString()}` : ""}`,
      );
    },
    enabled: Boolean(session && ["COACH", "AD"].includes(session.user?.role || "")),
  });

  const saveEventMutation = useMutation({
    mutationFn: (payload: unknown) => {
      if (editingId) {
        return apiJson<CalendarEvent>(`/api/events?id=${encodeURIComponent(editingId)}`, {
          method: "PUT",
          body: toJsonBody(payload as never),
        });
      }

      return apiJson<CalendarEvent>("/api/events", {
        method: "POST",
        body: toJsonBody(payload as never),
      });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: (eventId: string) =>
      apiJson<{ success: true }>(`/api/events?id=${encodeURIComponent(eventId)}`, {
        method: "DELETE",
      }),
  });

  const events = eventsQuery.data ?? emptyEvents;
  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? null;
  const effectiveTeamId = form.teamId || teamsQuery.data?.[0]?.id || "";

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

  if (status === "loading" || teamsQuery.isLoading || athletesQuery.isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading calendar...</div>;
  }

  if (!session || !["COACH", "AD"].includes(session.user?.role || "")) {
    return null;
  }

  function resetForm() {
    setForm({
      ...blankForm,
      teamId: effectiveTeamId,
    });
    setEditingId(null);
  }

  function beginEdit(event: CalendarEvent) {
    if (!event.canEdit) {
      return;
    }

    setEditingId(event.id);
    setSelectedEventId(event.id);
    setForm({
      teamId: event.teamId,
      type: event.type,
      title: event.title,
      description: event.description ?? "",
      startTime: new Date(event.startTime).toISOString().slice(0, 16),
      endTime: event.endTime ? new Date(event.endTime).toISOString().slice(0, 16) : "",
      location: event.location ?? "",
      opponent: event.opponent ?? "",
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!effectiveTeamId || !form.title.trim() || !form.startTime || !form.endTime) {
      return;
    }

    try {
      await saveEventMutation.mutateAsync({
        teamId: effectiveTeamId,
        type: form.type,
        title: form.title.trim(),
        description: form.description.trim() || null,
        startTime: form.startTime,
        endTime: form.endTime,
        location: form.location.trim() || null,
        opponent: form.opponent.trim() || null,
        group: "TEAM",
      });
      await invalidateQueryKeys(queryClient, [
        ["events", filter.teamId, filter.athleteId, filter.from, filter.to],
      ]);
      toast.success(editingId ? "Team calendar entry updated." : "Team calendar entry created.");
      resetForm();
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  async function handleDelete(eventId: string) {
    try {
      await deleteEventMutation.mutateAsync(eventId);
      await invalidateQueryKeys(queryClient, [
        ["events", filter.teamId, filter.athleteId, filter.from, filter.to],
      ]);
      toast.success("Calendar entry deleted.");
      if (selectedEventId === eventId) {
        setSelectedEventId(null);
      }
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Calendar Management</h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage team-shared entries and review athlete personal entries in scope.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/overview"
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
              >
                Back to Dashboard
              </Link>
              <LogoutButton className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700" />
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <select
              value={filter.teamId}
              onChange={(event) => setFilter((current) => ({ ...current, teamId: event.target.value }))}
              className="rounded-md border border-slate-300 px-3 py-2"
              disabled={Boolean(filter.athleteId)}
            >
              <option value="">All Teams</option>
              {(teamsQuery.data ?? []).map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <select
              value={filter.athleteId}
              onChange={(event) => setFilter((current) => ({ ...current, athleteId: event.target.value }))}
              className="rounded-md border border-slate-300 px-3 py-2"
            >
              <option value="">All Athletes</option>
              {(athletesQuery.data ?? []).map((athlete) => (
                <option key={athlete.id} value={athlete.id}>
                  {athlete.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={filter.from}
              onChange={(event) => setFilter((current) => ({ ...current, from: event.target.value }))}
              className="rounded-md border border-slate-300 px-3 py-2"
            />
            <input
              type="date"
              value={filter.to}
              onChange={(event) => setFilter((current) => ({ ...current, to: event.target.value }))}
              className="rounded-md border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="mt-6">
            <ScheduleCalendar
              events={events}
              highlightedEventId={selectedEventId}
              onSelectEvent={setSelectedEventId}
              title="Shared and Personal Calendar"
            />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Calendar Entries</h2>
            <div className="mt-4 space-y-3">
              {eventsQuery.isLoading ? (
                <p className="text-sm text-slate-500">Loading calendar entries...</p>
              ) : events.length === 0 ? (
                <p className="text-sm text-slate-500">No calendar entries found.</p>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className={`rounded-lg border p-4 ${
                      event.id === selectedEventId ? "border-blue-400 bg-blue-50" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-900">{event.title}</p>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-600">
                            {event.ownerType === "athlete" ? "Personal" : "Team"}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">
                          {new Date(event.startTime).toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {event.team?.name ?? "Unknown team"}
                          {event.athlete ? ` • ${event.athlete.name}` : ""}
                        </p>
                      </div>
                      {event.canEdit ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => beginEdit(event)}
                            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(event.id)}
                            className="rounded-md border border-rose-300 px-3 py-2 text-sm text-rose-700"
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          Read only
                        </span>
                      )}
                    </div>
                    {event.location ? (
                      <p className="mt-2 text-sm text-slate-700">{event.location}</p>
                    ) : null}
                    {event.description ? (
                      <p className="mt-2 text-sm text-slate-700">{event.description}</p>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editingId ? "Edit Team Entry" : "Add Team Entry"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Coaches and ADs can create or update team-shared calendar entries here.
                </p>
              </div>
              {editingId ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
                >
                  Cancel
                </button>
              ) : null}
            </div>

            {selectedEvent && !selectedEvent.canEdit ? (
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Athlete-owned personal entries are visible for context but remain read-only for staff.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <select
                value={effectiveTeamId}
                onChange={(event) => setForm((current) => ({ ...current, teamId: event.target.value }))}
                className="w-full rounded-md border border-slate-300 px-3 py-2"
                required
              >
                <option value="">Select Team</option>
                {(teamsQuery.data ?? []).map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              <select
                value={form.type}
                onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
                className="w-full rounded-md border border-slate-300 px-3 py-2"
              >
                <option value="GAME">Game</option>
                <option value="PRACTICE">Practice</option>
                <option value="MEETING">Meeting</option>
                <option value="MEDICAL">Medical</option>
                <option value="ACADEMIC">Academic</option>
                <option value="RECRUITING">Recruiting</option>
              </select>
              <input
                type="text"
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                placeholder="Title"
                className="w-full rounded-md border border-slate-300 px-3 py-2"
                required
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="datetime-local"
                  value={form.startTime}
                  onChange={(event) => setForm((current) => ({ ...current, startTime: event.target.value }))}
                  className="rounded-md border border-slate-300 px-3 py-2"
                  required
                />
                <input
                  type="datetime-local"
                  value={form.endTime}
                  onChange={(event) => setForm((current) => ({ ...current, endTime: event.target.value }))}
                  className="rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </div>
              <input
                type="text"
                value={form.location}
                onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                placeholder="Location"
                className="w-full rounded-md border border-slate-300 px-3 py-2"
              />
              <input
                type="text"
                value={form.opponent}
                onChange={(event) => setForm((current) => ({ ...current, opponent: event.target.value }))}
                placeholder="Opponent"
                className="w-full rounded-md border border-slate-300 px-3 py-2"
              />
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                placeholder="Description"
                rows={4}
                className="w-full rounded-md border border-slate-300 px-3 py-2"
              />
              <button
                type="submit"
                disabled={saveEventMutation.isPending}
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {saveEventMutation.isPending
                  ? "Saving..."
                  : editingId
                    ? "Update Entry"
                    : "Save Entry"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
