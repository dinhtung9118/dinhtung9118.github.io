import moment from "moment";

export const configTimeDate = 1000; // 1000 ms
export const getDateTimeNumber = (date: Date) => {
  const h = date.getHours() * 60 * 60;
  const m = date.getMinutes() * 60;
  const s = date.getSeconds();
  const total = (h + m + s) * configTimeDate;
  return (
    Math.floor((date.getTime() - total || 0) / configTimeDate) * configTimeDate
  );
};

export const convertToUTC7 = (date: Date) => {
  const combineDate = moment(date).utcOffset("+07:00");
  return combineDate;
};
