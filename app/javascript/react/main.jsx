import React from 'react';
import { createRoot } from 'react-dom/client';
import DynamicCalendar from './components/Calendar';
import App from './reactCalendar/App';

document.addEventListener("DOMContentLoaded", () => {
  const CalendarRoot = document.getElementById("react");
  CalendarRoot && createRoot(CalendarRoot).render(
  <div >
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-actions justify-end">
          <App />
      </div>
    </div>
  </div>
  );
})