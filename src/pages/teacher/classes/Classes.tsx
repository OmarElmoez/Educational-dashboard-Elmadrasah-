import {ClassesForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/teacher-calendar-img.svg?react'
// import {TTab} from "@/components/tabs/Tabs.tsx";
// import {AllHours, CurrentHour, Students} from "@/components/tabs/sub-components";

// const TEACHER_TABS: TTab[] = [
//   {
//     id: 0,
//     label: "الساعة الحالية",
//     content: CurrentHour,
//   },
//   {
//     id: 1,
//     label: "طلابك",
//     content: Students,
//   },
//   {
//     id: 2,
//     label: "جميع الساعات",
//     content: AllHours,
//   }
// ]

const TeacherClassesPage = () => {
  return (
    <>
      <WelcomeSection img={<CalendarImg/>} text="سعداء بوجودك كمعلم معنا و نقدر مجهودك مع الطلاب." />

      <ClassesForDay/>
    </>
  )
}

export default TeacherClassesPage