import {ClassesForDay, ProgressCircle, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/student-calendar-img.svg?react'
import styles from './classes.module.css';

const {welcome_info, welcome_text} = styles;

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

      <ClassesForDay />
    </>
)
}

export default Classes;