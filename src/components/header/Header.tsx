import styles from "./header.module.css";
import Bell from "@/assets/BellOutline.svg?react";
import UserPhoto from "@/assets/profilePlaceholder.svg?react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import actGetNotifications from "@/store/notifications/act/actGetNotifications";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import { useContext } from "react";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import { format } from "date-fns";
import { ar } from 'date-fns/locale';

const {
  header,
  wrapper,
  box,
  badge,
  userPhoto,
  notifications,
  bell,
  textBox
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

  const today = new Date();
  const formattedDate = format(today, "yyyy/M/d");
  const dayName = format(today, "EEEE", {locale: ar})

  return (
    <>
      {loading === "pending" && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <header className={header}>
        <section className={wrapper}>
          <div className={textBox}>
            <span>{headerTitle}</span>
            <span>{dayName} : {formattedDate}</span>
          </div>
          <div className={box}>
            <div className={notifications} onClick={getNotificationsHandler}>
              <Bell className={bell}/>
              {user?.new_notification ? <span className={badge}></span> : ""}
            </div>
            <div className={userPhoto}>
              {img_url ? (
                <img src={img_url} alt="Avatar"/>
              ) : (
                <UserPhoto/>
              )}
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
