import { Dispatch, SetStateAction, useState } from "react";
import { TabHeader } from "@/components/tabs/sub-components/Shared.tsx";
import { ProgressBar, StatusBullet } from "@/components/UI";
import styles from "./allHours.module.css";
import convertToArabicTime from "@/utils/convertToArabicTime.ts";
import { useCallback, useContext, useEffect } from "react";
import { getLessonsStatusForEachHour } from "@/services/lessonsStatus.ts";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import ClickIcon from "@/assets/click.svg?react";
import { useNavigate } from "react-router-dom";
import { LoadingIndicator } from "@/components";
import { TLoading } from "@/types/shared.ts";
import { format } from "date-fns";

const { status_wrapper, count_lessons, all_hours_info, progress, title } =
  styles;

export type TimeSlotInfo = {
  lesson_count: number;
  not_attended_student: number;
  not_attended_teacher: number;
  late_student_count: number;
  late_teacher_count: number;
  attendance_percentage: number;
  attendance: number;
  scheduled_students:number;
  cancelled_teachers:number;
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
  status: "Scheduled" | "Attended" | "Missed" | "Progressing" | "Cancelled";
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
  const navigate = useNavigate();
  const [allHoursLessonsData, setAllHoursLessonsData] =
    useState<TLessonsForEachHour>();

  const { role, studentId, clickedDate } = useContext(CalendarContext);

  const [loading, setLoading] = useState<TLoading>("idle");

  const sendRequestToServer = useCallback(() => {
    setLoading("pending");
    if (role === "Family" && studentId) {
      getLessonsStatusForEachHour({ studentId }).then((res) => {
        setLoading("succeeded");
        setAllHoursLessonsData(res);
      });
      return;
    }

    const formattedDate = format(clickedDate, "yyyy-MM-dd");

    getLessonsStatusForEachHour({ day: formattedDate }).then(
      (res: TLessonsForEachHour) => {
        setLoading("succeeded");
        setAllHoursLessonsData(res);
      }
    );
  }, [clickedDate, role, studentId]);

  useEffect(() => {
    sendRequestToServer();
  }, [sendRequestToServer]);

  // Navigate To All Hourly Lessons Table
  const navigateToHourlyTable = (data: TimeSlotInfo) => {
    navigate("hourly-lessons", {
      state: {
        data,
        date: { start: data?.lessons[0]?.from_datetime, end: data?.lessons[0]?.to_datetime },
      },
    });
  };

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
      {loading === "pending" && <LoadingIndicator />}
      {loading === "succeeded" &&
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
                          setIsHourClicked(true);
                        }}
                      />
                    </div>
                    <div
                      className={progress}
                      onClick={() => {
                        navigateToHourlyTable(value);
                      }}
                    >
                      <ProgressBar width={`${value.attendance_percentage}%`} />
                      <span>({value.lesson_count})</span>
                    </div>

                  <div
                    className={status_wrapper}
                    style={{marginTop: "0.8rem"}}
                  >
                    <StatusBullet color="var(--main-color)" label={`${value.attendance}`} />
                    <StatusBullet color="#E02D2D" label={`${value.not_attended_teacher}`}/>
                    <StatusBullet color="#E02D92" label={`${value.not_attended_student}`}/>
                    <StatusBullet color="#BB84DB" label={`${value.late_teacher_count}`}/>
                    <StatusBullet color="#E4B341" label={`${value.late_student_count}`}/>
                  </div>
                </article>
              );
            }
          )}
      </section>}
    </section>
  );
};
export default AllHours;
