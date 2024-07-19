import React from 'react';
import { createRoot } from 'react-dom/client';
import DynamicCalendar from './newCalendar/components/Calendar';
import { Form } from './Form/NewEventsFrom';


document.addEventListener("DOMContentLoaded", () => {
  const CalendarRoot = document.getElementById("react");
  CalendarRoot && createRoot(CalendarRoot).render(<DynamicCalendar />);

  const FormRoot = document.getElementById("form");
  FormRoot && createRoot(FormRoot).render(<Form />);

})