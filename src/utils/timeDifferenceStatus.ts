/**
 * Calculates the time difference between two time strings in minutes
 * @param time1 First time in 'HH:MM:SS' format => is the standard time for the lesson.
 * @param time2 Second time in 'HH:MM:SS' format => is the actual time that teacher or student get in.
 * @returns Time difference in minutes
 */

const timeDifferenceStatus = (time1: string, time2: string): {text: string, bg_color: string} => {

  if (time1 === time2) {
    return {
      text: 'في الميعاد',
      bg_color: "#1C8A4433"
    }
  }

  const [h1, m1, s1] = time1.split(":").map(Number);
  const [h2, m2, s2] = time2.split(":").map(Number);

  const time1Seconds = h1 * 3600 + m1 * 60 + s1
  const time2Seconds = h2 * 3600 + m2 * 60 + s2

  const isAfter = time2Seconds > time1Seconds;

  const diffSeconds = Math.abs(time2Seconds - time1Seconds);
  const differenceMinutes = Math.floor(diffSeconds / 60);

  const minutesLabel = differenceMinutes < 11 ? `دقائق` : 'دقيقة'

  return isAfter ? {
    text: `متاخر ${differenceMinutes} ${minutesLabel}`,
    bg_color: "#E04A4A33"
  } : {
    text: `مبكر ${differenceMinutes} ${minutesLabel}`,
    bg_color: "#B2CCEC4D"
  };
}

export default timeDifferenceStatus;