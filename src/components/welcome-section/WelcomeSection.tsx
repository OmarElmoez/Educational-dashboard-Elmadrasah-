import { ReactNode } from "react";
import styles from './welcomeSection.module.css'
import { useAppSelector } from "@/store/hooks.ts";
import Calendar from "@/components/calendar/Calendar.tsx";

const {welcome_section, welcome_section__title, welcome_section__info, welcome_section__desc} = styles;

type TWelcomeSectionProps = {
  img: ReactNode;
  text: string;
}

const WelcomeSection = ({img, text}: TWelcomeSectionProps) => {

  const {user} = useAppSelector(state => state.profile)


  return (
    <section className={welcome_section}>
      <section className={welcome_section__info}>
        <div>
          <h1 className={welcome_section__title}>أهلاً بك, يا {user?.first_name}</h1>
          <p className={welcome_section__desc}>{text}</p>
        </div>
        <div style={{display: "flex", alignSelf: "flex-end"}}>
          {img}
        </div>
      </section>

      <Calendar />

    </section>
  )
}

export default WelcomeSection