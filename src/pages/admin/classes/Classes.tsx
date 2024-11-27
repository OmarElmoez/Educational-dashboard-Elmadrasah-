import {ClassesForDay, ScheduleForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/calendar-img.svg?react'
import styles from './classes.module.css'
import Calendar from "@/components/new-calendar/Calendar.tsx";

const {welcome_paragraph, calendar_wrapper} = styles;

const AdminClassesPage = () => {
  return (
    <>
      <WelcomeSection img={<CalendarImg/>}>
        <p className={welcome_paragraph}>نأمل لك يوم عمل سعيد</p>
      </WelcomeSection>

      <section className={calendar_wrapper}>
        <Calendar />
        <ScheduleForDay />
      </section>

      <ClassesForDay />
    </>
  );
};

export default AdminClassesPage;