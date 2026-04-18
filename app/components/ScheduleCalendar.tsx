"use client";

import { useMemo, useState } from "react";

export type ScheduleCalendarEvent = {
  id: string;
  title: string;
  startTime: string;
  endTime?: string | null;
  location?: string | null;
  opponent?: string | null;
  ownerType?: "team" | "athlete";
  canEdit?: boolean;
  isReadOnly?: boolean;
  athlete?: {
    id: string;
    name: string;
  } | null;
};

type ScheduleCalendarProps = {
  events: ScheduleCalendarEvent[];
  highlightedEventId?: string | null;
  onSelectEvent?: (eventId: string) => void;
  title?: string;
  emptyLabel?: string;
};

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getMonthName(date: Date) {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export default function ScheduleCalendar({
  events,
  highlightedEventId,
  onSelectEvent,
  title = "Schedule Calendar",
  emptyLabel = "No calendar items for this day.",
}: ScheduleCalendarProps) {
  const today = new Date();
  const todayKey = formatDateKey(today);
  const highlightedEvent = useMemo(
    () => events.find((event) => event.id === highlightedEventId) ?? null,
    [events, highlightedEventId],
  );
  const highlightedEventDate = highlightedEvent
    ? new Date(highlightedEvent.startTime)
    : today;
  const [manualFocus, setManualFocus] = useState<Date | null>(null);
  const [manualSelectedDay, setManualSelectedDay] = useState<string | null>(null);
  const focus =
    manualFocus ??
    new Date(highlightedEventDate.getFullYear(), highlightedEventDate.getMonth(), 1);
  const selectedDay = manualSelectedDay ?? formatDateKey(highlightedEventDate);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, ScheduleCalendarEvent[]>();
    for (const event of events) {
      const key = formatDateKey(new Date(event.startTime));
      const existing = map.get(key) ?? [];
      map.set(key, [...existing, event]);
    }
    return map;
  }, [events]);

  const monthStart = new Date(focus.getFullYear(), focus.getMonth(), 1);
  const startWeekday = monthStart.getDay();
  const totalCells = 42;
  const gridDays: Array<{ date: Date; inMonth: boolean }> = [];
  const firstDay = new Date(monthStart);
  firstDay.setDate(firstDay.getDate() - startWeekday);

  for (let index = 0; index < totalCells; index += 1) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + index);
    gridDays.push({ date, inMonth: date.getMonth() === focus.getMonth() });
  }

  const selectedEvents = eventsByDate.get(selectedDay) ?? [];

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded bg-slate-100 px-2 py-1 hover:bg-slate-200"
            onClick={() =>
              setManualFocus(new Date(focus.getFullYear(), focus.getMonth() - 1, 1))
            }
          >
            ◀
          </button>
          <button
            type="button"
            className="rounded bg-slate-100 px-2 py-1 hover:bg-slate-200"
            onClick={() =>
              setManualFocus(new Date(focus.getFullYear(), focus.getMonth() + 1, 1))
            }
          >
            ▶
          </button>
        </div>
      </div>

      <div className="mb-2 text-sm font-medium text-slate-700">{getMonthName(focus)}</div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {gridDays.map(({ date, inMonth }) => {
          const key = formatDateKey(date);
          const items = eventsByDate.get(key) ?? [];
          const isSelected = key === selectedDay;
          const isToday = key === todayKey;

          return (
            <button
              key={key}
              type="button"
              className={`flex h-16 flex-col justify-between rounded border p-1 text-left ${
                inMonth ? "bg-white" : "bg-slate-50 text-slate-400"
              } ${isSelected ? "border-blue-500 ring-1 ring-blue-200" : "border-transparent"}`}
              onClick={() => setManualSelectedDay(key)}
            >
              <div className={`text-xs ${isSelected ? "font-semibold" : ""}`}>
                {date.getDate()}
                {isToday ? <span className="ml-1 text-blue-500">•</span> : null}
              </div>
              <div className="flex flex-wrap gap-1">
                {items.slice(0, 2).map((event) => (
                  <span
                    key={event.id}
                    className={`h-2 w-2 rounded-full ${
                      event.ownerType === "athlete" ? "bg-emerald-500" : "bg-blue-500"
                    }`}
                  />
                ))}
                {items.length > 2 ? (
                  <span className="text-[10px] text-slate-500">+{items.length - 2}</span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 border-t pt-3">
        <h4 className="mb-2 font-medium text-slate-900">Items on {selectedDay}</h4>
        {selectedEvents.length === 0 ? (
          <p className="text-sm text-slate-500">{emptyLabel}</p>
        ) : (
          <div className="space-y-2">
            {selectedEvents.map((event) => {
              const isHighlighted = event.id === highlightedEventId;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onSelectEvent?.(event.id)}
                  className={`w-full rounded-lg border p-3 text-left ${
                    isHighlighted ? "border-blue-400 bg-blue-50" : "bg-slate-50"
                  } ${onSelectEvent ? "hover:border-slate-300" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-slate-900">{event.title}</div>
                      <div className="text-xs text-slate-500">
                        {new Date(event.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {event.ownerType === "athlete" && event.athlete
                          ? ` • Personal (${event.athlete.name})`
                          : " • Team"}
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-wide ${
                        event.canEdit
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {event.canEdit ? "Editable" : "Read only"}
                    </span>
                  </div>
                  {event.location ? (
                    <div className="mt-2 text-xs text-slate-600">{event.location}</div>
                  ) : null}
                  {event.opponent ? (
                    <div className="text-xs text-slate-600">vs {event.opponent}</div>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
