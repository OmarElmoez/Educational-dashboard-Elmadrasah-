import { Heading } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "./notifications.module.css";
import NotificationAvatar from "@/assets/notification-avatar.svg?react";
import { useNavigate } from "react-router-dom";
import actMarkAsRead from "@/store/notifications/act/actMarkAsRead";
import formatFullArabicDate from "@/utils/formatFullArabicDate";
const { notificationBox, notificationsSection, desc, readed, fullDate } = styles;
const NotificationsPage = () => {
  const { records } = useAppSelector((state) => state.notifications);

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const markNotificationAsRead = (id: number) => {
    dispatch(actMarkAsRead({ notification_id: id }))
    navigate(`/${user?.user_type?.toLowerCase()}`);
  };

  return (
    <>
      <Heading text="الإشعارات" />
      <section className={notificationsSection}>
        {records?.map((record) => (
          <article
            key={record.id}
            className={`${notificationBox} ${record.read ? readed  : ""}`}
            onClick={() => markNotificationAsRead(record.id)}
          >
            <NotificationAvatar />
            <div>
              <h4>{record.title}</h4>
              <p className={desc}>{record.body}</p>
            <span className={fullDate}>{formatFullArabicDate(record.created_at)}</span>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default NotificationsPage;
