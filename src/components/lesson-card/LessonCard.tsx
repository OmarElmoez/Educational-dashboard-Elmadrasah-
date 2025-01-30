import formatHoursAndMinutes from "@/utils/formatHoursAndMinutes.ts";
import ClockIcon from "@/assets/clock.svg?react";
import EgyptFlag from '@/assets/flag-egypt.svg?react';
import EmiratesFlag from '@/assets/flag-united-arab-emirates.svg?react';
import FileIcon from '@/assets/file-outline.svg?react';
import { useNavigate } from "react-router-dom";

import styles from './lessonCard.module.css'
import { useAppSelector } from "@/store/hooks.ts";
import { THourLesson } from "@/components/tabs/sub-components/all-hours/AllHours.tsx";
import { TLesson } from "@/schemas/LessonSchema.ts";

const { card, status_box } = styles;

const statusInfo = {
  Attended: {
    label: "تم الحضور",
    colors: {
      outer_bg: "#B2CCEC4D",
      inner_bg: "#B2CCEC",
      text: "#0650A7",
      border: "#1B84FF33"
    }
  },
  Scheduled:
    {
      label: "لم تبدأ بعد",
      colors: {
        outer_bg: "#D6DDD880",
        inner_bg: "#CCCCCC",
        text: "#828684",
        border: "#1B84FF33",
      }
    },
  Missed:
    {
      label: "متغيب",
      colors: {
        outer_bg: "#FFEEEE",
        inner_bg: "#FBCBD0",
        text: "#F64E60",
        border: "#CE122580"
      }
    },
  Progressing:
    {
      label: "الانضمام",
      colors: {
        outer_bg: "#1C8A4426",
        inner_bg: "#1C8A444D",
        text: "var(--main-color)",
        border: "#1C8A4480",
      }
    },
  Cancelled:
    {
      label: "ملغاة",
      colors: {
        outer_bg: "#FFEEEE",
        inner_bg: "#FBCBD0",
        text: "#F64E60",
        border: "#CE122580"
      }
    },
};

type TLessonCardProps<T> = {
  lesson: T;
}

const LessonCard = <T extends TLesson | THourLesson>({lesson}: TLessonCardProps<T>) => {

  const navigate = useNavigate();

  const {credintials} = useAppSelector(state => state.auth);

  const navigateToJoinPage = (id: number) => {
    navigate(`/${credintials?.role?.toLowerCase()}/calendar/join-class/${id}`)
  }

  return (
    <article key={lesson.id} className={card} onClick={() => navigateToJoinPage(lesson.id)}
             style={{backgroundColor: statusInfo[lesson.status].colors.outer_bg}}>

      <h4>{lesson.name}</h4>

      <div>
        <ClockIcon style={{stroke: "#93B59F"}}/>
        <p>{formatHoursAndMinutes(lesson.from_datetime)} : {formatHoursAndMinutes(lesson.to_datetime)}</p>
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
        backgroundColor: statusInfo[lesson.status].colors.inner_bg,
        color: statusInfo[lesson.status].colors.text
      }}>
                {statusInfo[lesson.status].label}
              </span>

    </article>
  )
}

export default LessonCard