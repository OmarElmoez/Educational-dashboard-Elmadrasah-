import {
  BoyIcon,
  CalendarIcon,
  HomeIcon,
  PH_boyIcon,
  PH_calendarIcon,
  PH_homeIcon,
  PH_reportsIcon,
  PH_teacherIcon,
  ReportsIcon,
  TeacherIcon,
} from "@/assets/nav-icons";

import AddIcon from "@/assets/add.svg?react";

const SIDEBAR_DATA = {
  Student: [
    {
      title: "الرئيسية",
      path: "/student",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
    },
    {
      title: "الجدول",
      path: "calendar",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
    },
  ],

  Admin: [
    {
      title: "الرئيسية",
      path: "/admin",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
    },
    {
      title: "الحصص",
      path: "classes",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
    },
    {
      title: "الطلاب",
      path: "students",
      icon: <BoyIcon />,
      phone_icon: <PH_boyIcon />,
    },
    {
      title: "المعلمين",
      path: "teachers",
      icon: <TeacherIcon />,
      phone_icon: <PH_teacherIcon />,
    },
    {
      title: "التقارير",
      path: "reports",
      icon: <ReportsIcon />,
      phone_icon: <PH_reportsIcon />,
    },
    {
      title: "إضافة موظف",
      path: "add-employee",
      icon: <AddIcon />,
    }
  ],

  Teacher: [
    {
      title: "الرئيسية",
      path: "/teacher",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
    },
    {
      title: "الحصص",
      path: "classes",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
    },
    {
      title: "الطلاب",
      path: "students",
      icon: <BoyIcon />,
      phone_icon: <PH_boyIcon />,
    },
    {
      title: "التقارير",
      path: "reports",
      icon: <ReportsIcon />,
      phone_icon: <PH_reportsIcon />,
    },
  ],

  Family: [
    {
      title: "الرئيسية",
      path: "/family",
      icon: <HomeIcon />,
      phone_icon: <PH_homeIcon />,
    },
    {
      title: "الجدول",
      path: "calendar",
      icon: <CalendarIcon />,
      phone_icon: <PH_calendarIcon />,
    },
    {
      title: "الملاحظات",
      path: "notes",
      icon: <ReportsIcon />,
      phone_icon: <PH_reportsIcon />,
    },
  ],
};

export default SIDEBAR_DATA;