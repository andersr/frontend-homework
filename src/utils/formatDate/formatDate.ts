import dateFormatter from "date-and-time";

export const INVALID_DATE_ERROR = "Invalid Date";

export const formatDate = (isoDate: string) => {
  const date = dateFormatter.parse(isoDate, "YYYY-MM-DD");
  return isNaN(Number(date))
    ? INVALID_DATE_ERROR
    : dateFormatter.format(date, "MMM D, YYYY");
};
