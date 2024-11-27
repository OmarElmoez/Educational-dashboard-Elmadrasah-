import {ClassesForDay, ProgressCircle, ScheduleForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/student-calendar-img.svg?react'
import styles from './classes.module.css';
import Calendar from "@/components/new-calendar/Calendar.tsx";
import {TTab} from "@/components/tabs/Tabs.tsx";
import {AllHours, CurrentHour, Teachers} from "@/components/tabs/sub-components";

const {welcome_info, welcome_text} = styles;

const STUDENT_TABS: TTab[] = [
  {
    id: 0,
    label: "الساعة الحالية",
    content: CurrentHour,
  },
  {
    id: 1,
    label: "المعلمين",
    content: Teachers,
  },
  {
    id: 2,
    label: "جميع الساعات",
    content: AllHours,
  }
]

const Classes = () => {
  return (
    <>
      <WelcomeSection img={<CalendarImg/>}>
        <section className={welcome_info}>
          <ProgressCircle/>
          <div className={welcome_text}>
            <p>مستواك في تقدم</p>
            <p>رائع 🥳</p>
          </div>
        </section>
      </WelcomeSection>

      <section className='calendar_wrapper'>
        <Calendar/>
        <ScheduleForDay tabs={STUDENT_TABS}/>
      </section>

      <ClassesForDay/>
    </>
  )
}

export default Classes;