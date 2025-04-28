import { CSSProperties, Dispatch, ReactNode, SetStateAction, useContext } from "react";
import styles from './subNav.module.css'
import {NavLink} from "react-router-dom";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import { useOutsideClick } from "@/hooks";

const {sub_nav, sub_nav__link} = styles;

export type TSubLink = {
  title: string;
  path: string;
  icon: ReactNode;
  phone_icon?: ReactNode;
  page_title?: string;
}

const SubNav = ({style, subLinks, setIsSubNavOpen}: {
  style?: CSSProperties,
  subLinks: TSubLink[] | undefined,
  setIsSubNavOpen: Dispatch<SetStateAction<boolean>>
}) => {

  const {setHeaderTitle} = useContext(CalendarContext)

  const subNavRef = useOutsideClick(() => setIsSubNavOpen(false))

  return (
    <nav className={sub_nav} style={style} onClick={() => setIsSubNavOpen(false)} ref={subNavRef}>
      <menu>
        {subLinks?.map((link) => (
          <NavLink to={link.path} key={link.title} className={sub_nav__link} onClick={() => {
            setIsSubNavOpen(false)
            link.page_title && setHeaderTitle(link.page_title)
            link.page_title && localStorage.setItem('headerTitle', link.page_title)
            localStorage.setItem('activatedPath', link.path)
          }}>
            {link.icon}
            <span>{link.title}</span>
          </NavLink>
        ))}
      </menu>
    </nav>
  )
}

export default SubNav;