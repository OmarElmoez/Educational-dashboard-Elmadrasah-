import { useState, useCallback } from "react";
import HourlyTable from "../../../../components/table/hourly-table/hourlyTableAdmin";
import CustomCalendar from "../../../../components/calendar/MUI-Calendar/calendarAdmin";
import styles from "./HourlyTable.module.css";
import HourlyTableTimeIcon from "@/assets/hourlyTableTimeIcon.svg?react";
// import formatHoursAndMinutes from "@/utils/formatHoursAndMinutes.ts";
import { getLessonsStatusForEachHour } from "@/services/lessonsStatus.ts";
import { Dayjs } from "dayjs";
// import { TLoading } from "@/types/shared.ts";
import { TLessonsForEachHour } from "../../../../components/tabs/sub-components/all-hours/AllHours";
import { THourLesson } from "../../../../components/tabs/sub-components/all-hours/AllHours";

const { title } = styles;

const HourlyLessonsAdmin = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  // const [hourlyLessonsForAllHours, setHourlyLessonsForAllHours] =
  //   useState<TLessonsForEachHour>();
  const [hourlyLessons, setHourlyLessons] = useState<THourLesson[]>([]);
  // const [loading, setLoading] = useState<TLoading>("idle");
  // const formattedDate = date ? date.format("YYYY-MM-DD") : null;
  // const formattedTime = time ? time.format("H:00"): null;

  const filterLessonsBySelectedHour = useCallback(
    (time: Dayjs | null, res: TLessonsForEachHour) => {
      if (!res || !time) return;
      const timeToCompare = time.format("H:00");
      let matchedData = null;
      // console.log(timeToCompare);
      // console.log(res);
      for (const [timeRange, details] of Object.entries(res.hourly_counts)) {
        const [startTime] = timeRange.split(" - ");
        if (startTime === timeToCompare) {
          matchedData = details;
          break;
        }
      }

      if (matchedData) {
        // console.log("Matched Data:", matchedData);
        setHourlyLessons(matchedData.lessons);
      } else {
        // console.log("No match found for the given time.");
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
          // setHourlyLessonsForAllHours(res);
          filterLessonsBySelectedHour(time, res);
        })
        .catch((error) => {
          // setLoading("failed");
          console.error("Error fetching hourly lessons:", error);
        });
    },
    []
  );

  return (
    <>
      <section className={title}>
        <HourlyTableTimeIcon className="hourIcon" />
        <p>
          {/* {formatHoursAndMinutes(hourlyLessons[0].from_datetime)}-
              {formatHoursAndMinutes(hourlyLessons[0].to_datetime)} */}
        </p>
        <CustomCalendar
          setDate={setDate}
          setTime={setTime}
          dispatchFunction={getHourlyLessonsRequest}
        />
      </section>
      <HourlyTable hourlyLessons={hourlyLessons} />
    </>
  );
};

export default HourlyLessonsAdmin;
