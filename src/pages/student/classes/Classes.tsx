import {ClassesForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/student-calendar-img.svg?react'

const Classes = () => {
  return (
    <>
      <WelcomeSection img={<CalendarImg/>} imgWidth="400" text="لقد افتقدناك، تحقق من كل ما هو جديد ومُحسَّن في لوحة التحكم الخاصة بك" />

      <ClassesForDay/>
    </>
  )
}

export default Classes;