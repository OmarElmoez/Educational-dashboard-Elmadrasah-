import {ProgressBar, StatusBullet} from "@/components/UI";
import {
  StudentSatisfaction,
  TabHeader,
  TestClasses,
  TimingDetails,
  TStudent,
  TTeacher
} from "@/components/tabs/sub-components/Shared.tsx";
import styles from './currentHour.module.css'
import {useEffect, useState} from "react";
import {getLessonsStatusForCurrentHour} from "@/services/lessonsStatus.ts";

const {status} = styles;

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

  useEffect(() => {
    sendRequestToServer()
  }, [])

  const sendRequestToServer = () => {
    getLessonsStatusForCurrentHour().then((res: TLessonForCurrentHour) => {
      setCurrentHourData(res);
    })
  }

  return (
    <section>
      <TabHeader text="الحضور للساعة الحالية" onClick={sendRequestToServer}/>

      <article style={{marginTop: "2rem"}}>
        <p>الحصص الجارية ( {currentHourData?.lesson_count} حصص )</p>

        <ProgressBar width={`${currentHourData?.attendance_percentage}%`} style={{marginTop: '2.3rem'}}/>
        <div className={status}>
          <StatusBullet color="var(--main-color)"
                        label={`${currentHourData?.attended_count === 0 ? "Zero" : currentHourData?.attended_count} حضور`}/>
          <StatusBullet color="#E02D2D"
                        label={`${currentHourData?.attended_count === 0 ? "Zero" : currentHourData?.attended_count} عدم حضور`}/>
        </div>
      </article>

      <TimingDetails students={currentHourData?.students || []} teachers={currentHourData?.teachers || []}/>

      <TestClasses/>

      <StudentSatisfaction/>

    </section>
  )
}

export default CurrentHour;