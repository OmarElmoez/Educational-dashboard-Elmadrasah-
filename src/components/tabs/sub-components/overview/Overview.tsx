import {
  StudentSatisfaction,
  TabHeader,
  TestClasses,
  TimingDetails, TStudent,
  TTeacher
} from "@/components/tabs/sub-components/Shared.tsx";
import {ProgressBar} from "@/components/UI";

import EyeIcon from '@/assets/eye.svg?react';

import styles from './overview.module.css'
import {useEffect, useState} from "react";
import {getLessonsStatusOverview} from "@/services/lessonsStatus.ts";

const {today_lessons, attendance_status, today_summary} = styles;

export type TOverview = {
  total_lessons_today: number;
  attended_lessons_count: number;
  not_attended_lessons_count: number;
  attendance_percentage: number,
  teachers: TTeacher[];
  students: TStudent[];
};


const Overview = () => {

  const [overViewData, setOverViewData] = useState<TOverview>()

  useEffect(() => {
    sendRequestToServer()
  }, [])

  const sendRequestToServer = () => {
    getLessonsStatusOverview().then((res: TOverview) => {
      setOverViewData(res)
    });
  }

  return (
    <section style={{ position: "relative" }}>
      <TabHeader text="حصص اليوم" onClick={sendRequestToServer} />
      <p className={today_lessons}>
    الحصص الجارية ( {overViewData?.total_lessons_today} حصص )
      </p>
      <section className={attendance_status}>
        <article>
          <div>
            <p style={{fontSize: '1.3rem;'}}>حضور</p>
            <ProgressBar width={`${overViewData?.attendance_percentage}%`}/>
          </div>
          <span>({overViewData?.attended_lessons_count})</span>
        </article>

        <article>
          <div>
            <p style={{ fontSize: '1.3rem;' }}>عدم حضور</p>
            <ProgressBar width="60%" color1="#eb5757" color2="#e48b8b" />
          </div>
          <span>({overViewData?.not_attended_lessons_count})</span>
        </article>

      </section>

      <TimingDetails teachers={overViewData?.teachers || []} students={overViewData?.students  || []} />

      <TestClasses />

      <StudentSatisfaction />

      <button className={today_summary}>
        <EyeIcon />
        <span>عرض ملخص اليوم</span>
      </button>
    </section>
  )
}

export default Overview;