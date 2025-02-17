import { Dispatch, SetStateAction } from "react";
import { TabHeader } from "@/components/tabs/sub-components/Shared.tsx";
import { ProgressBar, StatusBullet } from "@/components/UI";
import styles from "./allHours.module.css";
import convertToArabicTime from "@/utils/convertToArabicTime.ts";
import { useCallback, useContext, useEffect } from "react";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import ClickIcon from "@/assets/click.svg?react";
import { useNavigate } from "react-router-dom";
import { LoadingIndicator } from "@/components";
import { format } from "date-fns";
import { actGetAllHoursData } from "@/store/tabs/TabsSlice.ts";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";

const { status_wrapper, count_lessons, all_hours_info, progress, title } =
  styles;

const AllHours = ({
  setLessonsForClickedHour,
  setIsHourClicked,
}: {
  setLessonsForClickedHour: Dispatch<SetStateAction<THourLesson[]>>;
  setIsHourClicked: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const {loading, allHoursData} = useAppSelector(state => state.tabs);
  
  const dispatch = useAppDispatch();

  const { role, studentId, clickedDate } = useContext(CalendarContext);

  const sendRequestToServer = useCallback(() => {
    if (role === "Family" && studentId) {
      dispatch(actGetAllHoursData({studentId}))
      return;
    }

    const formattedDate = format(clickedDate, "yyyy-MM-dd");
    dispatch(actGetAllHoursData({ day: formattedDate }))
  }, [clickedDate, dispatch, role, studentId]);

  useEffect(() => {
    if (Object.keys(allHoursData.hourly_counts).length === 0) {
      sendRequestToServer();
    }
  }, [allHoursData.hourly_counts, sendRequestToServer]);

  // Navigate To All Hourly Lessons Table
  const navigateToHourlyTable = (data: TimeSlotInfo) => {
    navigate("hourly-lessons", {
      state: {
        data,
        date: { start: data?.lessons[0]?.from_time, end: data?.lessons[0]?.to_time },
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
        الحصص الجارية ( {allHoursData?.total_lessons_today} حصص )
      </p>
      {loading === "pending" && <LoadingIndicator />}
      {loading === "succeeded" &&
        <section className={all_hours_info}>
          {allHoursData &&
            Object.entries(allHoursData.hourly_counts).map(
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
