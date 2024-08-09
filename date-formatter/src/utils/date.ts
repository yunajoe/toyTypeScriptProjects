export const convertDateFormat = (dateValue: string) => {
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return {
    year,
    month,
    day,
    hours,
    minutes,
  };
};

export const handleDropDownChange = (
  selectedFormat: string,
  dateValue: string
) => {
  const { year, month, day, hours, minutes } = convertDateFormat(dateValue);
  switch (selectedFormat) {
    case "Day, Month, Year":
      return `${day}-${month}-${year}`;
    case "Year, Month, Day":
      return `${year}-${month}-${day}`;
    case "Month, Day, Year, Hours, Minutes":
      return `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;

    default:
      return `${day}-${month}-${year}`;
  }
};
