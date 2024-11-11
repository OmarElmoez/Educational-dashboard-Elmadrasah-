import {ClassesForDay, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/teacher-calendar-img.svg?react'
import styles from './classes.module.css';

const {
  first_text,
  second_text
} = styles;

const TeacherClassesPage = () => {
  return (
    <>
      <WelcomeSection img={<CalendarImg/>}>
        <p className={first_text}>لقد قام طلابك بتنفيذ 80% من واجباتهم</p>
        <p className={second_text}>مجهود رائع 🥳</p>
      </WelcomeSection>

      <ClassesForDay />
    </>
    )
}

export default TeacherClassesPage