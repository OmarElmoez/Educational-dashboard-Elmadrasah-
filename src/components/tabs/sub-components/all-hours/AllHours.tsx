import { Dispatch, SetStateAction } from "react";
import { TabHeader } from "@/components/tabs/sub-components/Shared.tsx";
import { ProgressBar, StatusBullet } from "@/components/UI";
import styles from "./allHours.module.css";
import convertToArabicTime from "@/utils/convertToArabicTime.ts";
import { useCallback, useContext, useEffect, useState } from "react";
import { getLessonsStatusForEachHour } from "@/services/lessonsStatus.ts";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import ClickIcon from "@/assets/click.svg?react";

const {status_wrapper, count_lessons, all_hours_info, progress, title} = styles;

type TimeSlotInfo = {
  lesson_count: number;
  student_attended: number;
  teacher_attended: number;
  late_student_count: number;
  late_teacher_count: number;
  attendance_percentage: number;
  lessons: THourLesson[];
};

type HourlyCounts = {
  [timeSlot: string]: TimeSlotInfo;
};

export type THourLesson = {
  start_time_student: null | string;
  student_name: string;
  start_time_employee: null | string;
  spaces: null | string;
  status: "Scheduled" | "Attended" | "Missed" | "Progressing" | "Canceled";
  employee_name: string;
  from_time: string;
  to_time: string;
  from_date: string;
  name: string;
  from_datetime: string;
  to_datetime: string;
  id: number;
};

// Define the main type
export type TLessonsForEachHour = {
  total_lessons_today: number;
  hourly_counts: HourlyCounts;
};

const AllHours = ({
  setLessonsForClickedHour,
  setIsHourClicked,
}: {
  setLessonsForClickedHour: Dispatch<SetStateAction<THourLesson[]>>;
  setIsHourClicked: Dispatch<SetStateAction<boolean>>;
}) => {
  const [allHoursLessonsData, setAllHoursLessonsData] =
    useState<TLessonsForEachHour>();

  const { role, studentId } = useContext(CalendarContext);

  const sendRequestToServer = useCallback(() => {
    if (role === "Family" && studentId) {
      getLessonsStatusForEachHour(studentId).then((res) => {
        setAllHoursLessonsData(res);
      });
      return;
    }

    getLessonsStatusForEachHour().then((res: TLessonsForEachHour) => {
      setAllHoursLessonsData(res);
    });
  }, [role, studentId]);

  useEffect(() => {
    sendRequestToServer();
  }, [sendRequestToServer]);

  return (
    <section>
      <TabHeader
        text="ساعات الدروس اليوم"
        onClick={() => sendRequestToServer()}
      >
        <div className={status_wrapper}>
          <StatusBullet
            color="var(--main-color)"
            label="حضور"
            size={10}
            fontSize={9}
          />
          <StatusBullet
            color="#E02D2D"
            label="عدم حضور المعلم"
            size={10}
            fontSize={9}
          />
          <StatusBullet
            color="#E02D92"
            label="عدم حضور الطالب"
            size={10}
            fontSize={9}
          />
          <StatusBullet
            color="#BB84DB"
            label="تأخير المعلم"
            size={10}
            fontSize={9}
          />
          <StatusBullet
            color="#E4B341"
            label="تأخير الطالب"
            size={10}
            fontSize={9}
          />
        </div>
      </TabHeader>
      <p className={count_lessons}>
        الحصص الجارية ( {allHoursLessonsData?.total_lessons_today} حصص )
      </p>
      <section className={all_hours_info}>
        {allHoursLessonsData &&
          Object.entries(allHoursLessonsData.hourly_counts).map(
            ([key, value]) => {
              return (
                <article key={key}>
                  <div className={title}>
                    <p>{convertToArabicTime(key)}</p>
                    <ClickIcon
                      onClick={() => {
                        setLessonsForClickedHour(value.lessons);
                        setIsHourClicked(true)
                      }}
                    />
                  </div>
                  <div className={progress}>
                    <ProgressBar width={`${value.attendance_percentage}%`} />
                    <span>({value.lesson_count})</span>
                  </div>

                  <div
                    className={status_wrapper}
                    style={{ marginTop: "0.8rem" }}
                  >
                    <StatusBullet color="var(--main-color)" label="2" />
                    <StatusBullet color="#E02D2D" label="0" />
                    <StatusBullet color="#E02D92" label="0" />
                    <StatusBullet color="#BB84DB" label="1" />
                    <StatusBullet color="#E4B341" label="0" />
                  </div>
                </article>
              );
            }
          )}
      </section>
    </section>
  );
};

export default AllHours;
