import { Dispatch, ReactNode, SetStateAction } from "react";
import styles from './welcomeSection.module.css'
import { useAppSelector } from "@/store/hooks.ts";
import Calendar from "@/components/calendar/Calendar.tsx";

const {welcome_section, welcome_section__title, welcome_section__info, welcome_section__desc, welcome_section__img} = styles;

type TWelcomeSectionProps = {
  img: ReactNode;
  text: string;
  imgWidth: string;
  setIsHourClicked?: Dispatch<SetStateAction<boolean>>;
}

const WelcomeSection = ({img, text, imgWidth, setIsHourClicked}: TWelcomeSectionProps) => {

  const {user} = useAppSelector(state => state.profile)


  return (
    <section className={welcome_section}>
      <section className={welcome_section__info}>
        <div>
          <h1 className={welcome_section__title}>أهلاً بك, يا {user?.first_name}</h1>
          <p className={welcome_section__desc}>{text}</p>
        </div>
        <div className={welcome_section__img} style={{width:`${imgWidth}px`}}>
          {img}
        </div>
      </section>

      {user?.user_type === 'Admin' && <Calendar setIsHourClicked={setIsHourClicked} /> }
      {user?.user_type !== 'Admin' && <Calendar /> }

    </section>
  )
}

export default WelcomeSection