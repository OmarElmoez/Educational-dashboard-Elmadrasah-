import styles from "./header.module.css";
import Bell from "@/assets/BellOutline.svg?react";
import UserPhoto from "@/assets/profilePlaceholder.svg?react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import actGetNotifications from "@/store/notifications/act/actGetNotifications";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import { useContext } from "react";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import {INNER_ROUTES_TITLES} from "@/constants/sidebar-data.tsx";
import { useLocation } from "react-router-dom";


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

  const location = useLocation();

  const pageRoute = location.pathname;

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

  // const [language, setLanguage] = useState('ar');
  //
  // const {t, i18n} = useTranslation();
  //
  // useEffect(() => {
  //   void i18n.changeLanguage(language);
  //   document.documentElement.lang = language;
  //   document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  //   document.documentElement.className = language
  // }, [i18n, language]);

  return (
    <>
      {loading === "pending" && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
      <header className={header}>
        <section className={wrapper}>
          <div className={textBox}>
            <span>{INNER_ROUTES_TITLES[pageRoute as keyof typeof INNER_ROUTES_TITLES] || headerTitle || "الجدول"}</span>
            {/*<span>{t(TRANSLATION_KEYS.common.msg)}</span>*/}
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
            {/*<div className={notifications} onClick={() => setLanguage(*/}
            {/*  prev => prev === 'ar' ? 'en' : 'ar')}>*/}
            {/*  {language === 'ar' ? "EN" : "Ar"}*/}
            {/*</div>*/}
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
