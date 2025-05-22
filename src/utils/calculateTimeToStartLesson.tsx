import { useState, useEffect, JSX } from "react";
import ClockIcon from "@/assets/clock.svg?react";

const calculateTimeRemaining = (timeOnly: string): JSX.Element | string => {
  const now = new Date();

  // Combine today's date with the given time
  const [hours, minutes, seconds] = timeOnly.split(":").map(Number);
  const fromDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds
  );

  const diffInSeconds = Math.floor((fromDate.getTime() - now.getTime()) / 1000);

  if (diffInSeconds <= 0) return "";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  const displayHours = diffInHours;
  const displayMinutes = diffInMinutes % 60;
  const displaySeconds = diffInSeconds % 60;

  const parts = [];
  if (displayHours > 0) parts.push(`${displayHours} س`);
  if (displayMinutes > 0) parts.push(`${displayMinutes} د`);
  if (displaySeconds > 0) parts.push(`${displaySeconds} ث`);

  if (parts.length > 0) {
    return (
      <div
        style={{
          display: "flex",
          gap: "0.4rem",
          fontSize: "1rem",
          color: "#AAB8AF",
        }}
      >
        <ClockIcon
          style={{ stroke: "#AAB8AF", width: "2rem", height: "2rem" }}
        />
        <span>{`سوف يبدأ خلال ${parts.join(" و ")}`}</span>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          gap: "0.4rem",
          fontSize: "1rem",
          color: "#AAB8AF",
        }}
      >
        سوف يبدأ قريبًا
      </div>
    );
  }
};

interface CalculateTimeToStartLessonProps {
  fromTime: string; // should now be in "HH:mm:ss" format
}

const CalculateTimeToStartLesson = ({
  fromTime,
}: CalculateTimeToStartLessonProps): JSX.Element => {
  const [timeRemaining, setTimeRemaining] = useState<JSX.Element | string>("");

  useEffect(() => {
    setTimeRemaining(calculateTimeRemaining(fromTime));
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(fromTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [fromTime]);

  return (
    <div style={{ width: "12rem", textAlign: "right" }}>{timeRemaining}</div>
  );
};

export default CalculateTimeToStartLesson;
