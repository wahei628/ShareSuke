import React from "react";
import { createRoot } from "react-dom/client";
import DynamicCalendar from "./newCalendar/components/Calendar";
import { render } from "react-dom";
import ScheduleTable from "./newSchedule/components/ScheduleTable";

document.addEventListener("DOMContentLoaded", () => {
  const CalendarRoot = document.getElementById("react");
  CalendarRoot &&
    createRoot(CalendarRoot).render(
      <div>
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-actions justify-end">
            <DynamicCalendar />
          </div>
        </div>
        <div className="red.400"> red </div>
      </div>
    );
});

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("schedule-table");
  if (node) {
    const users = JSON.parse(node.getAttribute("data-users"));
    const schedules = JSON.parse(node.getAttribute("data-schedules"));
    const eventUrlSlug = node.getAttribute("data-event-url-slug");

    render(
      <ScheduleTable
        users={users}
        schedules={schedules}
        eventUrlSlug={eventUrlSlug}
      />,
      node
    );
  }
});
