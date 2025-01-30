import { ClassesForDay, ScheduleForDay, WelcomeSection } from "@/components";

import {TTab} from "@/components/tabs/Tabs.tsx";
import {AllHours, CurrentHour, Overview} from "@/components/tabs/sub-components";
import { useState } from "react";
import { THourLesson } from "@/components/tabs/sub-components/all-hours/AllHours.tsx";
import CalendarImg from '@/assets/admin-calendar-img.svg?react'

const AdminClassesPage = () => {

  const [lessonsForClickedHour, setLessonsForClickedHour] = useState<THourLesson[]>([])

  const [isHourClicked, setIsHourClicked] = useState(false);

  const ADMIN_TABS: TTab[] = [
    {
      id: 0,
      label: "الساعة الحالية",
      content: CurrentHour,
    },
    {
      id: 1,
      label: "نظرة عامة",
      content: Overview,
    },
    {
      id: 2,
      label: "جميع الساعات",
      content: AllHours,
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