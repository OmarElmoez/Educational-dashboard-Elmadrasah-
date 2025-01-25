import styles from './classesForDay.module.css'
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";

import {TLesson} from "@/schemas/LessonSchema.ts";

import formatHoursAndMinutes from "@/utils/formatHoursAndMinutes.ts";
import ClockIcon from "@/assets/clock.svg?react";
import EgyptFlag from '@/assets/flag-egypt.svg?react';
import EmiratesFlag from '@/assets/flag-united-arab-emirates.svg?react';
import FileIcon from '@/assets/file-outline.svg?react';
import {LoadingIndicator} from "@/components";
import {useNavigate} from "react-router-dom";
import formatDateIntoArabic from "@/utils/formatDateIntoArabic.ts";
import {CalendarContext} from "@/store/context/CalendarContext.tsx";
import actGetLessonsByDay from "@/store/lessons/act/actGetLessonsByDay.ts";
import { THourLesson } from "@/components/tabs/sub-components/all-hours/AllHours.tsx";

const {title, lessons_cards, card, status_box, kids_names} = styles;

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
        border: "#CE122580 "
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
  Canceled:
    {
      label: "لم تبدأ بعد",
      colors: {
        outer_bg: "transparent",
        inner_bg: "#CCCCCC",
        text: "#828684",
        border: "#1B84FF33"
      }
    },
};

type TChild =  {   id: number, first_name: string, last_name: string }

const ClassesForDay = ({ lessonsForClickedHour }: {lessonsForClickedHour?: THourLesson[]}) => {

  const {today_lessons, loading} = useAppSelector(state => state.lessons);
  const dispatch = useAppDispatch();

  const {credintials} = useAppSelector(state => state.auth);
  const {statistics} = useAppSelector(state => state.profile);

  const {clickedDate, setStudentId} = useContext(CalendarContext);
  const dateInArabic = formatDateIntoArabic(clickedDate)

  const filteredLessons = today_lessons.filter(lesson => {
    return clickedDate.setHours(0, 0, 0, 0) === new Date(lesson.from_date).setHours(0, 0, 0, 0);
  })

  console.log('filteredLessons', filteredLessons);

  const navigate = useNavigate();

  const navigateToJoinPage = (id: number) => {
    navigate(`/${credintials?.role?.toLowerCase()}/calendar/join-class/${id}`)
  }

  const [activeTab, setActiveTab] = useState({
    idx: -1,
    name: "",
  })

  const onClickHandler = (idx: number, child: TChild) => {
    setActiveTab({idx, name: child.first_name})
    setStudentId(child.id)
    dispatch(actGetLessonsByDay({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`, studentId: child.id}))
  }

  const clickAllHandler = (idx: number) => {
    setActiveTab({idx, name: ""})
    dispatch(actGetLessonsByDay({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`}))
  }

  return (
    <>
      {!statistics && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <h3 className={title}>حصص اليوم {dateInArabic}</h3>
      {credintials?.role === 'Family' && <section className={kids_names}>
          <div onClick={() => clickAllHandler(-1)}
               style={{backgroundColor: activeTab.idx === -1 ? "#fff" : "transparent", borderRadius: "5px"}}>
              <span>الكل</span>
          </div>
        {statistics && statistics?.map((child: TChild, idx: number) => (
          <div key={child.id} onClick={() => onClickHandler(idx, child)}
               style={{backgroundColor: activeTab.idx === idx ? "#fff" : "transparent", borderRadius: "5px"}}>
            <span>{child.first_name}</span>
          </div>
        ))}
      </section>}
      <section className={lessons_cards}>
        {loading === 'pending' && <LoadingIndicator/>}
        {(filteredLessons.length === 0 && !lessonsForClickedHour) && <p className="error">ليس لديك حصص اليوم !</p>}
        {(filteredLessons.length > 0 && !lessonsForClickedHour) && filteredLessons.map((lesson: TLesson) => {
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
                <p>الطالب {lesson.participants[0]?.student_name}</p>
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
        })}
        {lessonsForClickedHour?.map((lesson: THourLesson) => {
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
                <p>الطالب {lesson?.student_name}</p>
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
        })}
      </section>
    </>
  )
}

export default ClassesForDay