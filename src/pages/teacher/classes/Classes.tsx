import {ClassesForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/teacher-calendar-img.svg?react'
import { useAppDispatch } from "@/store/hooks.ts";
import { useEffect } from "react";
import actGetLessonsByMonth from "@/store/lessons/act/actGetLessonsByMonth.ts";

const TeacherClassesPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actGetLessonsByMonth({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`}))
  }, [dispatch]);
  return (
    <>
      <WelcomeSection img={<CalendarImg/>} imgWidth="300" text="سعداء بوجودك كمعلم معنا و نقدر مجهودك مع الطلاب." />

      <ClassesForDay/>
    </>
  )
}

export default TeacherClassesPage