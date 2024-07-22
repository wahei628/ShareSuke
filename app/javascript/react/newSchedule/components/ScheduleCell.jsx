import React from 'react';

const ScheduleCell = ({ label, isSelected, onClick }) => {
  const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors duration-200";
  
  const colorClasses = {
    "O": isSelected ? "bg-green-500 text-white" : "bg-green-100 text-green-800 hover:bg-green-200",
    "△": isSelected ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    "X": isSelected ? "bg-red-500 text-white" : "bg-red-100 text-red-800 hover:bg-red-200",
  };

  const getIcon = () => {
    switch (label) {
      case 'O':
        return <FaCheck />;
      case '△':
        return <FaQuestion />;
      case 'X':
        return <FaTimes />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[label]}`}
    >
      {label}
    </div>
  );
};

export default ScheduleCell;