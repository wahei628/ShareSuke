import React from 'react';
import { createRoot } from 'react-dom/client';
import DynamicCalendar from './components/SelectableGrid';

document.addEventListener("DOMContentLoaded", () => {
  const CalendarRoot = document.getElementById("react");
  CalendarRoot && createRoot(CalendarRoot).render(
  <>
    <DynamicCalendar/>
  </>
  );
})