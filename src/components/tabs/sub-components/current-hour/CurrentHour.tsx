import { ProgressBar, StatusBullet } from "@/components/UI";
import {
  TabHeader,
  TimingDetails,
} from "@/components/tabs/sub-components/Shared.tsx";
import styles from "./currentHour.module.css";
import { useCallback, useContext, useEffect, useRef } from "react";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import { actGetCurrentHourData } from "@/store/tabs/TabsSlice.ts";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";

const { status, count_lessons } = styles;

const CurrentHour = () => {
  const { currentHourData, loading } = useAppSelector((state) => state.tabs);

  const dispatch = useAppDispatch();

  const { role, studentId } = useContext(CalendarContext);

  /* todo: there is a problem, the else block is executed first then if block. that's because studentId at first render is null (see the Calendar Context) */

  const sendRequestToServer = useCallback(() => {
    if (role === "Family" && studentId) {
      dispatch(actGetCurrentHourData({ studentId }));
    } else {
      dispatch(actGetCurrentHourData({}));
    }
  }, [dispatch, role, studentId]);

  const requestSentRef = useRef(false);

  useEffect(() => {
    if (
      Object.keys(currentHourData.results).length === 0 &&
      !requestSentRef.current
    ) {
      requestSentRef.current = true;
      sendRequestToServer();
    }

    const interval = setInterval(() => {
      sendRequestToServer();

      // One hour in milliseconds: 3600000
    }, 3600000);

    return () => clearInterval(interval);
  }, [currentHourData.results, sendRequestToServer]);

  return (
    <section>
      <TabHeader text="الحضور للساعة الحالية" onClick={sendRequestToServer} />

      <article style={{ marginTop: "1.2rem" }}>
        <p className={count_lessons}>
          الحصص الجارية للساعة الحالية ( {currentHourData?.lesson_count} حصص )
        </p>

        <ProgressBar
          width={`${currentHourData?.attendance_percentage}%`}
          style={{ marginTop: "2.3rem" }}
        />
        <div className={status}>
          <StatusBullet
            color="var(--main-color)"
            label={`${
              currentHourData?.attended_count === 0
                ? "Zero"
                : currentHourData?.attended_count
            }  حضور المعلمين`}
          />
          <StatusBullet
            color="#E02D2D"
            label={`${
              currentHourData?.not_attended_count === 0
                ? "Zero"
                : currentHourData?.not_attended_count
            }  عدم حضور المعلمين`}
          />
          <StatusBullet
            color="#0650A7"
            label={`${
              currentHourData?.attended_count_participant === 0
                ? "Zero"
                : currentHourData?.attended_count_participant
            } حضور الطلاب `}
          />
          <StatusBullet
            color="#E51BD1"
            label={`${
              currentHourData?.not_attended_count_participant === 0
                ? "Zero"
                : currentHourData?.not_attended_count_participant
            }  عدم حضور الطلاب`}
          />
        </div>
      </article>

      {role === "Admin" && (
        <TimingDetails
          students={currentHourData?.students || []}
          teachers={currentHourData?.teachers || []}
          loading={loading}
        />
      )}
    </section>
  );
};

export default CurrentHour;
