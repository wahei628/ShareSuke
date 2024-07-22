import React, { useState, useEffect } from "react";
import ScheduleCell from "./ScheduleCell";
import axios from "axios";
import { FaRegCircle } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { IoTriangle } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { BsTriangle } from "react-icons/bs";

const ScheduleTable = ({ users, schedules, eventUrlSlug }) => {
  const [selections, setSelections] = useState({});

  useEffect(() => {
    axios
      .get("/user_schedules")
      .then((response) => {
        const data = response.data;
        const newSelections = {};

        data.forEach((item) => {
          if (!newSelections[item.schedule_id]) {
            newSelections[item.schedule_id] = {};
          }

          const statusMap = { 1: "O", 2: "X", 3: "△" };
          newSelections[item.schedule_id][item.user_id] =
            statusMap[item.status];
        });

        setSelections(newSelections);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCellClick = (userId, scheduleId, label) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [scheduleId]: {
        ...prevSelections[scheduleId],
        [userId]: label,
      },
    }));

    const statusMap = { O: 1, X: 2, "△": 3 };
    const status = statusMap[label];

    axios
      .post("/user_schedules", {
        user_schedule: {
          user_id: userId,
          schedule_id: scheduleId,
          status: status,
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const countLabels = (scheduleId, label) => {
    if (!selections[scheduleId]) return 0;
    return Object.values(selections[scheduleId]).filter(
      (selectedLabel) => selectedLabel === label
    ).length;
  };

  const StatusBadge = ({ icon: Icon, count, iconColor, textColor, borderColor }) => (
    <div className={`relative inline-flex items-center justify-center w-6 h-6 mr-4 rounded-lg ${iconColor}`}>
      <Icon className="w-6 h-6 absolute" />
      <span 
        className={`relative z-10 text-lg font-bold ${textColor}`}
        style={{
          textShadow: `
            -2px -2px 0 ${borderColor},
            2px -2px 0 ${borderColor},
            -2px 2px 0 ${borderColor},
            2px 2px 0 ${borderColor}
          `
        }}
      >{count}</span>
    </div>
  );

  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Schedules</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="bg-gray-100 text-left">日付</th>
              {users.map((user) => (
                <th key={user.id} className="bg-gray-100 text-center">
                  <a
                    href={`/events/${eventUrlSlug}/users/${user.id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.name}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => {
              const scheduleId = schedule.id;
              const oCount = countLabels(scheduleId, "O");
              const ΔCount = countLabels(scheduleId, "△");
              const xCount = countLabels(scheduleId, "X");

              return (
                schedule.date && (
                  <tr key={schedule.id}>
                    <td className="font-medium">
                      {schedule.date}
                      <div className="flex items-center mt-1">
                        <StatusBadge icon={FaRegCircle} count={oCount} iconColor="bg-green-100 text-green-300" textColor="text-green-800" borderColor="#fff" />
                        <StatusBadge icon={BsTriangle } count={ΔCount} iconColor="bg-yellow-100 text-yellow-500" textColor="text-yellow-800" borderColor="#fff" />
                        <StatusBadge icon={RxCross1} count={xCount} iconColor="bg-red-100 text-red-600" textColor=" text-red-700" borderColor="#fff" />
                      </div>
                    </td>
                    {users.map((user) => {
                      const userId = user.id;
                      const selectedLabel = selections[scheduleId]?.[userId] || "";

                      return (
                        <td key={user.id} className="text-center">
                          <div className="flex justify-center space-x-1">
                            {["O", "△", "X"].map((label) => (
                              <ScheduleCell
                                key={label}
                                label={label}
                                isSelected={selectedLabel === label}
                                onClick={() =>
                                  handleCellClick(userId, scheduleId, label)
                                }
                              />
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;