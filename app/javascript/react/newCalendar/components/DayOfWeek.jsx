// DayOfWeek.js
import React from 'react';

const DayOfWeek = () => (
    <thead>
      <tr>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <th key={day} className="py-2 text-sm font-medium text-gray-600">
            {day}
          </th>
        ))}
      </tr>
    </thead>
);

export default DayOfWeek;