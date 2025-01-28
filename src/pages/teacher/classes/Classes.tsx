import {ClassesForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/teacher-calendar-img.svg?react'

const TeacherClassesPage = () => {
  return (
    <>
      <WelcomeSection img={<CalendarImg/>} imgWidth="300" text="سعداء بوجودك كمعلم معنا و نقدر مجهودك مع الطلاب." />

      <ClassesForDay/>
    </>
  )
}

export default TeacherClassesPage