import React from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarForm } from './newCalendar/components/CalendarForm';
import ScheduleTable from "./newSchedule/components/ScheduleTable";


  document.addEventListener("turbo:load", () => {
  const CalendarRoot = document.getElementById("react-calendar-form");
  if (CalendarRoot && !CalendarRoot.hasChildNodes()) {
    createRoot(CalendarRoot).render(<CalendarForm />);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("schedule-table");
  if (node) {
    const users = JSON.parse(node.getAttribute("data-users"));
    const schedules = JSON.parse(node.getAttribute("data-schedules"));
    const eventUrlSlug = node.getAttribute("data-event-url-slug");

    createRoot(node).render(
      <ScheduleTable
        users={users}
        schedules={schedules}
        eventUrlSlug={eventUrlSlug}
      />
    );
  }
});

