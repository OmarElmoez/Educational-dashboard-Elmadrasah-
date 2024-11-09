/* TODO:
*   Props:
*     1- img as a component
*     2- children*/


import {ReactNode} from "react";
import styles from './welcomeSection.module.css'
import {useAppSelector} from "@/store/hooks.ts";

const { welcome_section, welcome_section__title } = styles;

type TWelcomeSectionProps = {
  children: ReactNode;
  img: ReactNode;
}

const WelcomeSection = ({ children, img }: TWelcomeSectionProps) => {

  const { user } = useAppSelector(state => state.profile)

  console.log('from welcome section user: ', user)

  return (
    <section className={welcome_section}>
      <section>
        <h1 className={welcome_section__title}>أهلا بك يا { user?.first_name } !</h1>
        {children}
      </section>

      <div style={{ display: "flex" }}>
        {img}
      </div>
    </section>
  )
}

export default WelcomeSection