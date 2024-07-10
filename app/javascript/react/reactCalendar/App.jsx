import React from 'react';
import { CalendarHeader } from './CalendarHeader';
import { Month } from '../components/month';
import { Sidebar } from './Sidebar';
import { getMonth } from './util';
import { useState } from 'react';

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  return (
    <>
    <div className="h-screen flex flex-col">
      <CalendarHeader />
      <div className="flex flex-1">
        <Sidebar />
        <Month month={currentMonth} />
      </div>
    </div>
  </>
  )
}
export default App;