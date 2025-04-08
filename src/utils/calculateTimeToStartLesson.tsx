import { useState, useEffect, JSX } from "react";

const calculateTimeRemaining = (fromTime: string): string => {
  const fromDate = new Date(fromTime); 
  const now = new Date(); 

  const diffInSeconds = Math.floor((fromDate.getTime() - now.getTime()) / 1000);

  if (diffInSeconds <= 0) return "";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  const hours = diffInHours;
  const minutes = diffInMinutes % 60;
  const seconds = diffInSeconds % 60;

  // Build the result dynamically
  const parts = [];
  if (hours > 0) parts.push(`${hours} س`);
  if (minutes > 0) parts.push(`${minutes} د`);
  if (seconds > 0) parts.push(`${seconds} ث`);

  if (parts.length > 0) {
    return `سوف يبدأ خلال ${parts.join(" و ")}`;
  } else {
    return "سوف يبدأ قريبًا";
  }
};
interface CalculateTimeToStartLessonProps {
  fromTime: string;
}

const CalculateTimeToStartLesson = ({ fromTime }: CalculateTimeToStartLessonProps): JSX.Element => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    setTimeRemaining(calculateTimeRemaining(fromTime));
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(fromTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [fromTime]);

  return <div style={{width:"12rem", textAlign:"right"}}>{timeRemaining}</div>;
};

export default CalculateTimeToStartLesson;