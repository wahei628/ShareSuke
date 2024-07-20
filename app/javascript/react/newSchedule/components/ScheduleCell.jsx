import React from 'react';

const ScheduleCell = ({ label, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-block",
        width: "30px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        border: "1px solid black",
        cursor: "pointer",
        userSelect: "none",
        backgroundColor: isSelected ? "blue" : "white"
      }}
    >
      {label}
    </div>
  );
};

export default ScheduleCell;
