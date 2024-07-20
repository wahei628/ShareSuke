import React, { useState } from 'react';
import { generateCalendarDays } from '../utils/generateDays';
import CalendarMap from './CalendarMap';
import DayOfWeek from './DayOfWeek';


const DynamicCalendar = ({selectedDates, setSelectedDates}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };
  
  const calendarDays = generateCalendarDays(currentDate);

  return (
      <div className="flex-col flex">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-cyan-200">
          <div className="mb-6 flex justify-between items-center">
            <button type="button" onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-700">
              {currentDate.toLocaleString('default', { year: 'numeric', month: 'long' })}
            </h2>
            <button type="button" onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <table className="w-full">
            <DayOfWeek />
            <CalendarMap
              currentYear={currentDate.getFullYear()}
              currentMonth={currentDate.getMonth() + 1}
              calendarDays={calendarDays}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              />
          </table>
        </div>
      </div>
  );
};

export default DynamicCalendar;