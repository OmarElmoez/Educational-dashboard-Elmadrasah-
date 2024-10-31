import { NavLink, useLocation } from "react-router-dom";

import Logo from "@/assets/logo.png";
// import CloseArrow from "@/assets/closeArrow.svg?react";
// import OpenArrow from "@/assets/openArrow.svg?react";

import styles from "./MainSidebar.module.css";
import { TPath } from "@/types/shared";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useFirebaseMessaging, useResponsive } from "@/hooks";
import {
  PH_helpIcon,
  PH_settingsIcon,
  SettingsIcon,
  HelpIcon,
  SignoutIcon,
  PH_signoutIcon,
} from "@/assets/nav-icons";
import { logout } from "@/store/auth/authSlice";
import { removeProfile } from "@/store/profile/ProfileSlice";
// import { SidebarContext } from "@/store/context/SidebarContext";
import actFCMLogout from "@/store/FCM/act/actFCMLogout";

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
  // open,
  collapse_menu,
  active_collapse_menu,
  collapse_menu_icon,
  main_nav_menu,
  main_nav_menu_footer,
  main_menu,
  support,
  active_link,
  main_menu_title,
  mini_nav_link,
  navList_item,

} = styles;
const MainSidebar = ({ data }: TSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // const [expanded, setExpanded] = useState(true);
  const [expanded, setExpanded] = useState<{
    isExpanded: boolean;
    index: number | null;
  }>({
    isExpanded: false,
    index: null,
  });

  const { isPhone } = useResponsive();

  const { user } = useAppSelector((state) => state.profile);
  const { credintials } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  // const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  const { fcmToken } = useFirebaseMessaging();

  const signoutHandler = () => {
    dispatch(removeProfile());
    dispatch(logout());
    if (fcmToken) {
      dispatch(
        actFCMLogout({ token: credintials?.token, FCM_token: fcmToken })
      );
    }
  };

  // const closeSidebar = () => {
  //   console.log("isSidebarOpen", isSidebarOpen);

  //   setIsSidebarOpen(false);
  // };

  return (
    <aside
      className={`${sidebar} `}
      style={
        isPhone
          ? undefined
          : {
              width: expanded.isExpanded ? "265px" : "100px",
              transition: "0.3s",
            }
      }
    >
      {isPhone && (
        <>
          <div className={avatarBox}>
            <img src={user?.image} alt="avatar" />
          </div>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            {user?.first_name} {user?.last_name}
          </p>
        </>
      )}

      <nav className={main_nav_menu}>
        <menu className={main_menu}>
          <li>
            <NavLink to="/" end replace title="home">
              <img src={Logo} alt="logo" className={logo} />
            </NavLink>
          </li>
          {data.map(({ title, path, icon, phone_icon, children }, index) => (
            <li
              key={title}
              onClick={() => {
                if (children && children.length) {
                  setExpanded({
                    isExpanded: !expanded.isExpanded,
                    index: index,
                  });
                } else {
                  setExpanded({
                    isExpanded: false,
                    index: null,
                  });
                }
              }}
            >
              {!children ? (
                <NavLink
                  to={path}
                  end
                  replace
                  className={({ isActive }) => (isActive ? "" : "")}
                  title={title}
                >
                  {path === "admin" && currentPath.includes(path) ? (
                    <div className={`${active_link} icon`}>
                      {isPhone ? phone_icon : icon}
                    </div>
                  ) : (
                    <div
                      className={
                       ( path === "/admin" && currentPath.endsWith(path))
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

                  <menu
                    className={`${collapse_menu} ${
                      expanded.isExpanded && expanded.index === index
                        ? active_collapse_menu
                        : ""
                    }`}
                  >
                    <p>{title}</p>
                    {children?.map(({ title, path, icon, phone_icon }) => (
                      <li key={title}>
                        <NavLink
                          to={path}
                          end
                          replace
                          className={({ isActive }) =>
                            isActive
                              ? `${active_link} ${mini_nav_link}`
                              : mini_nav_link
                          }
                          title={title}
                        >
                          <div className={`${collapse_menu_icon} icon`}>
                            {isPhone ? phone_icon : icon}
                          </div>

                          <span>{title}</span>
                        </NavLink>
                      </li>
                    ))}
                  </menu>
                </div>
              )}
            </li>
          ))}
        </menu>
      </nav>
      {/* settings menue */}
      <nav className={main_nav_menu_footer}>
        <menu className={main_menu}>
          <p className={support}>الدعم</p>
          <li>
            <NavLink to="settings">
              {isPhone ? <PH_settingsIcon /> : <SettingsIcon />}
            </NavLink>
          </li>
          <li>
            <NavLink to="help">
              {isPhone ? <PH_helpIcon /> : <HelpIcon />}
            </NavLink>
          </li>
          <li>
            <div className={signout} onClick={signoutHandler}>
              <div className="icon">
                {isPhone ? <PH_signoutIcon /> : <SignoutIcon />}
              </div>
            </div>
          </li>
        </menu>
      </nav>
    </aside>
  );
};

export default MainSidebar;
