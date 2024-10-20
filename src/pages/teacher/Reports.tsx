import { InfoCard, LoadingIndicator } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import CheckCircle from "@/assets/check-circle.svg?react";
import XCircle from "@/assets/x-circle.svg?react";
import LightBulb from "@/assets/light-bulb.svg?react";
import CalendarIcon from "@/assets/calendarForCard.svg?react";
import ClockIcon from "@/assets/clock.svg?react";

import styles from "./reports.module.css";
import { useCallback, useEffect, useState } from "react";
import formatDaysAndMonths from "@/utils/formatDaysAndMonths";
import formatHoursAndMinutes from "@/utils/formatHoursAndMinutes";
import actGetLessonsByStatus from "@/store/lessons/act/actGetLessonsByStatus";
import { TLessonStatus } from "@/types/shared";

const {
  cardsContainer,
  totalClasses,
  reports,
  report,
  reportInfo,
  reportDateAndTime,
  reportStatus,
  next_btn,
} = styles;
const TeacherReportsPage = () => {
  const { statistics } = useAppSelector((state) => state.profile);

  const { status_lessons, next, loading } = useAppSelector(
    (state) => state.lessons
  );

  const dispatch = useAppDispatch();

  const CARDS = [
    {
      id: 1,
      title: "منتهية",
      count: statistics?.total_attended,
      style: {
        backgroundColor: "#DAF1E4",
        color: "#1C8A44",
      },
      icon: <CheckCircle />,
      status: "Attended" as TLessonStatus,
    },
    {
      id: 2,
      title: "مجدولة",
      count: statistics?.total_scheduled,
      style: {
        backgroundColor: "#FFE7B9",
        color: "#EDA61C",
      },
      icon: <LightBulb style={{ stroke: "#EDA61C" }} />,
      status: "Scheduled" as TLessonStatus,
    },
    {
      id: 3,
      title: "متغيب",
      count: statistics?.total_missed,
      style: {
        backgroundColor: "#FFEBEB",
        color: "#E11D48",
      },
      icon: <XCircle />,
      status: "Missed" as TLessonStatus,
    },
  ];

  const statusStyle = {
    Attended: {
      backgroundColor: "var(--main-color)",
    },
    Scheduled: {
      backgroundColor: "#FF9C52",
    },
    Missed: {
      backgroundColor: "#E11D48",
    },
    Progressing: {
      backgroundColor: "transparent",
    },
    Canceled: {
      backgroundColor: "transparent",
    },
  };

  const [currentStatus, setCurrentStatus] = useState<TLessonStatus>("Attended");

  const filterLessonsHandler = useCallback(
    ({
      lesson_status,
      next,
    }: {
      lesson_status: TLessonStatus;
      next?: string | null;
    }) => {
      setCurrentStatus(lesson_status);
      dispatch(
        actGetLessonsByStatus({
          status: lesson_status,
          next,
        })
      )
        .unwrap()
        .then(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
    },
    [dispatch]
  );

  useEffect(() => {
    filterLessonsHandler({ lesson_status: currentStatus });
  }, [filterLessonsHandler, currentStatus]);

  return (
    <>
      {loading === "pending" && (
        <div className="loadingBox">
          <LoadingIndicator />
        </div>
      )}
      <h1>إحصائيات</h1>
      <p className={totalClasses}>
        إجمالي عدد الحصص: <span>{statistics?.total_lessons}</span>
      </p>
      <section className={cardsContainer}>
        {CARDS.map((card) => (
          <InfoCard
            key={card.id}
            {...card}
            getLessonsForStatus={filterLessonsHandler}
          />
        ))}
      </section>
      <section className={reports}>
        <h3>التقارير</h3>
        {status_lessons?.map((lesson) => (
          <article key={lesson.id} className={report}>
            <section className={reportInfo}>
              <h3>الطالب: {lesson.participants[0].student_name}</h3>
              <section className={reportDateAndTime}>
                <div>
                  <CalendarIcon />
                  {formatDaysAndMonths(lesson.from_date)}
                </div>
                <div>
                  <ClockIcon style={{ stroke: "#171717" }} />
                  {formatHoursAndMinutes(lesson.from_datetime)} -{" "}
                  {formatHoursAndMinutes(lesson.to_datetime)}
                </div>
              </section>
            </section>
            <p className={reportStatus} style={statusStyle[lesson.status]}>
              {CARDS.map((card) => {
                if (card.status === lesson.status) {
                  return card.title;
                }
              })}
            </p>
          </article>
        ))}
        {next !== null && (
          <button
            className={next_btn}
            onClick={() =>
              filterLessonsHandler({ lesson_status: currentStatus, next })
            }
          >
            الصفحة التالية
          </button>
        )}
      </section>
    </>
  );
};

export default TeacherReportsPage;
