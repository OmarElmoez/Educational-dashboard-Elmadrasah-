import { useState, useEffect } from "react";
import ClockIcon from "@/assets/clock.svg?react";
import EgyptFlag from '@/assets/flag-egypt.svg?react';
import EmiratesFlag from '@/assets/flag-united-arab-emirates.svg?react';
import FileIcon from '@/assets/file-outline.svg?react';
import { useNavigate } from "react-router-dom";
import styles from './lessonCard.module.css'
import { useAppSelector } from "@/store/hooks.ts";
import { THourLesson } from "@/components/tabs/sub-components/all-hours/AllHours.tsx";
import { TLesson } from "@/schemas/LessonSchema.ts";
import  STATUS_INFO  from "@/constants/lessons-status.ts";
import convertToArabicTime from "@/utils/convertToArabicTime";

const { card, status_box } = styles;

type TLessonCardProps<T> = {
  lesson: T;
}

const LessonCard = <T extends TLesson | THourLesson>({lesson}: TLessonCardProps<T>) => {
  const [displayTime, setDisplayTime] = useState<string>();
useEffect(() => {
  let timeRange = `${lesson.from_time} - ${lesson.to_time}`;
  setDisplayTime(convertToArabicTime(timeRange))
},[lesson])
  const navigate = useNavigate();

  const {credintials} = useAppSelector(state => state.auth);

  const navigateToJoinPage = (id: number) => {
    navigate(`/${credintials?.role?.toLowerCase()}/calendar/join-class/${id}`)
  }
  return (
    <article key={lesson.id} className={card} onClick={() => navigateToJoinPage(lesson.id)}
             style={{backgroundColor: STATUS_INFO[lesson.status].colors.outer_bg}}>

      <h4>{lesson.name}</h4>

      <div>
        <ClockIcon style={{stroke: "#93B59F"}}/>
        <p>{displayTime}</p>
      </div>

      <div>
        <EgyptFlag/>
        <p>المعلم {lesson.employee_name}</p>
      </div>

      <div>
        <EmiratesFlag/>
        {("student_name" in lesson) ? <p>الطالب {lesson.student_name}</p> : <p>الطالب {lesson.participants[0]?.student_name}</p>}
      </div>

      <div>
        <FileIcon/>
        <p>رفع الملفات</p>
      </div>

      <span className={status_box} style={{
        backgroundColor: STATUS_INFO[lesson.status].colors.inner_bg,
        color: STATUS_INFO[lesson.status].colors.text
      }}>
                {STATUS_INFO[lesson.status].label}
              </span>

    </article>
  )
}

export default LessonCard