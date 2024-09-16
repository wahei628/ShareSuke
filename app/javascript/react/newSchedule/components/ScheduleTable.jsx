import React, { useState, useEffect } from "react";
import ScheduleCell from "./ScheduleCell";
import axios from "axios";
import { FaRegCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { BsTriangle } from "react-icons/bs";

const ScheduleTable = ({ users, schedules, eventUrlSlug }) => {
  const [selections, setSelections] = useState({});
  const cellStyle = `w-32 h-24`
  const cellDateStyle = `w-24 h-24`

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

  const StatusBadge = ({
    icon: Icon,
    count,
    iconColor,
    textColor,
    borderColor,
  }) => (
    <div
      className={`relative inline-flex items-center justify-center w-6 h-6 mr-4 rounded-lg ${iconColor}`}
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
      <>
      <div className="w-full flex justify-center"> {/* 全幅のコンテナ */}
        <div className="w-11/12"> {/* 11/12幅のコンテナ */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Schedules</h2>
          <div className="flex justify-start"> {/* フレックスコンテナ */}
            <div className="border rounded overflow-auto">
              <div className="inline-block">
                <div className="grid grid-flow-col auto-cols-min">
                      {/* 固定列（日付） */}
                  <div className="sticky left-0 z-30">
                    <div className={`bg-gray-100 text-left border border-gray-300 p-2 font-bold w-24 sticky top-0 left-0 z-50`}>
                      日付
                    </div>
                    
                    {schedules.map((schedule) => {
                      // 定義
                      const scheduleId = schedule.id;
                      const oCount = countLabels(scheduleId, "O");
                      const ΔCount = countLabels(scheduleId, "△");
                      const xCount = countLabels(scheduleId, "X");

                      return (
                        
                        schedule.date && (
                          <div
                            key={schedule.id}
                            className={`font-medium border border-gray-300 ${cellDateStyle} p-2 bg-gray-100`}
                          >
                            {/* 西暦を表示 */}
                            {schedule.date.slice(0, 4)}
                            <br />
                            {/* 日付を表示 */}
                            {schedule.date.slice(5)}
                            <div className={`flex mt-1 max-w-20 ${cellDateStyle}`}>
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
                          </div>
                        )
                      );
                    })}
                  </div>

                  {/* ユーザー列 */}
                  {users.map((user) => (
                  <div key={user.id} className={`${cellStyle}`}>
                    <div className="bg-gray-100 text-center border border-gray-300 p-2 whitespace-normal sticky top-0 z-10">
                      <a
                        href={`/events/${eventUrlSlug}/users/${user.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 h-20"
                      >
                        {user.name}
                      </a>
                    </div>
                    {schedules.map((schedule) => {
                      const scheduleId = schedule.id;
                      const userId = user.id;
                      const selectedLabel = selections[scheduleId]?.[userId] || "";


                      return (
                        schedule.date && (
                          <div
                            key={`${user.id}-${schedule.id}`}
                            className={`text-center border border-gray-300 p-2 ${cellStyle} flex justify-center items-center`}
                          >
                            <div className="flex justify-center items-center space-x-1">
                              {["O", "△", "X"].map((label) => (
                                <ScheduleCell
                                  key={label}
                                  label={label}
                                  isSelected={selectedLabel === label}
                                  onClick={() => handleCellClick(userId, scheduleId, label)} />
                              ))}
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ScheduleTable;