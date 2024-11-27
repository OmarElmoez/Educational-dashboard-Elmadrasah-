import {StudentSatisfaction, TabHeader, TestClasses, TimingDetails} from "@/components/tabs/sub-components/Shared.tsx";
import {ProgressBar} from "@/components/UI";

import EyeIcon from '@/assets/eye.svg?react';

import styles from './overview.module.css'
import {useEffect, useState} from "react";
import {getLessonsStatusOverview} from "@/services/lessonsStatus.ts";

const {today_lessons, attendance_status, today_summary} = styles;

type TTeacher = {
  start_time_employee?: string;
  status: string;
  from_time: string;
  teacher_name: string;
};

type TStudent = {
  start_time_student?: string;
  lesson__from_time: string;
  student_name: string;
};

export type TOverview = {
  total_lessons_today: number;
  attended_lessons_count: number;
  not_attended_lessons_count: number;
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
      <TabHeader text="حصص اليوم" onClick={() => sendRequestToServer()} />

      <p className={today_lessons}>عدد حصص اليوم {overViewData?.total_lessons_today} حصة</p>

      <section className={attendance_status}>
        <article>
          <div>
            <p style={{fontSize: '1.3rem;'}}>حضور</p>
            <ProgressBar width="60%"/>
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

      <TimingDetails teachers={overViewData?.teachers} students={overViewData?.students} />

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