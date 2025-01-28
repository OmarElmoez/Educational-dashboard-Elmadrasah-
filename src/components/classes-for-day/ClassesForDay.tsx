import styles from './classesForDay.module.css'
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";

import {TLesson} from "@/schemas/LessonSchema.ts";

import formatHoursAndMinutes from "@/utils/formatHoursAndMinutes.ts";
import ClockIcon from "@/assets/clock.svg?react";
import EgyptFlag from '@/assets/flag-egypt.svg?react';
import EmiratesFlag from '@/assets/flag-united-arab-emirates.svg?react';
import FileIcon from '@/assets/file-outline.svg?react';
import {LoadingIndicator} from "@/components";
import {useNavigate} from "react-router-dom";
import {CalendarContext} from "@/store/context/CalendarContext.tsx";
import actGetLessonsByMonth from "@/store/lessons/act/actGetLessonsByMonth.ts";
import { THourLesson } from "@/components/tabs/sub-components/all-hours/AllHours.tsx";
import { format } from "date-fns";
import { ar } from 'date-fns/locale';
import actGetLessonsByDay from "@/store/lessons/act/actGetLessonsByDay.ts";

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

type TChild =  {   id: number, first_name: string, last_name: string }

const ClassesForDay = ({ lessonsForClickedHour, isHourClicked }: {lessonsForClickedHour?: THourLesson[], isHourClicked?: boolean}) => {

  const {Today_lessons, Month_lessons, loading} = useAppSelector(state => state.lessons);

  const dispatch = useAppDispatch();

  const {credintials} = useAppSelector(state => state.auth);

  const {statistics} = useAppSelector(state => state.profile)

  const {clickedDate, setStudentId} = useContext(CalendarContext);
  const arabicDate = format(clickedDate, "d MMMM yyyy", {locale: ar})

  const filteredLessons = Month_lessons.filter(lesson => {
    return clickedDate.setHours(0, 0, 0, 0) === new Date(lesson.from_date).setHours(0, 0, 0, 0);
  })
  
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
    dispatch(actGetLessonsByMonth({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`, studentId: child.id}))
  }

  const clickAllHandler = (idx: number) => {
    setActiveTab({idx, name: ""})
    dispatch(actGetLessonsByMonth({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`}))
  }
  
  useEffect(() => {
    if (credintials?.role !== "Admin" && Month_lessons.length === 0) {
      dispatch(actGetLessonsByMonth({date: `${clickedDate.getMonth() + 1}-${clickedDate.getFullYear()}`}))
      return ;
    }
    if (credintials?.role === "Admin") {
      dispatch(actGetLessonsByDay({day: `${clickedDate.getDate()}-${clickedDate.getMonth() + 1}-${clickedDate.getFullYear()}`}))
      return ;
    }
  }, [Month_lessons.length, clickedDate, credintials?.role, dispatch])

  return (
    <>
      {!statistics && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <h3 className={title}>حصص اليوم {arabicDate}</h3>
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
        {(Today_lessons.length === 0 && filteredLessons.length === 0 && !isHourClicked) && <p className="error">ليس لديك حصص اليوم !</p>}
        {credintials?.role !== "Admin" && (filteredLessons.length > 0 && !isHourClicked) && filteredLessons.map((lesson: TLesson) => {
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
        {credintials?.role === "Admin" && (Today_lessons.length > 0 && !isHourClicked) && Today_lessons.map((lesson: TLesson) => {
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
        {(lessonsForClickedHour && lessonsForClickedHour.length > 0 && isHourClicked) && lessonsForClickedHour?.map((lesson: THourLesson) => {
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