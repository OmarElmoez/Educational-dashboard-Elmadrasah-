import { useState, useEffect, useCallback } from "react";
import HourlyTable from "../../../../components/table/hourly-table/hourlyTableAdmin";
import CustomCalendar from "../../../../components/calendar/MUI-Calendar/calendarAdmin";
import { StatusBullet } from "@/components/UI";
import styles from "./HourlyTable.module.css";
import HourlyTableTimeIcon from "@/assets/hourlyTableTimeIcon.svg?react";
import formatHoursAndMinutes from "@/utils/formatHoursAndMinutes.ts";
import { getLessonsStatusForEachHour } from "@/services/lessonsStatus.ts";
import { Dayjs } from "dayjs";
// import { TLoading } from "@/types/shared.ts";
import { TLessonsForEachHour } from "@/components/tabs/sub-components/all-hours/AllHours";
import { THourLesson } from "@/components/tabs/sub-components/all-hours/AllHours";
import { useLocation } from "react-router-dom";
import convertToArabicTime from '@/utils/convertToArabicTime.ts';
const { title, status_wrapper} = styles;
const HourlyLessonsAdmin = () => {
  const [displayDate, setDisplayDate] = useState<string>();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  // const [hourlyLessonsForAllHours, setHourlyLessonsForAllHours] =
  //   useState<TLessonsForEachHour>();
  const [hourlyLessons, setHourlyLessons] = useState<THourLesson[]>([]);
  // const [loading, setLoading] = useState<TLoading>("idle");
  const location = useLocation();
  useEffect(() => {
    setHourlyLessons(location.state.data);
    setDate(location.state.date);
    let startTime = formatHoursAndMinutes(location.state.date.start)
    let endTime = formatHoursAndMinutes(location.state.date.end)
    setDisplayDate(`${startTime} - ${endTime}`);
    console.log(location.state.data);
  }, [location]);
  // TEMP: use date and time to fix deployment
  console.log(date, time);
  function addHoursToTime(inputTime:string) {
    let timeParts = inputTime.split(":");
    let date = new Date();
    date.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0, 0);
    date.setHours(date.getHours() + 1);
    let newHours = date.getHours().toString().padStart(2, '0');
    let newMinutes = date.getMinutes().toString().padStart(2, '0');
    let newTime = `${newHours}:${newMinutes}`;
    const timeRange = `${inputTime} - ${newTime}`
    setDisplayDate(convertToArabicTime(timeRange))
    return `${inputTime} - ${newTime}`;
}
  const filterLessonsBySelectedHour = useCallback(
    (time: Dayjs | null, res: TLessonsForEachHour) => {
      if (!res || !time) return;
      const timeToCompare = time.format("H:00");
      addHoursToTime(timeToCompare)
      let matchedData = null;
      for (const [timeRange, details] of Object.entries(res.hourly_counts)) {
        const [startTime] = timeRange.split(" - ");
        if (startTime === timeToCompare) {
          matchedData = details;
          break;
        }
      }
      if (matchedData) {
        setHourlyLessons(matchedData.lessons);
      
      } else {
        setHourlyLessons([]);
      }
    },
    []
  );

  const getHourlyLessonsRequest = useCallback(
    (date: Dayjs | null, time: Dayjs | null) => {
      let formattedDate = date ? date.format("YYYY-MM-DD") : null;
      if (!formattedDate) return;
      // setLoading("pending");
      getLessonsStatusForEachHour({ day: formattedDate })
        .then((res: TLessonsForEachHour) => {
          // setLoading("succeeded");
          filterLessonsBySelectedHour(time, res);
        })
        .catch((error) => {
          // setLoading("failed");
          console.error("Error fetching hourly lessons:", error);
        });
    },
    [filterLessonsBySelectedHour]
  );

  return (
    <>
      <section className={title}>
        <HourlyTableTimeIcon className="hourIcon" />
          <p>{displayDate}</p>
        <CustomCalendar
          setDate={setDate}
          setTime={setTime}
          dispatchFunction={getHourlyLessonsRequest}
        />
      </section>
      <section>
        <div className={status_wrapper}>
          <StatusBullet
            color="#0650A7"
            label={`30 طالب حضر`}
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="var(--main-color)"
            label="30 طالب مجدول"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#F64E60"
            label="30 طالب غائب"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#F64E60"
            label="30 مدرس غائب"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#E90A0A"
            label="30 مدرس ألغى"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#E4B341E4"
            label="10 طالب تأخر"
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#BB83DB"
            label="10 مدرس تأخر"
            size={8}
            fontSize={14}
          />
        </div>
      </section>
      <HourlyTable hourlyLessons={hourlyLessons} />
    </>
  );
};

export default HourlyLessonsAdmin;
