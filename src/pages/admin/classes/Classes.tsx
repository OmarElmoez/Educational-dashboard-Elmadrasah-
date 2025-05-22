import { ClassesForDay, ScheduleForDay, WelcomeSection } from "@/components";

import {TTab} from "@/components/tabs/Tabs.tsx";
import {AllHours, CurrentHour, Overview} from "@/components/tabs/sub-components";
import { useContext, useState } from "react";
import CalendarImg from '@/assets/admin-calendar-img.svg?react'
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
// import { TLesson } from "@/schemas/LessonSchema.ts";
import { useAppDispatch } from "@/store/hooks.ts";
import { resetTodayLessons } from "@/store/lessons/LessonsSlice.ts";
import { clearAllHoursData, THourLesson } from "@/store/tabs/TabsSlice.ts";

const AdminClassesPage = () => {

  const [lessonsForClickedHour, setLessonsForClickedHour] = useState<THourLesson[]>([])

  // const [currentHourLessons, setCurrentHourLessons] = useState<TLesson[]>([])

  const dispatch = useAppDispatch();

  const [isHourClicked, setIsHourClicked] = useState(false);

  const {setClickedDate} = useContext(CalendarContext);

  const resetDateAndLessons = () => {
    setClickedDate(new Date());
    dispatch(resetTodayLessons());
    dispatch(clearAllHoursData());
  }

  const ADMIN_TABS: TTab[] = [
    {
      id: 0,
      label: "الساعة الحالية",
      content: CurrentHour,
      page: "classes",
      handleTabClick: resetDateAndLessons,
    },
    {
      id: 1,
      label: "نظرة عامة",
      page: "classes",
      content: Overview,
    },
    {
      id: 2,
      label: "جميع الساعات",
      content: AllHours,
      page: "classes",
      contentProps: {
        setLessonsForClickedHour,
        setIsHourClicked,
      }
    }
  ]

  return (
    <>
      <WelcomeSection img={<CalendarImg/>} imgWidth="370" text="نأمل لك يوم عمل سعيد مع المدرسة . كوم" setIsHourClicked={setIsHourClicked} />
      <ScheduleForDay tabs={ADMIN_TABS} />
      <ClassesForDay lessonsForClickedHour={lessonsForClickedHour} isHourClicked={isHourClicked} />
    </>
  );
};

export default AdminClassesPage;