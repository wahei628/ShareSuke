import React from 'react';
import { FaRegCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { BsTriangle } from "react-icons/bs";

export const StatusBadges = ({ scheduleId, selections }) => {
  const countLabels = (label) => {
    if (!selections[scheduleId]) return 0;
    return Object.values(selections[scheduleId]).filter(
      (selectedLabel) => selectedLabel === label
    ).length;
  };

  return (
    <div className="flex mt-1 max-w-20">
      <StatusBadge
        icon={FaRegCircle}
        count={countLabels("O")}
        iconColor="bg-green-100 text-green-300"
        textColor="text-green-800"
        borderColor="#fff"
      />
      <StatusBadge
        icon={BsTriangle}
        count={countLabels("△")}
        iconColor="bg-yellow-100 text-yellow-500"
        textColor="text-yellow-800"
        borderColor="#fff"
      />
      <StatusBadge
        icon={RxCross1}
        count={countLabels("X")}
        iconColor="bg-red-100 text-red-600"
        textColor="text-red-700"
        borderColor="#fff"
      />
    </div>
  );
};

export const StatusBadge = ({ icon: Icon, count, iconColor, textColor, borderColor }) => (
  <div className={`relative inline-flex items-center justify-center w-6 h-6 mr-4 rounded-lg ${iconColor}`}>
    <Icon className="w-6 h-6 absolute" />
    <span
      className={`relative z-10 text-lg font-bold ${textColor}`}
      style={{
        textShadow: `
          -1px -1px 0 ${borderColor},
          1px -1px 0 ${borderColor},
          -1px 1px 0 ${borderColor},
          1px 1px 0 ${borderColor}
        `,
      }}
    >
      {count}
    </span>
  </div>
);