import {ProgressCircle, WelcomeSection} from "@/components";
import CalendarImg from '@/assets/family-calendar-img.svg?react'
import styles from "./classes.module.css";

const {info, welcome_text} = styles;

const Classes = () => {
  return (<WelcomeSection img={<CalendarImg/>}>
    <section className={info}>
      <ProgressCircle/>
      <div className={welcome_text}>
        <p>ابنائك يقدموا مستوي</p>
        <p>رائع 🥳</p>
      </div>
    </section>
  </WelcomeSection>)
}

export default Classes;