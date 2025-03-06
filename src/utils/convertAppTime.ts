import { format } from 'date-fns';

const convertAppTime = (timeStr: string): string | null| undefined => {
  console.log(timeStr);
  if (timeStr === "") {
    return null;
  }

  const date = new Date(`1970-01-01 ${timeStr}`);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid time format');
  }

  const isAM = date.getHours() < 12;
  const timeFormatted = format(date, 'hh:mm');
  return `${timeFormatted}${isAM ? ' ص' : ' م'}`;
};

export default convertAppTime;