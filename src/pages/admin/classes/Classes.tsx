import {ClassesForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/calendar-img.svg?react'
import styles from './classes.module.css'

const {welcome_paragraph} = styles;

const AdminClassesPage = () => {
  return (
    <>
      <WelcomeSection img={<CalendarImg/>}>
        <p className={welcome_paragraph}>نأمل لك يوم عمل سعيد</p>
      </WelcomeSection>

      <ClassesForDay />
    </>
  );
};

export default AdminClassesPage;