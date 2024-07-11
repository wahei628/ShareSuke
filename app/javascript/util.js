// import dayjs from "dayjs";

// export const getMonth = (month = dayjs().month()) => {               // デフォ引数、パラメータ。 month ?? dayjs().month() と似ているが、引数ではこう書く
  
//   const year = dayjs().year();                                       // 年を取得| dayjs().year() => 西暦通りの数字を返す | dayjs().month() =>0〜11を返す |
//   const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();  // 指定された月の最初の日の曜日を数値で取得、0が日曜、1が月曜
//   let currentMonthCount = 0 - firstDayOfTheMonth;                    // カレンダーの最初のセルから数え始めるためのカウンターを初期化 (先月の日付 => 負の値) let重要
  
//   const daysMatrix = new Array(5).fill([]).map(() => {               // 5行 の fill[]  (空要素配列を生成 、その要素1つずつに map
//     return new Array(7).fill(null).map(() => {                       // 中に7つの fill[] (空要素配列を生成、その要素1つずつに map
//       currentMonthCount++;                                           // currentMonthCount を 1ずつ増やす
//       return dayjs(new Date(year, month, currentMonthCount));        // 日付オブジェクトを生成して return
//     });
//   });                                                                // [ 7要素  7要素  7要素  7要素  7要素  ] このような 5x7 の 2次元配列になっている
//   console.log(`daysMatrix: ${daysMatrix}`)
//   return daysMatrix;
// }