import React, { useState, useEffect } from 'react';
import { getAdjustedDate, formatDate, isToday } from './dateUtils';
import { toggleDateSelection } from './dateSelection';

const CalendarMap = ({ currentYear, currentMonth, calendarDays }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    console.log('Selected dates:', selectedDates);
  }, [selectedDates]);

  const handleDateSelection = (day) => {
    toggleDateSelection(day, currentYear, currentMonth, setSelectedDates);
  };

  return (
    <tbody>
      {Array(6).fill().map((_, weekIndex) => (
        <tr key={weekIndex}>
          {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
            const { year, month } = getAdjustedDate(day, currentYear, currentMonth);
            const dateString = formatDate(year, month, day.day);
            const isCurrentDay = isToday(year, month, day.day);
            const isSelected = selectedDates.includes(dateString);
            return (
              <td 
                key={dayIndex} 
                className={`py-2 text-center`}
              >
                <button
                  onClick={() => handleDateSelection(day)}
                  className={`w-8 h-8 rounded-lg focus:outline-none focus:ring-blue-300 
                    ${
                    day.isCurrentMonth 
                      ? 'text-gray-900 hover:bg-blue-300' 
                      : 'text-gray-300 hover:bg-blue-200 hover:text-gray-400'
                  } 
                    ${isCurrentDay && !isSelected
                      ? 'bg-yellow-200 text-gray-900 hover:bg-yellow-300'
                      : ''
                    }
                  ${
                    day.isCurrentMonth ? 
                    selectedDates.includes(dateString)
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : ''
                    : 
                    selectedDates.includes(dateString)
                      ? 'text-black bg-blue-200'
                      : ''
                  } transition-colors`}
                >
                  {day.day}
                </button>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default CalendarMap;
