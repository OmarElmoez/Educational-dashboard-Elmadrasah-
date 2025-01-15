import { NavLink, Outlet } from "react-router-dom";
import styles from "./settings.module.css";
import { useAppSelector } from "@/store/hooks";
import { useContext } from "react";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";

const { nav, selected } = styles;
const SettingsPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const {setHeaderTitle} = useContext(CalendarContext)

  return (
    <>
      <nav className={nav}>
        <NavLink
          to=""
          end
          replace
          className={({ isActive }) => (isActive ? selected : "")}
          onClick={() => setHeaderTitle("إعدادات الحساب")}
        >
          إعدادات الحساب
        </NavLink>

        <NavLink
          to="security"
          end
          replace
          className={({ isActive }) => (isActive ? selected : "")}
          onClick={() => setHeaderTitle("تسجيل الدخول والأمان")}
        >
          تسجيل الدخول والأمان
        </NavLink>

        {user?.user_type === "Admin" && (
          <NavLink
            to="roles"
            end
            replace
            className={({ isActive }) => (isActive ? selected : "")}
            onClick={() => setHeaderTitle("الأدوار والمسؤوليات")}
          >
            الأدوار والمسؤوليات
          </NavLink>
        )}

      </nav>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default SettingsPage;
