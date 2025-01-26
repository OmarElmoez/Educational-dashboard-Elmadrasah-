import {ClassesForDay, ScheduleForDay} from "@/components";

import Calendar from "@/components/calendar/Calendar.tsx";
import {TTab} from "@/components/tabs/Tabs.tsx";
import {AllHours, CurrentHour, Overview} from "@/components/tabs/sub-components";
import { useState } from "react";
import { THourLesson } from "@/components/tabs/sub-components/all-hours/AllHours.tsx";

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
      <section className='calendar_wrapper'>
        <Calendar setIsHourClicked={setIsHourClicked} />
        <ScheduleForDay tabs={ADMIN_TABS} />
      </section>

      <ClassesForDay lessonsForClickedHour={lessonsForClickedHour} isHourClicked={isHourClicked} />
    </>
  );
};

export default AdminClassesPage;