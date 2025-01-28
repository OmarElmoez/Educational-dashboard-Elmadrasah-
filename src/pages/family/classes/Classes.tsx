import { ClassesForDay, WelcomeSection } from "@/components";
import CalendarImg from '@/assets/family-calendar-img.svg?react'
// import {AllHours, CurrentHour, Teachers} from "@/components/tabs/sub-components";
// import {TTab} from "@/components/tabs/Tabs.tsx";
import {useAppDispatch} from "@/store/hooks.ts";
import {useEffect} from "react";
import actGetLessonsByDay from "@/store/lessons/act/actGetLessonsByDay.ts";

// const FAMILY_TABS: TTab[] = [
//   {
//     id: 0,
//     label: "الساعة الحالية",
//     content: CurrentHour,
//   },
//   {
//     id: 1,
//     label: "المٌعلمين",
//     content: Teachers,
//   },
//   {
//     id: 2,
//     label: "جميع الساعات",
//     content: AllHours,
//   }
// ]

const Classes = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actGetLessonsByDay({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`}))
  }, [dispatch]);

  return (
    <>
      <WelcomeSection img={<CalendarImg/>} imgWidth="400" text="هنا يمكنك متابعة تقدم أطفالك في دراستهم بكل سهولة وفعالية في لوحة تحكم ولي الأمر" />

      <ClassesForDay/>
    </>
  )
}

export default Classes;