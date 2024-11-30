/**
 * Converts 24-hour time format to 12-hour Arabic format
 * @param time24 Time in 24-hour format (HH:MM:SS)
 * @returns Time in 12-hour Arabic format (HH:MM ص/م)
 */
const convert24HourToArabic = (time24: string): string => {
  if (!time24) {
    return '----'
  }

  const [hours, minutes] = time24.split(':').map(Number);


  let formattedHours = hours;
  let period: 'ص' | 'م' = 'ص';

  if (hours === 0) {
    formattedHours = 12;
  } else if (hours === 12) {
    period = 'م';
  } else if (hours > 12) {
    formattedHours = hours - 12;
    period = 'م';
  }

  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export default convert24HourToArabic;