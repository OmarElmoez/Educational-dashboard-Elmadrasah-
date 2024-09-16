import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainLayout, LoginLayout } from "@/layouts";
import { StudentHomePage } from "@/pages/student";
import ProdectedRoute from "./ProtectedRoute";

// ==================== Icons ====================
// import HomeIcon from "@/assets/home.svg?react";
// import CalendarIcon from "@/assets/calendar.svg?react";
// import Boy from "@/assets/Boy.svg?react";
// import Teacher from "@/assets/teacher.svg?react";
// import Report from "@/assets/reports.svg?react";
import {
  AddEmployeeForm,
  AdminClassesPage,
  AdminHomePage,
  AdminReportsPage,
  AdminStudentsPage,
  AdminTeachersPage,
} from "@/pages/admin";
import {
  TeacherClassesPage,
  TeacherHomePage,
  TeacherReportsPage,
  TeacherStudentsPage,
} from "@/pages/teacher";
import { FamilyHomePage, FamilyNotesPage } from "@/pages/family";
import {
  CalendarPage,
  HelpPage,
  NotificationsPage,
  Profile,
  Roles,
  Security,
  SettingsPage,
} from "@/pages/shared";
import { Login, PhoneNumber, SetPassword } from "@/pages/login";
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

const router = createBrowserRouter([
  // Login Routes
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "set-phoneNumber",
        element: <PhoneNumber />,
      },
      {
        path: "set-password",
        element: <SetPassword />,
      },
    ],
  },

  // Student Routes
  {
    path: "/student",
    element: (
      <ProdectedRoute allowedTypes={["Student"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Student"]} />
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <StudentHomePage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "security",
            element: <Security />,
          },
        ],
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: (
      <ProdectedRoute allowedTypes={["Admin"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Admin"]} />
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: "classes",
        element: <AdminClassesPage />,
      },
      {
        path: "students",
        element: <AdminStudentsPage />,
      },
      {
        path: "teachers",
        element: <AdminTeachersPage />,
      },
      {
        path: "reports",
        element: <AdminReportsPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "security",
            element: <Security />,
          },
          {
            path: "roles",
            element: <Roles />,
          },
        ],
      },
      {
        path: 'add-employee',
        element: <AddEmployeeForm />,
      }
    ],
  },

  // Teacher Routes
  {
    path: "/teacher",
    element: (
      <ProdectedRoute allowedTypes={["Teacher"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Teacher"]} />
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TeacherHomePage />,
      },
      {
        path: "classes",
        element: <TeacherClassesPage />,
      },
      {
        path: "reports",
        element: <TeacherReportsPage />,
      },
      {
        path: "students",
        element: <TeacherStudentsPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "security",
            element: <Security />,
          },
        ],
      },
      {
        path: 'notifications',
        element: <NotificationsPage />
      }
    ],
  },

  // Family Routes
  {
    path: "/family",
    element: (
      <ProdectedRoute allowedTypes={["Family"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Family"]} />
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <FamilyHomePage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "notes",
        element: <FamilyNotesPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "security",
            element: <Security />,
          },
        ],
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
