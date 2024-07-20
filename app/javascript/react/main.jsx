import React from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarForm } from './newCalendar/components/CalendarFrom';


document.addEventListener("DOMContentLoaded", () => {
  const CalendarRoot = document.getElementById("react-calendar-form");
  CalendarRoot && createRoot(CalendarRoot).render(<CalendarForm />);
})