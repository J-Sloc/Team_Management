"use client";

import { useMemo, useState } from "react";

type EventItem = {
  id: string;
  title: string;
  startTime: string;
  location?: string;
  opponent?: string;
};

type Props = {
  events: EventItem[];
};

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function getMonthName(date: Date) {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export default function CalendarWidget({ events }: Props) {
  const [focus, setFocus] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string>(formatDateKey(new Date()));

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const event of events) {
      const d = new Date(event.startTime);
      const key = formatDateKey(d);
      const existing = map.get(key) ?? [];
      map.set(key, [...existing, event]);
    }
    return map;
  }, [events]);

  const monthStart = new Date(focus.getFullYear(), focus.getMonth(), 1);
  const startWeekday = monthStart.getDay();

  const totalCells = 42; // 6 weeks
  const gridDays = [] as { date: Date; inMonth: boolean }[];

  const firstDay = new Date(monthStart);
  firstDay.setDate(firstDay.getDate() - startWeekday);

  for (let i = 0; i < totalCells; i++) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);
    gridDays.push({ date, inMonth: date.getMonth() === focus.getMonth() });
  }

  const selectedEvents = eventsByDate.get(selectedDay) ?? [];

  return (
    <div className="bg-card p-4 rounded-lg shadow border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-primary">Schedule Calendar</h3>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 bg-slate-100 rounded hover:bg-slate-200"
            onClick={() => setFocus(new Date(focus.getFullYear(), focus.getMonth() - 1, 1))}
          >
            ◀
          </button>
          <button
            className="px-2 py-1 bg-slate-100 rounded hover:bg-slate-200"
            onClick={() => setFocus(new Date(focus.getFullYear(), focus.getMonth() + 1, 1))}
          >
            ▶
          </button>
        </div>
      </div>

      <div className="text-sm font-medium text-slate-700 mb-2">{getMonthName(focus)}</div>

      <div className="grid grid-cols-7 gap-1 text-xs text-center text-slate-500 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {gridDays.map(({ date, inMonth }) => {
          const key = formatDateKey(date);
          const hasEvents = eventsByDate.has(key);
          const todayKey = formatDateKey(new Date());
          const isSelected = key === selectedDay;

          return (
            <button
              key={key}
              className={`h-14 rounded p-1 text-left flex flex-col justify-between border ${
                inMonth ? "bg-white" : "bg-slate-50 text-slate-400"
              } ${isSelected ? "border-blue-500 ring ring-blue-200" : "border-transparent"}`}
              onClick={() => setSelectedDay(key)}
              type="button"
            >
              <div className={`text-xs ${isSelected ? 'font-semibold' : ''}`}>
                <span>{date.getDate()}</span>
                {key === todayKey && <span className="ml-1 text-blue-500">•</span>}
              </div>
              <div className="flex-1">
                {hasEvents && (
                  <span className="inline-flex items-center justify-center text-[10px] px-1 py-0.5 rounded bg-blue-100 text-blue-700">
                    {eventsByDate.get(key)?.length ?? 0} event{(eventsByDate.get(key)?.length ?? 0) === 1 ? '' : 's'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 border-t pt-3">
        <h4 className="font-medium mb-2">Events on {selectedDay}</h4>
        {selectedEvents.length === 0 ? (
          <p className="text-sm text-muted">No events for this day.</p>
        ) : (
          <div className="space-y-2">
            {selectedEvents.map((event) => {
              const start = new Date(event.startTime);
              return (
                <div key={event.id} className="p-2 border rounded bg-slate-50">
                  <div className="text-sm font-semibold">{event.title}</div>
                  <div className="text-xs text-secondary">{start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  {event.location && <div className="text-xs text-secondary">{event.location}</div>}
                  {event.opponent && <div className="text-xs text-secondary">vs {event.opponent}</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
