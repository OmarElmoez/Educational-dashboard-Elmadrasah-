import { useState, useEffect, useCallback } from "react";
import HourlyTable from "../../../../components/table/hourly-table/hourlyTableAdmin";
import CustomCalendar from "../../../../components/calendar/MUI-Calendar/calendarAdmin";
import { StatusBullet } from "@/components/UI";
import styles from "./HourlyTable.module.css";
import HourlyTableTimeIcon from "@/assets/hourlyTableTimeIcon.svg?react";
import { getLessonsStatusForEachHour } from "@/services/lessonsStatus.ts";
import { Dayjs } from "dayjs";
import { useLocation } from "react-router-dom";
import convertToArabicTime from "@/utils/convertToArabicTime.ts";
import { THourLesson, TimeSlotInfo, TLessonsForEachHour } from "@/store/tabs/TabsSlice.ts";
const { title, status_wrapper } = styles;
const defaultTimeSlotInfo: TimeSlotInfo = {
  lesson_count: 0,
  not_attended_student: 0,
  not_attended_teacher: 0,
  late_student_count: 0,
  late_teacher_count: 0,
  attendance_percentage: 0,
  attendance: 0,
  scheduled_students: 0,
  cancelled_teachers: 0,
  lessons: [],
};
const HourlyLessonsAdmin = () => {
  const [displayDate, setDisplayDate] = useState<string>();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [hourlyLessonsForAllHours, setHourlyLessonsForAllHours] =
    useState<TimeSlotInfo>(defaultTimeSlotInfo);
  const [hourlyLessons, setHourlyLessons] = useState<THourLesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  useEffect(() => {
    setHourlyLessonsForAllHours(location.state.data);
    setHourlyLessons(location.state.data.lessons);
    setDate(location.state.date);
    let startTime = location.state.date.start;
    let endTime = location.state.date.end;
    let timeRange = `${startTime} - ${endTime}`;
    setDisplayDate(convertToArabicTime(timeRange));
    setLoading(false);
  }, [location]);
  // TEMP: use date and time to fix deployment
  console.log(date, time);
  function addHoursToTime(inputTime: string) {
    let timeParts = inputTime.split(":");
    let date = new Date();
    date.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0, 0);
    date.setHours(date.getHours() + 1);
    let newHours = date.getHours().toString().padStart(2, "0");
    let newMinutes = date.getMinutes().toString().padStart(2, "0");
    let newTime = `${newHours}:${newMinutes}`;
    let timeRange = `${inputTime} - ${newTime}`;
    setDisplayDate(convertToArabicTime(timeRange));
    return `${inputTime} - ${newTime}`;
  }
  const filterLessonsBySelectedHour = useCallback(
    (time: Dayjs | null, res: TLessonsForEachHour) => {
      if (!res || !time) return;
      const timeToCompare = time.format("H:00");
      addHoursToTime(timeToCompare);
      let matchedData = null;
      for (const [timeRange, details] of Object.entries(res.hourly_counts)) {
        const [startTime] = timeRange.split(" - ");
        if (startTime === timeToCompare) {
          matchedData = details;
          break;
        }
      }
      if (matchedData) {
        setHourlyLessonsForAllHours(matchedData);
        setHourlyLessons(matchedData.lessons);
      } else {
        setHourlyLessonsForAllHours(defaultTimeSlotInfo);
        setHourlyLessons([]);
      }
    },
    []
  );

  const getHourlyLessonsRequest = useCallback(
    (date: Dayjs | null, time: Dayjs | null) => {
      let formattedDate = date ? date.format("YYYY-MM-DD") : null;
      if (!formattedDate) return;
      setLoading(true);
      getLessonsStatusForEachHour({ day: formattedDate })
        .then((res: TLessonsForEachHour) => {
          setLoading(false);
          filterLessonsBySelectedHour(time, res);
        })
        .catch((error) => {
          setLoading(false);
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
            label={`${hourlyLessonsForAllHours?.attendance} طالب حضر`}
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="var(--main-color)"
            label={`${hourlyLessonsForAllHours?.scheduled_students} طالب مجدول`}
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#F64E60"
            label={`${hourlyLessonsForAllHours?.not_attended_student} طالب غائب`}
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#F64E60"
            label={`${hourlyLessonsForAllHours?.not_attended_teacher} مدرس غائب`}
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#E90A0A"
            label={`${hourlyLessonsForAllHours?.cancelled_teachers} مدرس ألغى`}
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#E4B341E4"
            label={`${hourlyLessonsForAllHours?.late_student_count} طالب تأخر`}
            size={8}
            fontSize={14}
          />
          <StatusBullet
            color="#BB83DB"
            label={`${hourlyLessonsForAllHours?.late_teacher_count} مدرس تأخر`}
            size={8}
            fontSize={14}
          />
        </div>
      </section>
      <HourlyTable hourlyLessons={hourlyLessons} loading={loading} />
    </>
  );
};

export default HourlyLessonsAdmin;
