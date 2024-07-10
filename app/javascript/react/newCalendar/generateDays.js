import { React } from 'react';
import { getDaysInMonth, getFirstDayOfMonth, getPrevMonthDays } from './getDateInfo';


export const generateCalendarDays = (date) => {
  const days = [];
  const totalDays = getDaysInMonth(date);      // 整数、28〜31
  let firstDay = getFirstDayOfMonth(date) - 1; // 月曜始まりに調整
  if (firstDay === -1) firstDay = 6;           // 日曜日の場合は6に設定
  
  const prevMonthDays = getPrevMonthDays(date) // 前の月の日数を取得
  
  // 前月の日を追加
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: prevMonthDays - firstDay + i + 1, isCurrentMonth: false });
  }

  // 現在の月の日を追加
  for (let i = 1; i <= totalDays; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }

  // 次月の日を追加（6行7列になるまで）
  let nextMonthDay = 1;
  while (days.length < 42) {
    days.push({ day: nextMonthDay++, isCurrentMonth: false });
  }

  return days;
};


/*

for (初期化; 条件; 更新) {
    // 繰り返し実行したいコード
}

*/