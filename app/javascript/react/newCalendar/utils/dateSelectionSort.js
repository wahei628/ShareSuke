import { formatDate, getAdjustedDate } from "./dateUtil";


export const toggleDateSelection = (day, currentYear, currentMonth, setSelectedDates) => {
  const { year, month } = getAdjustedDate(day, currentYear, currentMonth);
  const dateString = formatDate(year, month, day.day);
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const selectedDate = new Date(dateString);
  
  if (selectedDate > today) {
    setSelectedDates(prevDates => {
      if (prevDates.includes(dateString)) {
        return prevDates.filter(d => d !== dateString);
      } else {
        if (new Date(dateString) < new Date()) {
          // 選択した日付が過去のときにする処理をここに書く
        }
        
        let dateList = [...prevDates, dateString];
        return dateList.sort((a, b) => new Date(a) - new Date(b));
      }
    });
  }
};