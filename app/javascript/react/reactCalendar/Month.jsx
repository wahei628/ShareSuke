import React from 'react'
import { Day } from './Day';

export const Month = (props) => {
  const { month } = props;
  return (
    <div className="flex-1 frid frid-cols-7 grif-roes-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}