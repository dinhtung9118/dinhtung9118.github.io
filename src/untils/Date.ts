export const configTimeDate = 1000; // 1000 ms
export const getDateTimeNumber = (date: Date) => {
  const h = date.getHours() * 60 * 60;
  console.log('date', date);
  console.log('h', date.getHours());
  console.log('m', date.getMinutes());
  const m = date.getMinutes() * 60;
  const s = date.getSeconds();
  const total = (h + m + s) * configTimeDate;
  return (Math.floor(((date.getTime() - total) || 0) / configTimeDate) * configTimeDate);
}
