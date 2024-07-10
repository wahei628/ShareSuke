// import React from 'react';

// import { useState } from 'react';
// import { CalendarHeader } from './components/newCalendar/CalendarHeader';
// import { Sidebar } from './components/newCalendar/Sidebar';
// import { Month } from './components/newCalendar/month';
// import { getMonth } from '../util';

// const App = () => {
//   const [currentMonth, setCurrentMonth] = useState(getMonth())
//   return (
//     <>
//     <div className="h-screen flex flex-col">
//       <CalendarHeader />
//       <div className="flex flex-1">
//         <Sidebar />
//         <Month month={currentMonth} />
//       </div>
      
//       <div class="grid grid-cols-4 gap-4">
//         <div>01</div>
//         <div>05</div>
//         <div class="grid grid-cols-subgrid gap-4 col-span-3">
//           <div class="col-start-2">06</div>
//         </div>
//       </div>
//     </div>
//   </>
//   )
// }
// export default App;