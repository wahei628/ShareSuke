import React, { useState } from 'react';

const DynamicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const generateCalendarDays = (date) => {
    const days = [];
    const totalDays = daysInMonth(date);
    const firstDay = firstDayOfMonth(date);
    
    const prevMonthDays = daysInMonth(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    
    // 前月の日を追加
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: prevMonthDays - firstDay + i + 1, isCurrentMonth: false });
    }

    // 現在の月の日を追加
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // 次月の日を追加（6行7列になるまで）
    let nextMonthDay = 1;
    while (days.length < 42) {
      days.push({ day: nextMonthDay++, isCurrentMonth: false });
    }

    return days;
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const calendarDays = generateCalendarDays(currentDate);

  return (
    <div className="min-h-screen flex-col flex justify-center items-center">
      <h1 className="text-4xl mb-5">Calendar</h1>
      <div className="mb-4 flex justify-between items-center w-full max-w-md">
        <button onClick={() => changeMonth(-1)} className="px-4 py-2 bg-blue-500 text-white rounded">
          ←
        </button>
        <h2 className="text-2xl font-bold">
          {currentDate.toLocaleString('default', { year: 'numeric', month: 'long' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="px-4 py-2 bg-blue-500 text-white rounded">
          →
        </button>
      </div>
      <table className="border-collapse border border-slate-400">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th key={day} className="border border-slate-500 px-4 py-2 bg-slate-100 font-bold w-14">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(6).fill().map((_, weekIndex) => (
            <tr key={weekIndex}>
              {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                <td 
                  key={dayIndex} 
                  className={`border border-slate-500 px-4 py-2 text-center w-14 h-14 ${
                    day.isCurrentMonth ? '' : 'text-gray-400 bg-gray-100'
                  }`}
                >
                  {day.day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicCalendar;