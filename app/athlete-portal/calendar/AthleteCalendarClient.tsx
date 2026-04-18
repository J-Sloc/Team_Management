"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ScheduleCalendar, {
  type ScheduleCalendarEvent,
} from "@/app/components/ScheduleCalendar";
import {
  apiJson,
  invalidateQueryKeys,
  toApiErrorMessage,
  toJsonBody,
} from "@/lib/clientApi";

type CalendarEvent = ScheduleCalendarEvent & {
  id: string;
  type: string;
  group: string;
  description?: string | null;
};

const blankForm = {
  title: "",
  type: "MEETING",
  description: "",
  startTime: "",
  endTime: "",
  location: "",
  opponent: "",
};
const emptyEvents: CalendarEvent[] = [];

export default function AthleteCalendarClient() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [filter, setFilter] = useState({ from: "", to: "" });

  const eventsQuery = useQuery({
    queryKey: ["athlete-calendar", filter.from, filter.to],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filter.from) params.set("from", filter.from);
      if (filter.to) params.set("to", filter.to);
      return apiJson<CalendarEvent[]>(
        `/api/events${params.toString() ? `?${params.toString()}` : ""}`,
      );
    },
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

  function resetForm() {
    setForm(blankForm);
    setEditingId(null);
  }

  function beginEdit(event: CalendarEvent) {
    if (!event.canEdit) {
      return;
    }

    setEditingId(event.id);
    setSelectedEventId(event.id);
    setForm({
      title: event.title ?? "",
      type: event.type ?? "MEETING",
      description: event.description ?? "",
      startTime: new Date(event.startTime).toISOString().slice(0, 16),
      endTime: event.endTime ? new Date(event.endTime).toISOString().slice(0, 16) : "",
      location: event.location ?? "",
      opponent: event.opponent ?? "",
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.title.trim() || !form.startTime || !form.endTime) {
      return;
    }

    try {
      await saveEventMutation.mutateAsync({
        title: form.title.trim(),
        type: form.type,
        description: form.description.trim() || null,
        startTime: form.startTime,
        endTime: form.endTime,
        location: form.location.trim() || null,
        opponent: form.opponent.trim() || null,
        group: "PERSONAL",
      });
      await invalidateQueryKeys(queryClient, [["athlete-calendar", filter.from, filter.to]]);
      toast.success(editingId ? "Calendar entry updated." : "Personal calendar entry saved.");
      resetForm();
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  async function handleDelete(eventId: string) {
    try {
      await deleteEventMutation.mutateAsync(eventId);
      await invalidateQueryKeys(queryClient, [["athlete-calendar", filter.from, filter.to]]);
      toast.success("Calendar entry deleted.");
      if (selectedEventId === eventId) {
        setSelectedEventId(null);
      }
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Calendar</h2>
            <p className="mt-1 text-sm text-slate-500">
              Team entries are read-only. Personal entries are editable by you.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
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
            <button
              type="button"
              onClick={() => eventsQuery.refetch()}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-6">
          <ScheduleCalendar
            events={events}
            highlightedEventId={selectedEventId}
            onSelectEvent={setSelectedEventId}
            title="Training and Team Calendar"
          />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Calendar Items</h2>
          <div className="mt-4 space-y-3">
            {eventsQuery.isLoading ? (
              <p className="text-sm text-slate-500">Loading calendar...</p>
            ) : events.length === 0 ? (
              <p className="text-sm text-slate-500">No calendar items found.</p>
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
                      <p className="font-medium text-slate-900">{event.title}</p>
                      <p className="text-sm text-slate-500">
                        {new Date(event.startTime).toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                        {event.ownerType === "athlete" ? "Personal" : "Team shared"}
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
                {editingId ? "Edit Personal Entry" : "Add Personal Entry"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Use personal entries for appointments, reminders, or private schedule notes.
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
              Team-created items are visible here but can only be changed by coaches or ADs.
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="text"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Title"
              className="w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
            <select
              value={form.type}
              onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option value="MEETING">Meeting</option>
              <option value="ACADEMIC">Academic</option>
              <option value="MEDICAL">Medical</option>
              <option value="PRACTICE">Practice</option>
              <option value="RECRUITING">Recruiting</option>
            </select>
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
              placeholder="Opponent or related person"
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
  );
}
