import { ClassesForDay, WelcomeSection } from "@/components";
import CalendarImg from '@/assets/family-calendar-img.svg?react'
import {useAppDispatch} from "@/store/hooks.ts";
import {useEffect} from "react";
import actGetLessonsByMonth from "@/store/lessons/act/actGetLessonsByMonth.ts";

const Classes = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actGetLessonsByMonth({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`}))
  }, [dispatch]);

  return (
    <>
      <WelcomeSection img={<CalendarImg/>} imgWidth="400" text="هنا يمكنك متابعة تقدم أطفالك في دراستهم بكل سهولة وفعالية في لوحة تحكم ولي الأمر" />

      <ClassesForDay/>
    </>
  )
}

export default Classes;