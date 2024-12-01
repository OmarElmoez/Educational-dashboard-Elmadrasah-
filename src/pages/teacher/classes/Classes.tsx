import {ClassesForDay, ScheduleForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/teacher-calendar-img.svg?react'
import styles from './classes.module.css';
import Calendar from "@/components/calendar/Calendar.tsx";
import {TTab} from "@/components/tabs/Tabs.tsx";
import {AllHours, CurrentHour, Students} from "@/components/tabs/sub-components";

const {
  first_text,
  second_text
} = styles;

const TEACHER_TABS: TTab[] = [
  {
    id: 0,
    label: "الساعة الحالية",
    content: CurrentHour,
  },
  {
    id: 1,
    label: "طلابك",
    content: Students,
  },
  {
    id: 2,
    label: "جميع الساعات",
    content: AllHours,
  }
]

const TeacherClassesPage = () => {
  return (
    <>
      <WelcomeSection img={<CalendarImg/>}>
        <p className={first_text}>لقد قام طلابك بتنفيذ 80% من واجباتهم</p>
        <p className={second_text}>مجهود رائع 🥳</p>
      </WelcomeSection>

      <section className='calendar_wrapper'>
        <Calendar/>
        <ScheduleForDay tabs={TEACHER_TABS}/>
      </section>

      <ClassesForDay/>
    </>
  )
}

export default TeacherClassesPage