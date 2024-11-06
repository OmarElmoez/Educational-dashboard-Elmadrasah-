import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginLayout, MainLayout} from "@/layouts";
import {StudentHomePage} from "@/pages/student";
import ProdectedRoute from "./ProtectedRoute";

// ==================== Icons ====================
// import HomeIcon from "@/assets/home.svg?react";
// import CalendarIcon from "@/assets/calendar.svg?react";
// import Boy from "@/assets/Boy.svg?react";
// import Teacher from "@/assets/teacher.svg?react";
// import Report from "@/assets/reports.svg?react";
import {
  AddEmployeeForm,
  AddParentForm,
  AddStudentForm,
  AddStudentToFamilyForm,
  AddTeacherForm,
  AdminClassesPage,
  AdminHomePage,
  AdminReportsPage,
  AdminStudentsPage,
  AdminTeachersPage,
  CopyInvoicesForm,
  CreateInvoiceForm,
  EditInvoiceForm,
  GeneralScheduledEmployeesLists,
  GeneralUnscheduledLists,
  InvoiceDetails,
  InvoicesList,
  PackageBalanceList,
  RescheduleLesson,
  ScheduleLesson,
  StudentsList,
} from "@/pages/admin";
import {TeacherClassesPage, TeacherHomePage, TeacherReportsPage, TeacherStudentsPage,} from "@/pages/teacher";
import {FamilyHomePage, FamilyNotesPage} from "@/pages/family";
import {CalendarPage, Error, HelpPage, NotificationsPage, Profile, Roles, Security, SettingsPage} from "@/pages/shared";
import {Login, PhoneNumber, SetPassword} from "@/pages/login";
import {SIDEBAR_DATA} from "@/constants";
import ScheduledErrorsTableList from "@/pages/admin/lists/ScheduledEmployeesLists/ScheduledErrorsTableList";
import PageSuspense from "@/components/page-suspense/PageSuspense.tsx";

