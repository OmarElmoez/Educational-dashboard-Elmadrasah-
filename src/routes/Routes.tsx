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
  AddTeacherForm,
  AddParentForm,
  AddStudentForm,
  AdminClassesPage,
  AdminHomePage,
  AdminReportsPage,
  AdminStudentsPage,
  AdminTeachersPage,
  AddStudentToFamilyForm,
  CreateInvoiceForm,
  // CopyInvoiceForm,
  StudentsList,
  InvoicesList,
  PackageBalanceList,
  InvoiceDetails,
  EditInvoiceForm,
  // CopyInvoiceForm,
  CopyInvoicesForm,
  ScheduleLesson,
  GeneralUnscheduledLists,
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
import { SIDEBAR_DATA } from "@/constants";

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
      },
      {
        path: 'add-teacher',
        element: <AddTeacherForm />,
      },
      {
        path: 'add-parent',
        element: <AddParentForm />,
      },
      {
        path: 'add-student',
        element: <AddStudentForm />,
      },
      {
        path: 'add-family-student',
        element: <AddStudentToFamilyForm />,
      },
      {
        path: 'create-invoice',
        element: <CreateInvoiceForm />,
      },
      {
        path: 'edit-invoice/:id',
        element: <EditInvoiceForm />,
      },
      // {
      //   path: 'copy-invoice/:id',
      //   element: <CopyInvoiceForm />,
      // },
      {
        path: 'copy-invoice/:id',
        element: <CopyInvoicesForm />,
      },
      {
        path: 'students-list',
        element: <StudentsList />,
      },
      {
        path: 'invoices-list',
        element: <InvoicesList />,
      },
      {
        path: 'invoice-details/:id',
        element: <InvoiceDetails />,
      },
      {
        path: 'balance-list',
        element: <PackageBalanceList />,
      },
      {
        path: 'all-unscheduled-list',
        element: <GeneralUnscheduledLists />,
      },
      {
        path: 'schedule-lesson/:id',
        element: <ScheduleLesson />,
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
