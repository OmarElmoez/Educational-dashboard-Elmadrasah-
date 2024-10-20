import styles from "./header.module.css";
import Logo from "@/assets/logo.svg?react";
import MenuIcon from "@/assets/menu.svg?react";
import Bell from "@/assets/BellOutline.svg?react";
import UserPhoto from "@/assets/profilePlaceholder.svg?react";
import { useResponsive } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useContext } from "react";
import { SidebarContext } from "@/store/context/SidebarContext";
import { useNavigate } from "react-router-dom";
import actGetNotifications from "@/store/notifications/act/actGetNotifications";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

const {
  header,
  wrapper,
  box,
  btn,
  badge,
  menuIcon,
  userPhoto,
  notifications,
  bell,
} = styles;
const Header = () => {
  const { setIsSidebarOpen } = useContext(SidebarContext);

  const { isPhone } = useResponsive();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.profile);

  const { loading } = useAppSelector((state) => state.notifications);

  const navigate = useNavigate();

  const getNotificationsHandler = () => {
    dispatch(actGetNotifications())
      .unwrap()
      .then(() => {
        navigate("notifications");
      });
  };

  return (
    <>
      {loading === "pending" && <div className="loadingBox">
        <LoadingIndicator />
      </div>}
      <header className={header}>
        <section className={wrapper}>
          {isPhone && <Logo />}
          <div className={box}>
            {!isPhone && <button className={btn}>En</button>}
            <div className={notifications} onClick={getNotificationsHandler}>
              <Bell className={bell} />
              <span className={badge}>{user?.new_notification || 0}</span>
            </div>
            {isPhone && (
              <MenuIcon
                className={menuIcon}
                onClick={() => setIsSidebarOpen((prevState) => !prevState)}
              />
            )}
            {!isPhone && (
              <div className={userPhoto}>
                {user?.image ? (
                  <img src={user?.image} alt="Avatar" />
                ) : (
                  <UserPhoto />
                )}
              </div>
            )}
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
