import React from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { BsTriangle } from "react-icons/bs";

const ScheduleCell = ({ label, isSelected, onClick }) => {
  const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors duration-200";
  
  const colorClasses = {
    "O": isSelected ? "bg-green-400 text-white border border-green-700" : "text-green-500 border border-green-200 hover:bg-green-200",
    "△": isSelected ? "bg-yellow-400 text-yellow-700 border border-yellow-500" : "text-yellow-800 border border-yellow-300 hover:bg-yellow-200",
    "X": isSelected ? "bg-red-500 text-white border border-red-700" : "text-red-800 border border-red-200 hover:bg-red-200",
  };

  const getIcon = () => {
    switch (label) {
      case 'O':
        return <FaRegCircle />;
      case '△':
        return <BsTriangle />;
      case 'X':
        return <RxCross1 />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[label]}`}
    >
      {getIcon()}
    </div>
  );
};

export default ScheduleCell;