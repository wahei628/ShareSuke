import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import DynamicCalendar from './newCalendar/components/Calendar';


document.addEventListener("DOMContentLoaded", () => {
  const CalendarRoot = document.getElementById("react");
  CalendarRoot && createRoot(CalendarRoot).render(
  <div >
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-actions justify-end">
        <DynamicCalendar />
      </div>
    </div>
    <div className="red.400"> red </div>
  </div>
  );
})