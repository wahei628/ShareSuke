import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { BsTriangle } from "react-icons/bs";
import { RiCircleLine } from "react-icons/ri";

export const StatusIcon = () => {

  const iconStyle = {
    filter: 'url(#bold)',
    strokeWidth: '1',
    stroke: 'currentColor',
  };

  return (
    <div className='flex text-sm'>
      <div className='text-green-400'>
        <RiCircleLine style={iconStyle} />
      </div>
      <div className='text-yellow-400'>
        <BsTriangle style={iconStyle} />
      </div>
      <div className='text-red-400'>
        <RxCross1 style={iconStyle} />
      </div>

    </div>
  )
}