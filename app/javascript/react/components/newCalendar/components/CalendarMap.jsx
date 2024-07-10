import React, { useState, useEffect } from 'react';

const CalendarMap = ({ calendarDays }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    console.log('Selected dates:', selectedDates);
  }, [selectedDates]);

  const toggleDateSelection = (date) => {
    setSelectedDates(prevDates => {
      if (prevDates.includes(date)) {
        return prevDates.filter(d => d !== date);
      } else {
        return [...prevDates, date];
      }
    });
  };

  return (
    <tbody>
      {Array(6).fill().map((_, weekIndex) => (
        <tr key={weekIndex}>
          {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
            <td 
              key={dayIndex} 
              className={`py-2 text-center`}
            >
              <button
                onClick={() => toggleDateSelection(day.day)}
                className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  day.isCurrentMonth 
                    ? 'text-gray-900 hover:bg-blue-100' 
                    : 'text-gray-300 hover:bg-blue-50'
                } ${
                  selectedDates.includes(day.day)
                    ? 'bg-blue-400'
                    : ''
                } transition-colors`}
              >
                {day.day}
              </button>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default CalendarMap;