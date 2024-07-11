export const createDate = (year, month, day = 1) => new Date(year, month, day);

export const getDaysInMonth     = (date) => createDate(date.getFullYear(), date.getMonth() + 1, 0).getDate();
export const getFirstDayOfMonth = (date) => createDate(date.getFullYear(), date.getMonth(),  1   ).getDay() ;
export const getPreviousMonth   = (date) => createDate(date.getFullYear(), date.getMonth() - 1 )            ;
export const getPrevMonthDays   = (date) => getDaysInMonth(createDate(date.getFullYear(), date.getMonth() - 1, 1));

  // getFullYear()  年を4桁の数字で返す
  // getMonth()     月を0から11の数字で返す
  // getDate()      日を1から31の数字で返す
  // getDay()       曜日を0から6の数字で返す ( 0が日曜、6が土曜 )


  // getDaysInMonth {date.getMonth() + 1, 0 } で(⭐その月の0日目 => 先月の最終日 ) を作成し、その日付を取得する。整数、28〜31 が入る
  // ⭐ Date オブジェクトは、日付の値で自動的に月が繰り上がったり繰り下がったりする。0 より小さい日付は前の日になる。
  
  // getFirstDayOfMonth 1日目の曜日を返す => 月の最初の日の曜日がわかる
  
  // getPreviousMonth 


  // dateUtils.js

