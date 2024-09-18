import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { BsTriangle } from "react-icons/bs";
import { DisplayScheduleCell, ScheduleCell } from './ScheduleCell';
import { StatusBadges } from "./StatusB";

const ScheduleTable = ({ users, schedules, eventUrlSlug }) => {
  const [selections, setSelections] = useState({});
  const [activeTab, setActiveTab] = useState('statusDisplay')
  const cellStyle = `w-32 h-4`
  const cellDateStyle = `w-20`
  const borderClass = "border-2 border-orange-400 text-bold"
  const tabClass = "px-10 border-t-2 border-x-2 rounded-t-md font-bold focus:outline-none relative";
  const activeTabClass = `bg-white ${borderClass} border-b-0 text-green-500 
  after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-white`;
  const inactiveTabClass = "bg-gray-100 text-green-300 border-transparent hover:text-green-500";

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

  const StatusBadge = ({
    icon: Icon,
    count,
    iconColor,
    textColor,
    borderColor,
  }) => (
    <div
      className={`relative inline-flex items-center justify-center w-6 h-6 mr-2 rounded-lg ${iconColor}`}
    >
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

  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Schedules</h2>


    <div className="flex border-b-2 border-orange-400 mb-4">
      <button
        role="tab"
        className={`${tabClass} ${activeTab === 'statusDisplay' ? activeTabClass : inactiveTabClass} cursor-default h-12 text-lg`}
        onClick={() => setActiveTab('statusDisplay')}
        aria-selected={activeTab === 'statusDisplay'}
        aria-controls="statusDisplay-panel"
      >
        表示
      </button>
      <button
        role="tab"
        className={`${tabClass} ${activeTab === 'statusEdit' ? activeTabClass : inactiveTabClass} cursor-default h-12 text-lg`}
        onClick={() => setActiveTab('statusEdit')}
        aria-selected={activeTab === 'statusEdit'}
        aria-controls="statusEdit-panel"
      >
        編集
      </button>
    </div>
    <div className="max-w-screen-xl mx-auto">
      <div className="border border-gray-300 rounded overflow-hidden">
        <div className="relative overflow-auto" style={{ maxHeight: '600px', maxWidth: '100%' }}>
          <table className="border-collapse table-fixed">
            <thead>
              <tr>
                {/* 左上のセル（固定） */}
                <th className="sticky top-0 left-0 z-50 bg-gray-300 text-white p-2 border border-gray-300 w-24 shadow-md">
                  <div className="relative z-20 h-4"></div>
                </th>

                {/* 1行目の他のヘッダー（上部に固定） */}
                {users.map((user) => (
                    <th key={user.id} className={`${cellStyle} sticky top-0 z-40 bg-gray-100 text-center border border-gray-300 text-cyan-600 p-2 whitespace-normal`}>
                      <a
                        href={`/events/${eventUrlSlug}/users/${user.id}/edit`}
                        className="relative z-20"
                      >
                        {user.name}
                      </a>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {/* 1行目 */}
                {schedules.map((schedule) => {
                  const scheduleId = schedule.id;
                  const oCount = countLabels(scheduleId, "O");
                  const ΔCount = countLabels(scheduleId, "△");
                  const xCount = countLabels(scheduleId, "X");

                  return (
                    schedule.date && (
                      <tr key={schedule.id} className={`font-medium border border-gray-300 ${cellDateStyle} p-2`}>
                        <td className="sticky left-0 z-30 bg-gray-100">
                          <div className="text-xs ml-1">
                            {`${schedule.date.slice(0, 4)}`} {/* 西暦 */}
                          </div>
                          <div className="text-lg ml-2">
                            {schedule.date.slice(5)} {/* 日付 */}
                          </div>
                          <div className={`flex justify-center items-center ml-3`}>
                            <StatusBadge
                              icon={FaRegCircle}
                              count={oCount}
                              iconColor="bg-green-100 text-green-300"
                              textColor="text-green-800"
                              borderColor="#fff" />
                            <StatusBadge
                              icon={BsTriangle}
                              count={ΔCount}
                              iconColor="bg-yellow-100 text-yellow-500"
                              textColor="text-yellow-800"
                              borderColor="#fff" />
                            <StatusBadge
                              icon={RxCross1}
                              count={xCount}
                              iconColor="bg-red-100 text-red-600"
                              textColor=" text-red-700"
                              borderColor="#fff" />
                          </div>
                        </td>
                        {users.map((user) => {
                          const userId = user.id;
                          const selectedLabel = selections[scheduleId]?.[userId] || "";

                          return (
                            <td
                              key={`${user.id}-${schedule.id}`}
                              className={`text-center border border-gray-300 p-2 ${cellStyle}`}
                            >
                              <div className="flex justify-center items-center h-full">
                                {activeTab === 'statusEdit' ? (
                                  ["O", "△", "X"].map((label) => (
                                    <ScheduleCell
                                      key={label}
                                      label={label}
                                      isSelected={selectedLabel === label}
                                      onClick={() => handleCellClick(userId, scheduleId, label)}
                                    />
                                  ))
                                ) : (
                                  <DisplayScheduleCell
                                    label={selectedLabel}
                                    isSelected={true}
                                  />
                                )}
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
      </div>
    </div>
  </div>
  );
};
export default ScheduleTable;