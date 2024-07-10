// dateUtils.js

export const getAdjustedDate = (day, currentYear, currentMonth) => {
  let year = currentYear;
  let month = currentMonth;
  
  if (!day.isCurrentMonth) {
    if (day.day > 20) {
      month -= 1;
      if (month === 0) {
        month = 12;
        year -= 1;
      }
    } else {
      month += 1;
      if (month === 13) {
        month = 1;
        year += 1;
      }
    }
  }

  return { year, month };
};

export const formatDate = (year, month, day) => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const isToday = (year, month, day) => {
  const today = new Date();
  return  year === today.getFullYear() &&
          month === today.getMonth() + 1 &&
          day === today.getDate();
};