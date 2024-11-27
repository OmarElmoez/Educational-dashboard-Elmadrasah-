const convertToArabicTime = (timeString: string): string => {
  // Arabic AM/PM indicators
  const arabicAm = 'ص';
  const arabicPm = 'م';

  try {
    // Split the input string into start and end times
    const [startTime, endTime] = timeString.split(' - ');

    // Helper function to convert time
    const convertTime = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);

      // Determine indicator and adjust hours
      const indicator = hours < 12 ? arabicAm : arabicPm;
      let adjustedHours = hours % 12;
      adjustedHours = adjustedHours === 0 ? 12 : adjustedHours;

      return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${indicator}`;
    };

    // Convert both start and end times
    return `${convertTime(startTime)} - ${convertTime(endTime)}`;
  } catch (error) {
    return 'Invalid time format';
  }
};

export default convertToArabicTime;