import React, { useState, useEffect } from "react";
import ScheduleCell from "./ScheduleCell";
import axios from "axios"; // http通信を行えるjavacriptライブラリ

const ScheduleTable = ({ users, schedules, eventUrlSlug }) => {
  const [selections, setSelections] = useState({});

  // 初期化時に選択状態を取得
  useEffect(() => {
    axios
      .get("/user_schedules") // スケジュールデータ取得のgetリクエスト送信
      .then((response) => {
        // 成功時の挙動
        const data = response.data;
        const newSelections = {};

        data.forEach((item) => {
          if (!newSelections[item.schedule_id]) {
            newSelections[item.schedule_id] = {};
          }

          const statusMap = { 1: "O", 2: "X", 3: "△" }; // ステータスの数値を文字に変換
          newSelections[item.schedule_id][item.user_id] =
            statusMap[item.status];
        });

        setSelections(newSelections);
      })
      .catch((error) => {
        // エラー時の挙動
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

    // ステータスの文字を数値に変換
    const statusMap = { O: 1, X: 2, "△": 3 };
    const status = statusMap[label];

    // APIにリクエストを送信
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

  return (
    <div>
      <h2>Schedules</h2>
      <table
        style={{
          border: "1px solid white",
          borderCollapse: "collapse",
          width: "80%",
          height: "70%",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid white" }}>日付</th>
            {users.map((user) => (
              <th key={user.id} style={{ border: "1px solid white" }}>
                <a href={`/events/${eventUrlSlug}/users/${user.id}/edit`}>
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
              schedule.date && ( // 日付ない場合欄を表示しない
              <tr key={schedule.id}>
                <td style={{ border: "1px solid white" }}>
                  {schedule.date} ( {oCount} O | {ΔCount} △ | {xCount} X )
                </td>
                {users.map((user) => {
                  const userId = user.id;
                  const selectedLabel = selections[scheduleId]?.[userId] || "";

                  return (
                    <td key={user.id} style={{ border: "1px solid white" }}>
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
  );
};

export default ScheduleTable;
