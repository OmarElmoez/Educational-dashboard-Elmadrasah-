import {NavLink, useLocation} from "react-router-dom";

import Logo from "@/assets/logo.png";
// import CloseArrow from "@/assets/closeArrow.svg?react";
// import OpenArrow from "@/assets/openArrow.svg?react";
import styles from "./MainSidebar.module.css";
import {TPath} from "@/types/shared";
import {useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useFirebaseMessaging, useResponsive} from "@/hooks";
import {HelpIcon, PH_helpIcon, PH_settingsIcon, PH_signoutIcon, SettingsIcon, SignoutIcon,} from "@/assets/nav-icons";
import {logout} from "@/store/auth/authSlice";
import {removeProfile} from "@/store/profile/ProfileSlice";
// import { SidebarContext } from "@/store/context/SidebarContext";
import actFCMLogout from "@/store/FCM/act/actFCMLogout";
import SubNav from "@/components/main-sidebar/sub-nav/SubNav.tsx";
import SIDEBAR_DATA from "../../constants/sidebar-data.tsx";

type TSidebarProps = {
  data: TPath[];
};

const {
  sidebar,
  logo,
  // arrow,
  // collapse,
  avatarBox,
  signout,
  main_nav_menu,
  // main_nav_menu_footer,
  main_menu,
  support,
  active_link,
  main_menu_title,
  navList_item,
} = styles;
const MainSidebar = ({data}: TSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;


  const {isPhone} = useResponsive();

  const {user} = useAppSelector((state) => state.profile);
  const {credintials} = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  // const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  const [isSubNavOpen, setIsSubNavOpen] = useState(false)

  const [activeLinkTitle, setActiveLinkTitle] = useState("")

  const {fcmToken} = useFirebaseMessaging();

  const signoutHandler = () => {
    dispatch(removeProfile());
    dispatch(logout());
    if (fcmToken) {
      dispatch(
        actFCMLogout({token: credintials?.token, FCM_token: fcmToken})
      );
    }
  };

  // const closeSidebar = () => {
  //   console.log("isSidebarOpen", isSidebarOpen);

  //   setIsSidebarOpen(false);
  // };

  const activeTitleSubLinks = SIDEBAR_DATA['Admin'].find(obj => obj.title === activeLinkTitle)?.children


  const handleToggle = useCallback(() => {
    setIsSubNavOpen((prevState) => !prevState)

    setTimeout(() => {
      setIsSubNavOpen(true)
    }, 350)
  }, [])

  return (
    <>
      <SubNav mainTitle={activeLinkTitle}
              style={(isSubNavOpen && activeTitleSubLinks?.length !== undefined) ? {transform: "translateX(-80px)", zIndex: 4} : {
                transform: "translateX(100%)",
                zIndex: -1
              }}
              subLinks={activeTitleSubLinks}
              setIsSubNavOpen={setIsSubNavOpen}
      />
      <aside
        className={`${sidebar} `}
      >
        {isPhone && (
          <>
            <div className={avatarBox}>
              <img src={user?.image} alt="avatar"/>
            </div>
            <p style={{textAlign: "center", marginTop: "1rem"}}>
              {user?.first_name} {user?.last_name}
            </p>
          </>
        )}

        <NavLink to="/" end replace title="home">
          <img src={Logo} alt="logo" className={logo}/>
        </NavLink>

        <nav className={main_nav_menu}>
          <menu className={main_menu}>
            {data.map(({title, path, icon, phone_icon, children}) => (
              <li
                key={title}
                onClick={() => {
                  // if (children && children.length) {
                  //   setExpanded({
                  //     isExpanded: !expanded.isExpanded,
                  //     index: index,
                  //   });
                  // } else {
                  //   setExpanded({
                  //     isExpanded: false,
                  //     index: null,
                  //   });
                  // }
                  setActiveLinkTitle(title);
                  handleToggle()
                }}
              >
                {!children ? (
                  <NavLink
                    to={path}
                    end
                    replace
                    className={({isActive}) => (isActive ? "" : "")}
                    title={title}
                  >
                    {path === "admin" && currentPath.includes(path) ? (
                      <div className={`${active_link} icon`}>
                        {isPhone ? phone_icon : icon}
                      </div>
                    ) : (
                      <div
                        className={
                          (path === "/admin" && currentPath.endsWith(path))
                            ? `${active_link} icon`
                            : (path !== "/admin" && currentPath.includes(path))
                              ? `${active_link} icon`
                              : "icon"
                        }
                      >
                        {isPhone ? phone_icon : icon}
                      </div>
                    )}
                    <p className={main_menu_title}>{title}</p>
                  </NavLink>
                ) : (
                  <div className={navList_item} title={title}>
                    <div
                      className={
                        path !== "/admin" && currentPath.includes(path)
                          ? `${active_link} icon`
                          : "icon"
                      }
                    >
                      {isPhone ? phone_icon : icon}
                    </div>
                    <p className={main_menu_title}>{title}</p>
                    {/* new style for sub nav */}

                    {/*<menu*/}
                    {/*  className={`${collapse_menu} ${*/}
                    {/*    expanded.isExpanded && expanded.index === index*/}
                    {/*      ? active_collapse_menu*/}
                    {/*      : ""*/}
                    {/*  }`}*/}
                    {/*>*/}
                    {/*  <p>{title}</p>*/}
                    {/*  {children?.map(({title, path, icon, phone_icon}) => (*/}
                    {/*    <li key={title}>*/}
                    {/*      <NavLink*/}
                    {/*        to={path}*/}
                    {/*        end*/}
                    {/*        replace*/}
                    {/*        className={({isActive}) =>*/}
                    {/*          isActive*/}
                    {/*            ? `${active_link} ${mini_nav_link}`*/}
                    {/*            : mini_nav_link*/}
                    {/*        }*/}
                    {/*        title={title}*/}
                    {/*      >*/}
                    {/*        <div className={`${collapse_menu_icon} icon`}>*/}
                    {/*          {isPhone ? phone_icon : icon}*/}
                    {/*        </div>*/}

                    {/*        <span>{title}</span>*/}
                    {/*      </NavLink>*/}
                    {/*    </li>*/}
                    {/*  ))}*/}
                    {/*</menu>*/}
                  </div>
                )}
              </li>
            ))}
          </menu>
          <menu className={main_menu}>
            <p className={support}>الدعم</p>
            <li>
              <NavLink to="settings">
                {isPhone ? <PH_settingsIcon/> : <SettingsIcon/>}
              </NavLink>
            </li>
            <li>
              <NavLink to="help">
                {isPhone ? <PH_helpIcon/> : <HelpIcon/>}
              </NavLink>
            </li>
            <li>
              <div className={signout} onClick={signoutHandler}>
                <div className="icon">
                  {isPhone ? <PH_signoutIcon/> : <SignoutIcon/>}
                </div>
              </div>
            </li>
          </menu>
        </nav>
      </aside>
    </>
  );
};

export default MainSidebar;
