export const formatDateDDMMYYYY = (dateInput) => {
  const offsetDate = new Date(dateInput.valueOf() + 7 * 60 * 60 * 1000);
  const day = ('0' + offsetDate.getDate()).slice(-2);
  const month = ('0' + (offsetDate.getMonth() + 1)).slice(-2);
  const year = offsetDate.getFullYear();
  const formattedDate = `${day}${month}${year}`;
  return formattedDate;
};
export const formatDate = (date) => {
  if (!date) return date;
  return (
    date.substring(0, 2) +
    "-" +
    date.substring(2, 4) +
    "-" +
    date.substring(4,8)
  );
};
