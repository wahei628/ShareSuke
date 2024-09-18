import React from 'react';

const CircleIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="6" />
  </svg>
);

const TriangleIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M12 7L17.5 17H6.5L12 7Z" />
  </svg>
);

const CrossIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M16 8L8 16M8 8L16 16" />
  </svg>
);

const CustomIcon = ({ type, color }) => {
  switch (type) {
    case 'O':
      return <CircleIcon color={color} />;
    case '△':
      return <TriangleIcon color={color} />;
    case 'X':
      return <CrossIcon color={color} />;
    default:
      return null;
  }
};

export const ScheduleCell = ({ label, isSelected, onClick }) => {
  const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors duration-200";
  
  const colorClasses = {
    "O": isSelected ? "bg-green-400 text-white border border-green-700" : "text-green-500 border border-green-200 hover:bg-green-200",
    "△": isSelected ? "bg-yellow-400 text-yellow-700 border border-yellow-500" : "text-yellow-500 border border-yellow-300 hover:bg-yellow-200",
    "X": isSelected ? "bg-red-500 text-white border border-red-700" : "text-red-600 border border-red-200 hover:bg-red-200",
  };

  const getIconColor = () => {
    switch (label) {
      case 'O':
        return isSelected ? 'white' : '#22c55e';  // text-green-500
      case '△':
        return isSelected ? '#a16207' : '#eab308';  // text-yellow-700 : text-yellow-500
      case 'X':
        return isSelected ? 'white' : '#dc2626';  // text-red-600
      default:
        return 'currentColor';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[label]} m-0.5`}
    >
      <CustomIcon type={label} color={getIconColor()} />
    </div>
  );
};

export const DisplayScheduleCell = ({ label, isSelected }) => {
  const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium";
  
  const colorClasses = {
    "O": "bg-green-400 text-white border border-green-700",
    "△": "bg-yellow-400 text-yellow-700 border border-yellow-500",
    "X": "bg-red-500 text-white border border-red-700",
  };

  const getIconColor = () => {
    switch (label) {
      case 'O':
        return 'white';
      case '△':
        return '#a16207';  // text-yellow-700
      case 'X':
        return 'white';
      default:
        return 'currentColor';
    }
  };

  return (
    <div className={`${baseClasses} ${colorClasses[label] || ''}`}>
      {label && <CustomIcon type={label} color={getIconColor()} />}
    </div>
  );
};

export default CustomIcon;