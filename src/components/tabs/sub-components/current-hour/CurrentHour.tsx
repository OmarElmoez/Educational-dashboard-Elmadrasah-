import {ProgressBar, StatusBullet} from "@/components/UI";
import {
  TabHeader,
  TimingDetails,
  TStudent,
  TTeacher
} from "@/components/tabs/sub-components/Shared.tsx";
import styles from './currentHour.module.css'
import {useCallback, useContext, useEffect, useState} from "react";
import {getLessonsStatusForCurrentHour} from "@/services/lessonsStatus.ts";
import {CalendarContext} from "@/store/context/CalendarContext.tsx";

const {status, count_lessons} = styles;

export type TLessonForCurrentHour = {
  lesson_count: number;
  attended_count: number;
  not_attended_count: number;
  attendance_percentage: number;
  teachers: TTeacher[];
  students: TStudent[];
}

const CurrentHour = () => {

  const [currentHourData, setCurrentHourData] = useState<TLessonForCurrentHour>();

  const {role, studentId} = useContext(CalendarContext)

  /* todo: there is a problem, the else block is executed first then if block. that's because studentId at first render is null (see the Calendar Context) */

  const sendRequestToServer = useCallback(() => {
    if (role === 'Family' && studentId) {
      getLessonsStatusForCurrentHour(studentId).then(res => {
        setCurrentHourData(res)
      })
    } else {
      getLessonsStatusForCurrentHour().then((res: TLessonForCurrentHour) => {
        setCurrentHourData(res);
      })
    }
  }, [role, studentId])

  useEffect(() => {
    sendRequestToServer()
  }, [sendRequestToServer])


  return (
    <section>
      <TabHeader text="الحضور للساعة الحالية" onClick={sendRequestToServer}/>

      <article style={{marginTop: "1.2rem"}}>
        <p className={count_lessons}>الحصص الجارية ( {currentHourData?.lesson_count} حصص )</p>

        <ProgressBar width={`${currentHourData?.attendance_percentage}%`} style={{marginTop: '2.3rem'}}/>
        <div className={status}>
          <StatusBullet color="var(--main-color)"
                        label={`${currentHourData?.attended_count === 0 ? "Zero" : currentHourData?.attended_count} حضور`}/>
          <StatusBullet color="#E02D2D"
                        label={`${currentHourData?.attended_count === 0 ? "Zero" : currentHourData?.attended_count} عدم حضور`}/>
        </div>
      </article>

      {role === 'Admin' && <TimingDetails students={currentHourData?.students || []} teachers={currentHourData?.teachers || []}/>}

      {/*<TestClasses/>*/}

      {/*{role === 'Admin' && <StudentSatisfaction/>}*/}

    </section>
  )
}

export default CurrentHour;