import React, { useCallback, useState } from 'react';
import DynamicCalendar from "./Calendar";

export const CalendarForm = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const hiddenInput = document.querySelector('input[name="event[dates]"]');
    if (hiddenInput) {
      hiddenInput.value = JSON.stringify(selectedDates);
    }
    // フォームを送信
    event.target.submit();
  }, [selectedDates]);

  React.useEffect(() => {
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }
    // クリーンアップ関数
    return () => {
      if (form) {
        form.removeEventListener('submit', handleSubmit);
      }
    };
  }, [handleSubmit]);

  return (
    <div>
      <DynamicCalendar selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
    </div>
  )
}