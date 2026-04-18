"use client";

import ScheduleCalendar, {
  type ScheduleCalendarEvent,
} from "@/app/components/ScheduleCalendar";

type Props = {
  events: ScheduleCalendarEvent[];
};

export default function CalendarWidget({ events }: Props) {
  return <ScheduleCalendar events={events} title="Schedule Calendar" />;
}
