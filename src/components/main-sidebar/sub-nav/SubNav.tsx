import {CSSProperties, Dispatch, ReactNode, SetStateAction} from "react";
import styles from './subNav.module.css'
import {NavLink} from "react-router-dom";

const {sub_nav, sub_nav__link} = styles;

type TSubLink = {
  title: string;
  path: string;
  icon: ReactNode;
  phone_icon?: ReactNode;
}

const SubNav = ({style, subLinks, mainTitle, setIsSubNavOpen}: {
  style?: CSSProperties,
  subLinks: TSubLink[] | undefined,
  mainTitle: string,
  setIsSubNavOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <nav className={sub_nav} style={style}>
      <h2>{mainTitle}</h2>
      <menu>
        {subLinks?.map((link) => (
          <NavLink to={link.path} key={link.title} className={sub_nav__link} onClick={() => setIsSubNavOpen(false)}>
            {link.icon}
            <span>{link.title}</span>
          </NavLink>
        ))}
      </menu>
    </nav>
  )
}

export default SubNav;