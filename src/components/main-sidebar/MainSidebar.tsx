import { NavLink } from "react-router-dom";

import Logo from "@/assets/logo.svg?react";
import CloseArrow from "@/assets/closeArrow.svg?react";
import OpenArrow from "@/assets/openArrow.svg?react";

import styles from "./MainSidebar.module.css";
import { TPath } from "@/types/shared";
import { useContext, useState } from "react";
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
import { SidebarContext } from "@/store/context/SidebarContext";
import actFCMLogout from "@/store/FCM/act/actFCMLogout";

type TSidebarProps = {
  data: TPath[];
};

const { sidebar, logo, arrow, collapse, avatarBox, signout, open } = styles;
const MainSidebar = ({ data }: TSidebarProps) => {
  const [expanded, setExpanded] = useState(true);

  const { isPhone } = useResponsive();

  const { user } = useAppSelector((state) => state.profile);
  const { user: authUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  const { fcmToken } = useFirebaseMessaging();

  const signoutHandler = () => {
    dispatch(logout());
    dispatch(removeProfile());
    if (fcmToken) {
      dispatch(
        actFCMLogout({ user_token: authUser?.token, FCM_token: fcmToken })
      );
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <aside
      className={`${sidebar} ${isSidebarOpen ? open : ""}`}
      style={
        isPhone
          ? undefined
          : { width: expanded ? "250px" : "85px", transition: "0.3s" }
      }
    >
      {isPhone ? (
        <>
          <div className={avatarBox}>
            <img src={user?.image} alt="avatar" />
          </div>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            {user?.first_name} {user?.last_name}
          </p>
        </>
      ) : (
        <Logo className={logo} style={{ width: expanded ? "auto" : "70px" }} />
      )}

      <nav>
        <div className={arrow} onClick={() => setExpanded(!expanded)}>
          {expanded ? <CloseArrow /> : <OpenArrow />}
        </div>
        <menu>
          {data.map(({ title, path, icon, phone_icon }) => (
            <li key={title} onClick={closeSidebar}>
              <NavLink
                to={path}
                end
                replace
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <div className="icon">{isPhone ? phone_icon : icon}</div>
                {/* To prioritize the opacity transition, we apply it here first. */}
                <span
                  className={expanded ? "" : collapse}
                  style={{ opacity: expanded ? "1" : "0" }}
                >
                  {title}
                </span>
              </NavLink>
            </li>
          ))}
        </menu>
        <menu>
          <li onClick={closeSidebar}>
            <NavLink to="settings">
              {isPhone ? <PH_settingsIcon /> : <SettingsIcon />}
              <span
                className={expanded ? "" : collapse}
                style={{ opacity: expanded ? "1" : "0" }}
              >
                الاعدادات
              </span>
            </NavLink>
          </li>
          <li onClick={closeSidebar}>
            <NavLink to="help">
              {isPhone ? <PH_helpIcon /> : <HelpIcon />}
              <span
                className={expanded ? "" : collapse}
                style={{ opacity: expanded ? "1" : "0" }}
              >
                طلب مساعدة
              </span>
            </NavLink>
          </li>
        </menu>
        <div className={signout} onClick={signoutHandler}>
          <div className="icon">
            {isPhone ? <PH_signoutIcon /> : <SignoutIcon />}
          </div>
          <span
            className={expanded ? "" : collapse}
            style={{ opacity: expanded ? "1" : "0" }}
          >
            تسجيل الخروج
          </span>
        </div>
      </nav>
    </aside>
  );
};

export default MainSidebar;