const router = createBrowserRouter([
  // Login Routes
  {
    path: "/",
    element: <LoginLayout/>,
    children: [
      {
        index: true,
        element: <Login/>,
      },
      {
        path: "set-phoneNumber",
        element: <PhoneNumber/>,
      },
      {
        path: "set-password",
        element: <SetPassword/>,
      },
      {
        path: '*',
        element: <Error type="error" isLogin={true}/>
      },
    ],
  },

  // Student Routes
  {
    path: "/student",
    element: (
      <ProdectedRoute allowedTypes={["Student"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Student"]}/>
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <StudentHomePage/>,
      },
      {
        path: "calendar",
        element: <CalendarPage/>,
      },
      {
        path: "help",
        element: <HelpPage/>,
      },
      {
        path: "settings",
        element: <SettingsPage/>,
        children: [
          {
            index: true,
            element: <Profile/>,
          },
          {
            path: "security",
            element: <Security/>,
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
        <PageSuspense>

          <MainLayout sideBarData={SIDEBAR_DATA["Admin"]}/>
        </PageSuspense>
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PageSuspense>
          <AdminHomePage/>
        </PageSuspense>,
      },
      {
        path: "calendar/classes",
        element: <PageSuspense>
          <AdminClassesPage/>
        </PageSuspense>,
      },
      {
        path: 'calendar/all-unscheduled-list',
        element: <PageSuspense>
          <GeneralUnscheduledLists/>
        </PageSuspense>,
      },
      {
        path: "students",
        element: <PageSuspense>
          <AdminStudentsPage/>
        </PageSuspense>,
      },
      {
        path: "employees/teachers",
        element: <PageSuspense><AdminTeachersPage/></PageSuspense>,
      },
      {
        path: "reports",
        element: <PageSuspense><AdminReportsPage/></PageSuspense>,
      },
      {
        path: "help",
        element: <PageSuspense>
          <HelpPage/>
        </PageSuspense>,
      },
      {
        path: "settings",
        element: <PageSuspense>
          <SettingsPage/>
        </PageSuspense>,
        children: [
          {
            index: true,
            element: <PageSuspense>
              <Profile/>
            </PageSuspense>,
          },
          {
            path: "security",
            element: <PageSuspense>
              <Security/>
            </PageSuspense>,
          },
          {
            path: "roles",
            element: <PageSuspense>
              <Roles/>
            </PageSuspense>,
          },
        ],
      },
      {
        path: 'employees/add-employee',
        element: <PageSuspense>
          <AddEmployeeForm/>
        </PageSuspense>
        ,
      },
      {
        path: 'employees/add-teacher',
        element: <PageSuspense>
          <AddTeacherForm/>
        </PageSuspense>,
      },
      {
        path: 'students/add-family',
        element: <PageSuspense>
          <AddParentForm/>
        </PageSuspense>,
      },
      {
        path: 'students/add-student',
        element: <PageSuspense>
          <AddStudentForm/>
        </PageSuspense>,
      },
      {
        path: 'students/students-list',
        element: <PageSuspense>
          <StudentsList/>
        </PageSuspense>,
      },
      {
        path: 'students/add-family-student',
        element: <PageSuspense>
          <AddStudentToFamilyForm/>
        </PageSuspense>,
      },
      {
        path: 'invoices/create-invoice',
        element: <PageSuspense>
          <CreateInvoiceForm/>
        </PageSuspense>,
      },
      {
        path: 'edit-invoice/:id',
        element: <PageSuspense>
          <EditInvoiceForm/>
        </PageSuspense>,
      },
      {
        path: 'copy-invoice/:id',
        element: <PageSuspense>
          <CopyInvoicesForm/>
        </PageSuspense>,
      },
      {
        path: 'invoices/invoices-list',
        element: <PageSuspense>
          <InvoicesList/>
        </PageSuspense>,
      },
      {
        path: 'invoices/invoice-details/:id',
        element: <PageSuspense>
          <InvoiceDetails/>
        </PageSuspense>,
      },
      {
        path: 'invoices/balance-list',
        element: <PageSuspense>
          <PackageBalanceList/>
        </PageSuspense>,
      },

      {
        path: 'schedule-lesson/:id/:credit/:package_id',
        element: <PageSuspense>
          <ScheduleLesson/>
        </PageSuspense>,
      },
      {
        path: 'reschedule-lesson/:id/',
        element: <PageSuspense>
          <RescheduleLesson/>
        </PageSuspense>,
      },
      {
        path: 'schedule-emplyee/:std_id/:id',
        element: <PageSuspense>
          <GeneralScheduledEmployeesLists/>
        </PageSuspense>,
      },
      {
        path: 'schedule-errors/:std_id/:id',
        element: <PageSuspense>
          <ScheduledErrorsTableList/>
        </PageSuspense>,
      },
      {
        path: '*',
        element: <Error type="notFound"/>
      },
    ],
  },


  // Teacher Routes
  {
    path: "/teacher",
    element: (
      <ProdectedRoute allowedTypes={["Teacher"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Teacher"]}/>
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TeacherHomePage/>,
      },
      {
        path: "classes",
        element: <TeacherClassesPage/>,
      },
      {
        path: "reports",
        element: <TeacherReportsPage/>,
      },
      {
        path: "students",
        element: <TeacherStudentsPage/>,
      },
      {
        path: "help",
        element: <HelpPage/>,
      },
      {
        path: "settings",
        element: <SettingsPage/>,
        children: [
          {
            index: true,
            element: <Profile/>,
          },
          {
            path: "security",
            element: <Security/>,
          },
        ],
      },
      {
        path: 'notifications',
        element: <NotificationsPage/>
      }
    ],
  },

  // Family Routes
  {
    path: "/family",
    element: (
      <ProdectedRoute allowedTypes={["Family"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Family"]}/>
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <FamilyHomePage/>,
      },
      {
        path: "calendar",
        element: <CalendarPage/>,
      },
      {
        path: "notes",
        element: <FamilyNotesPage/>,
      },
      {
        path: "help",
        element: <HelpPage/>,
      },
      {
        path: "settings",
        element: <SettingsPage/>,
        children: [
          {
            index: true,
            element: <Profile/>,
          },
          {
            path: "security",
            element: <Security/>,
          },
        ],
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router}/>;
};

export default Routes;
