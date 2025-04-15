import { Outlet, useNavigate } from "react-router-dom";
import styles from "./settings.module.css";
// import { useAppSelector } from "@/store/hooks";
import { useContext } from "react";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import Button from "@mui/material/Button";

const { nav } = styles;
const SettingsPage = () => {
  // const {  user } = useAppSelector((state) => state.profile);
  const { setHeaderTitle } = useContext(CalendarContext);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleNavigation = (path: string, title: string) => {
    navigate(path);
    setHeaderTitle(title);
  };
  return (
    <>
       <nav className={nav}>
        <Button
          variant={currentPath.endsWith("/settings") ? "contained" : "outlined"}
          onClick={() => handleNavigation("", "الملف الشخصي")}
        >
          البيانات الشخصية 
        </Button>
        <Button
          variant={currentPath.includes("security") ? "contained" : "outlined"}
          onClick={() => handleNavigation("security", " الملف الشخصي")}
        >
          تغيير كلمة المرور
        </Button>
        {/*{user?.user_type === "Admin" && (*/}
        {/*  <>*/}
        {/*  <Button*/}
        {/*    variant={currentPath.includes("roles") ? "contained" : "outlined"}*/}
        {/*    onClick={() => handleNavigation("roles", "الأدوار والمسؤوليات")}*/}
        {/*    >*/}
        {/*    الأدوار والمسؤوليات*/}
        {/*  </Button>*/}
        {/*    </>*/}
        {/*)}*/}
      </nav>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default SettingsPage;
