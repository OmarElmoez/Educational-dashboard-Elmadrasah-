import styles from "./header.module.css";
import Bell from "@/assets/BellOutline.svg?react";
import UserPhoto from "@/assets/profilePlaceholder.svg?react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import actGetNotifications from "@/store/notifications/act/actGetNotifications";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import { useContext } from "react";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";

const {
  header,
  wrapper,
  box,
  badge,
  userPhoto,
  notifications,
  bell,
  userInfo
} = styles;
const Header = () => {

  const {headerTitle} = useContext(CalendarContext);

  const dispatch = useAppDispatch();

  const {img_url, user} = useAppSelector((state) => state.profile);

  const {loading} = useAppSelector((state) => state.notifications);

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
          <LoadingIndicator/>
      </div>}
      <header className={header}>
        <section className={wrapper}>
          <span>{headerTitle}</span>
          <div className={box}>
            <section className={userInfo}>
              <div className={userPhoto}>
                {img_url ? (
                  <img src={img_url} alt="Avatar"/>
                ) : (
                  <UserPhoto/>
                )}
              </div>
              <span>{user?.first_name} {user?.last_name}</span>
            </section>
            <div className={notifications} onClick={getNotificationsHandler}>
              <Bell className={bell}/>
              {user?.new_notification ? <span className={badge}></span> : ""}
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
