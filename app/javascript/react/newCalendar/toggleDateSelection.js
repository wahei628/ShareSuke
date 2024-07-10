  import React from 'react';
  
  // 日付を 'YYYY-MM-DD' 形式にフォーマットする関数
const formatDate = (year, month, day) => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const toggleDateSelection = (day) => {
  const { year, month } = getAdjustedDate(day);
  const dateString = formatDate(year, month, day.day);
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const selectedDate = new Date(dateString);
  
  if (selectedDate > today) {
    
    setSelectedDates(prevDates => {
      if (prevDates.includes(dateString)) {
        return prevDates.filter(d => d !== dateString);
      } else {
        if (new Date(dateString) < new Date()) {
        }
        let dateList = [...prevDates, dateString];
        return dateList.sort((a, b) => new Date(a) - new Date(b))
      }
    });
  }  
};

export default toggleDateSelection;

