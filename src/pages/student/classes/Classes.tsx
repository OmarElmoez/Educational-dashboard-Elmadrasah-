import {ClassesForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/student-calendar-img.svg?react'
// import Calendar from "@/components/calendar/Calendar.tsx";
// import {TTab} from "@/components/tabs/Tabs.tsx";
// import {AllHours, CurrentHour, Teachers} from "@/components/tabs/sub-components";


// const STUDENT_TABS: TTab[] = [
//   {
//     id: 0,
//     label: "الساعة الحالية",
//     content: CurrentHour,
//   },
//   {
//     id: 1,
//     label: "المعلمين",
//     content: Teachers,
//   },
//   {
//     id: 2,
//     label: "جميع الساعات",
//     content: AllHours,
//   }
// ]

const Classes = () => {
  return (
    <>
      <WelcomeSection img={<CalendarImg/>} imgWidth="500" text="لقد افتقدناك، تحقق من كل ما هو جديد ومُحسَّن في لوحة التحكم الخاصة بك" />

      <ClassesForDay/>
    </>
  )
}

export default Classes;