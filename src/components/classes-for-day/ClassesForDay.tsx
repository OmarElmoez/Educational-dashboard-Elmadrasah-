import styles from './classesForDay.module.css'
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";

import { TLesson } from "@/schemas/LessonSchema.ts";

import { LessonCard, LoadingIndicator } from "@/components";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import actGetLessonsByMonth from "@/store/lessons/act/actGetLessonsByMonth.ts";
import { THourLesson } from "@/components/tabs/sub-components/all-hours/AllHours.tsx";
import { format } from "date-fns";
import { ar } from 'date-fns/locale';
import actGetLessonsByDay from "@/store/lessons/act/actGetLessonsByDay.ts";

const {title, lessons_cards, kids_names} = styles;

type TChild = { id: number, first_name: string, last_name: string }

const ClassesForDay = ({lessonsForClickedHour, isHourClicked, currentHourLessons}: {
  lessonsForClickedHour?: THourLesson[],
  isHourClicked?: boolean,
  currentHourLessons?: TLesson[]
}) => {

  const {Today_lessons, Month_lessons, loading} = useAppSelector(state => state.lessons);

  const dispatch = useAppDispatch();

  const {credintials} = useAppSelector(state => state.auth);

  const {statistics} = useAppSelector(state => state.profile)

  const {clickedDate, setStudentId, activeId} = useContext(CalendarContext);
  const arabicDate = format(clickedDate, "d MMMM yyyy", {locale: ar})

  const filteredLessons = Month_lessons.filter(lesson => {
    return clickedDate.setHours(0, 0, 0, 0) === new Date(lesson.from_date).setHours(0, 0, 0, 0);
  })

  const [activeTab, setActiveTab] = useState({
    idx: -1,
    name: "",
  })

  const onClickHandler = (idx: number, child: TChild) => {
    setActiveTab({idx, name: child.first_name})
    setStudentId(child.id)
    dispatch(
      actGetLessonsByMonth({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`, studentId: child.id}))
  }

  const clickAllHandler = (idx: number) => {
    setActiveTab({idx, name: ""})
    dispatch(actGetLessonsByMonth({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`}))
  }

  useEffect(() => {
    if (credintials?.role !== "Admin" && Month_lessons.length === 0) {
      dispatch(actGetLessonsByMonth({date: `${clickedDate.getMonth() + 1}-${clickedDate.getFullYear()}`}))
      return;
    }
    if (credintials?.role === "Admin" && Today_lessons.length === 0) {
      dispatch(actGetLessonsByDay(
        {day: `${clickedDate.getDate()}-${clickedDate.getMonth() + 1}-${clickedDate.getFullYear()}`}))
      return;
    }
  }, [Month_lessons.length, Today_lessons.length, clickedDate, credintials?.role, dispatch])

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
        {((credintials?.role === "Admin" ? Today_lessons.length === 0 : filteredLessons.length === 0) && !isHourClicked && loading !== "pending") &&
            <p className="error">ليس لديك حصص اليوم !</p>}
        {((credintials?.role === "Admin" && currentHourLessons && currentHourLessons.length === 0 && activeId === 0) && !isHourClicked && loading !== "pending") &&
            <p className="error">ليس لديك حصص هذه الساعة !</p>}
        {credintials?.role !== "Admin" && (filteredLessons.length > 0) && filteredLessons.map((lesson: TLesson) => {
          return (
            <LessonCard lesson={lesson} key={lesson.id}/>
          )
        })}
        {credintials?.role === "Admin" && ((Today_lessons.length > 0) && !isHourClicked && loading !== 'pending') && ((activeId === 0 && currentHourLessons) ? currentHourLessons : Today_lessons).map(
          (lesson: TLesson) => {
            return (
              <LessonCard lesson={lesson} key={lesson.id}/>
            )
          })}
        {(lessonsForClickedHour && lessonsForClickedHour.length > 0 && isHourClicked) && lessonsForClickedHour?.map(
          (lesson: THourLesson) => {
            return (
                <LessonCard lesson={lesson} key={lesson.id}/>
            )
          })}
      </section>
    </>
  )
}

export default ClassesForDay