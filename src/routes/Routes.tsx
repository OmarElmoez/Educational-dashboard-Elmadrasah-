import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginLayout, MainLayout} from "@/layouts";
import {Classes} from "@/pages/student";
import ProtectedRoute from "./ProtectedRoute";

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
  AdminClassesPage,
  AdminHomePage,
  AdminReportsPage,
  AdminStudentsPage,
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
  AdminRolesPage, EditStudent, StudentProfile, FamiliesList, FamilyProfile, EditFamily, EmployeesList,
  InboxOperations
} from "@/pages/admin";
import {TeacherClassesPage, TeacherStudentsPage,} from "@/pages/teacher";
import {FamilyNotesPage, Classes as FamilyClasses} from "@/pages/family";
import {Error, HelpPage, JoinClass, NotificationsPage, Profile, Roles, Security, SettingsPage} from "@/pages/shared";
import { Login, PhoneNumber, SetPassword } from "@/pages/login";
import {SIDEBAR_DATA} from "@/constants";
import ScheduledErrorsTableList from "@/pages/admin/lists/ScheduledEmployeesLists/ScheduledErrorsTableList";
import PageSuspense from "@/components/page-suspense/PageSuspense.tsx";
import CheckAuth from "@/routes/CheckAuth.tsx";
import HourlyLessonsAdmin from './../pages/admin/tables/hourlyTables/HourlyTable';
import EditEmployeeForm from '../pages/admin/forms/edit/EditEmpolyeeForm';
import EmployeeProfileData from '../pages/admin/employees/employeeProfile/EmployeeProfileData';
import OrdersList from '../pages/admin/orders/list/ordersList';

const router = createBrowserRouter([
  // Login Routes
  {
    path: "/",
    element: (<CheckAuth>
      <LoginLayout/>
    </CheckAuth>),
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
      <ProtectedRoute allowedTypes={["Student"]}>
        <PageSuspense><MainLayout sideBarData={SIDEBAR_DATA["Student"]}/></PageSuspense>
      </ProtectedRoute>
    ),
    children: [
      // {
      //   index: true,
      //   element: <PageSuspense><StudentHomePage/></PageSuspense>,
      // },
      {
        index: true,
        element: <PageSuspense><Classes /></PageSuspense>
      },
      {
        path: "calendar/join-class/:classId",
        element: <PageSuspense><JoinClass /></PageSuspense>
      },
      {
        path: "help",
        element: <PageSuspense><HelpPage/></PageSuspense>,
      },
      {
        path: "settings",
        element: <PageSuspense><SettingsPage/></PageSuspense>,
        children: [
          {
            index: true,
            element: <PageSuspense><Profile/></PageSuspense>,
          },
          {
            path: "security",
            element: <PageSuspense><Security/></PageSuspense>,
          },
        ],
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedTypes={["Admin"]}>
        <PageSuspense>
          <MainLayout sideBarData={SIDEBAR_DATA["Admin"]}/>
        </PageSuspense>
      </ProtectedRoute>
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
        path: "calendar/classes/hourly-lessons",
        element: <PageSuspense>
          <HourlyLessonsAdmin/>
        </PageSuspense>,
      },
      {
        path: "calendar/join-class/:classId",
        element: <PageSuspense>
          <JoinClass/>
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
        element: <PageSuspense><EmployeesList/></PageSuspense>,
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
        path: 'employees/employee-profile/:id',
        element: <PageSuspense>
          <EmployeeProfileData/>
        </PageSuspense>
        ,
      },
      {
        path: 'employees/edit-employee/:id',
        element: <PageSuspense>
          <EditEmployeeForm/>
        </PageSuspense>
        ,
      },
      {
        path: 'students/add-family',
        element: <PageSuspense>
          <AddParentForm/>
        </PageSuspense>,
      },
      {
        path: 'students/families-list',
        element: <PageSuspense>
          <FamiliesList />
        </PageSuspense>
      },
      {
        path: 'students/families-list/:id',
        element: <PageSuspense>
          <FamilyProfile />
        </PageSuspense>
      },
      {
        path: 'students/families-list/:id/edit',
        element: <PageSuspense>
          <EditFamily />
        </PageSuspense>
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
        path: 'invoices/new-orders',
        element: <PageSuspense>
          <OrdersList/>
        </PageSuspense>,
      },
      {
        path: 'students/profile/:id/edit',
        element: <PageSuspense>
          <EditStudent/>
        </PageSuspense>,
      },
      {
        path: 'students/profile/:id',
        element: <PageSuspense>
          <StudentProfile/>
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
        path: 'schedule-employee/:std_id/:id',
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
        path: 'roles',
        element: <PageSuspense><AdminRolesPage /></PageSuspense>
      },
      {
        path: 'inbox',
        element: <PageSuspense><InboxOperations /></PageSuspense>
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
      <ProtectedRoute allowedTypes={["Teacher"]}>
        <PageSuspense><MainLayout sideBarData={SIDEBAR_DATA["Teacher"]}/></PageSuspense>
      </ProtectedRoute>
    ),
    children: [
      // {
      //   index: true,
      //   element: <PageSuspense><TeacherHomePage/></PageSuspense>,
      // },
      {
        index: true,
        element: <PageSuspense><TeacherClassesPage/></PageSuspense>,
      },
      {
        path: "calendar/join-class/:classId",
        element: <PageSuspense><JoinClass /></PageSuspense>
      },
      // {
      //   path: "reports",
      //   element: <PageSuspense><TeacherReportsPage/></PageSuspense>,
      // },
      {
        path: "students",
        element: <PageSuspense><TeacherStudentsPage/></PageSuspense>,
      },
      {
        path: "help",
        element: <PageSuspense><HelpPage/></PageSuspense>,
      },
      {
        path: "settings",
        element: <PageSuspense><SettingsPage/></PageSuspense>,
        children: [
          {
            index: true,
            element: <PageSuspense><Profile/></PageSuspense>,
          },
          {
            path: "security",
            element: <PageSuspense><Security/></PageSuspense>,
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
      <ProtectedRoute allowedTypes={["Family"]}>
        <PageSuspense><MainLayout sideBarData={SIDEBAR_DATA["Family"]}/></PageSuspense>
      </ProtectedRoute>
    ),
    children: [
      // {
      //   index: true,
      //   element: <PageSuspense><FamilyHomePage/></PageSuspense>,
      // },
      {
        index: true,
        element: <PageSuspense><FamilyClasses /></PageSuspense>,
      },
      {
        path: "notes",
        element: <PageSuspense><FamilyNotesPage/></PageSuspense>,
      },
      {
        path: "help",
        element: <PageSuspense><HelpPage/></PageSuspense>,
      },
      {
        path: "calendar/join-class/:classId",
        element: <PageSuspense><JoinClass /></PageSuspense>
      },
      {
        path: "settings",
        element: <PageSuspense><SettingsPage/></PageSuspense>,
        children: [
          {
            index: true,
            element: <PageSuspense><Profile/></PageSuspense>,
          },
          {
            path: "security",
            element: <PageSuspense><Security/></PageSuspense>,
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
