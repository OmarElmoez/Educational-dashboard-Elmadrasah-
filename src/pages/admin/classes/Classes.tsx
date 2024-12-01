import {ClassesForDay, ScheduleForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/calendar-img.svg?react'
import styles from './classes.module.css'
import Calendar from "@/components/calendar/Calendar.tsx";
import {TTab} from "@/components/tabs/Tabs.tsx";
import {AllHours, CurrentHour, Overview} from "@/components/tabs/sub-components";

const {welcome_paragraph} = styles;

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
  }
]

const AdminClassesPage = () => {

  
  return (
    <>
      <WelcomeSection img={<CalendarImg/>}>
        <p className={welcome_paragraph}>نأمل لك يوم عمل سعيد</p>
      </WelcomeSection>

      <section className='calendar_wrapper'>
        <Calendar />
        <ScheduleForDay tabs={ADMIN_TABS} />
      </section>

      <ClassesForDay />
    </>
  );
};

export default AdminClassesPage;