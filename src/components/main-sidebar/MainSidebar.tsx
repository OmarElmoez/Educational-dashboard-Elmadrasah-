import { NavLink, useLocation } from "react-router-dom";

import Logo from "@/assets/logo.png";
import styles from "./MainSidebar.module.css";
import { TPath } from "@/types/shared";
import { useCallback, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useFirebaseMessaging } from "@/hooks";
import { HelpIcon, SettingsIcon, SignoutIcon, } from "@/assets/nav-icons";
import { logout } from "@/store/auth/authSlice";
import actFCMLogout from "@/store/FCM/act/actFCMLogout";
import SubNav from "@/components/main-sidebar/sub-nav/SubNav.tsx";
import SIDEBAR_DATA from "../../constants/sidebar-data.tsx";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import { resetMonthLessons, resetTodayLessons } from "@/store/lessons/LessonsSlice.ts";

type TSidebarProps = {
  data: TPath[];
};

const {
  sidebar,
  logo,
  main_nav_menu,
  main_menu,
  support,
  active_link,
  main_menu_title,
  navList_item,
  icon_style,
  logoutIcon
} = styles;
const MainSidebar = ({data}: TSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const {credintials} = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const {setHeaderTitle} = useContext(CalendarContext)


  const [isSubNavOpen, setIsSubNavOpen] = useState(false)

  const [activeLinkTitle, setActiveLinkTitle] = useState("")

  const {fcmToken} = useFirebaseMessaging();

  const signoutHandler = () => {
    dispatch(logout());
    dispatch(resetMonthLessons())
    dispatch(resetTodayLessons())
    if (fcmToken) {
      dispatch(
        actFCMLogout({token: credintials?.token, FCM_token: fcmToken})
      );
    }
  };

  const activeTitleSubLinks: TPath[] | undefined = SIDEBAR_DATA[`${credintials?.role}` as keyof typeof SIDEBAR_DATA].find(
    obj => obj.title === activeLinkTitle)?.children


  const handleToggle = useCallback(() => {
    setIsSubNavOpen((prevState) => !prevState)

    setTimeout(() => {
      setIsSubNavOpen(true)
    }, 350)
  }, [])

  return (
    <>
      <SubNav
        style={(isSubNavOpen && activeTitleSubLinks?.length !== undefined) ? {
          transform: "translateX(-80px)",
          zIndex: 4
        } : {
          transform: "translateX(100%)",
          zIndex: -1
        }}
        subLinks={activeTitleSubLinks}
        setIsSubNavOpen={setIsSubNavOpen}
      />
      <aside
        className={`${sidebar} `}
      >
        <NavLink to="/" end replace title="home">
          <img src={Logo} alt="logo" className={logo}/>
        </NavLink>

        <nav className={main_nav_menu}>
          <menu className={main_menu}>
            {data.map(({title, path, icon, children, page_title}) => (
              <li
                key={title}
                onClick={() => {
                  setActiveLinkTitle(title);
                  page_title && setHeaderTitle(page_title);
                  handleToggle();
                }}
              >
                {children === undefined ? (
                  <NavLink
                    to={path}
                    end
                    replace
                    className={({isActive}) => (isActive ? "" : "")}
                    title={title}
                  >
                    {path === "admin" && currentPath.includes(path) ? (
                      <div className={`${icon_style}`}>
                        {icon}
                      </div>
                    ) : (
                      <div
                        className={
                          (path === "admin" && currentPath.endsWith(path))
                            ? `${active_link} ${icon_style}`
                            : (path !== "admin" && currentPath.endsWith(path))
                              ? `${active_link} ${icon_style}` : (path !== "/admin" && currentPath.includes(
                                path)) ? `${active_link} ${icon_style}`
                                : `${icon_style}`
                        }
                      >
                        {icon}
                      </div>
                    )}
                    <p className={main_menu_title}>{title}</p>
                  </NavLink>
                ) : (
                  <div className={navList_item} title={title}>
                    <div
                      className={
                        path !== "admin" && currentPath.includes(path)
                          ? `${active_link} ${icon_style}`
                          : `${icon_style}`
                      }
                    >
                      {icon}
                    </div>
                    <p className={main_menu_title}>{title}</p>
                  </div>
                )}
              </li>
            ))}
          </menu>
          <menu className={main_menu}>
            <p className={support}>الدعم</p>
            <li>
              <NavLink to="settings" onClick={() => setHeaderTitle("اعدادات الحساب")}>
                <SettingsIcon/>
              </NavLink>
            </li>
            <li>
              <NavLink to="help" onClick={() => setHeaderTitle("المساعدة")}>
                <HelpIcon/>
              </NavLink>
            </li>
            <li onClick={signoutHandler} className={logoutIcon}>
              <SignoutIcon/>
            </li>
          </menu>
        </nav>
      </aside>
    </>
  );
};

export default MainSidebar;
