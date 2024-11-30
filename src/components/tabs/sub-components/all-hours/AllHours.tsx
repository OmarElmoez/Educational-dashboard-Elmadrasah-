import {TabHeader} from "@/components/tabs/sub-components/Shared.tsx";
import {ProgressBar, StatusBullet} from "@/components/UI";

import styles from './allHours.module.css'
import convertToArabicTime from "@/utils/convertToArabicTime.ts";
import {useEffect, useState} from "react";
import {getLessonsStatusForEachHour} from "@/services/lessonsStatus.ts";

const {status_wrapper, count_lessons, all_hours_info, progress} = styles;

type TimeSlotInfo = {
  lesson_count: number;
  student_attended: number;
  teacher_attended: number;
  late_student_count: number;
  late_teacher_count: number;
  attendance_percentage: number;
};

type HourlyCounts = {
  [timeSlot: string]: TimeSlotInfo;
};

// Define the main type
export type  TLessonsForEachHour = {
  total_lessons_today: number;
  hourly_counts: HourlyCounts;
};

const AllHours = () => {

  const [allHoursLessonsData, setAllHoursLessonsData] = useState<TLessonsForEachHour>()

  useEffect(() => {
    sendRequestToServer()
  }, [])

  const sendRequestToServer =  () => {
    getLessonsStatusForEachHour().then((res: TLessonsForEachHour) => {
      setAllHoursLessonsData(res)
    })
  }

  return (
    <section>
      <TabHeader text="ساعات الدروس اليوم" onClick={() => sendRequestToServer()}>
        <div className={status_wrapper}>
          <StatusBullet color="var(--main-color)" label="حضور"/>
          <StatusBullet color="#E02D2D" label="عدم حضور المعلم"/>
          <StatusBullet color="#E02D92" label="عدم حضور الطالب"/>
          <StatusBullet color="#BB84DB" label="تأخير المعلم"/>
          <StatusBullet color="#E4B341" label="تأخير الطالب"/>
        </div>
      </TabHeader>

      <p className={count_lessons}>حصص اليوم {allHoursLessonsData?.total_lessons_today} حصة</p>

      <section className={all_hours_info}>
        {allHoursLessonsData && Object.entries(allHoursLessonsData.hourly_counts).map(([key, value]) => {
          return (
            <article key={key}>
              <p>{convertToArabicTime(key)}</p>

              <div className={progress}>
                <ProgressBar width={`${value.attendance_percentage}%`}/>
                <span>({value.lesson_count})</span>
              </div>

              <div className={status_wrapper} style={{marginTop: '0.8rem'}}>
                <StatusBullet color="var(--main-color)" label="2"/>
                <StatusBullet color="#E02D2D" label="0"/>
                <StatusBullet color="#E02D92" label="0"/>
                <StatusBullet color="#BB84DB" label="1"/>
                <StatusBullet color="#E4B341" label="0"/>
              </div>
            </article>
          )
        })}
      </section>

    </section>
  )
}

export default AllHours;