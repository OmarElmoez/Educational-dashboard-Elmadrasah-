import {lazy} from "react";

const AdminClassesPage = lazy(() => import('./classes/Classes'))
const AdminHomePage = lazy(() => import('./HomePage'))
const AdminTeachersPage = lazy(() => import('./Teachers'));
const AdminReportsPage = lazy(() => import('./Reports'));
const AdminStudentsPage = lazy(() => import('./Students'));
const AdminRolesPage = lazy(() => import('./roles/Roles'));
// FORMS
const AddEmployeeForm = lazy(() => import("./forms/AddEmployeeForm"));
const AddTeacherForm = lazy(() => import('./forms/AddTeacherForm'));
const AddParentForm = lazy(() => import('./forms/AddParentForm'));
const AddStudentForm = lazy(() => import('./forms/AddStudentForm'));
const AddStudentToFamilyForm = lazy(() => import('./forms/AddStudentToFamilyForm'));
const CreateInvoiceForm = lazy(() => import('./forms/create-invoice/CreateInvoiceForm'));
const EditInvoiceForm = lazy(() => import('./forms/create-invoice/EditInvoiceForm'));
// import CopyInvoiceForm from "./forms/create-invoice/CopyInvoiceForm";
const CopyInvoicesForm = lazy(() => import('./forms/create-invoice/CopyInvoicesForm'));
const ScheduleLesson = lazy(() => import('./forms/scheduling/ScheduleLesson'));
const RescheduleLesson = lazy(() => import('./forms/scheduling/RescheduleLesson'));
// LIST:
const StudentsList = lazy(() => import('./lists/NewStudentsList'));
const EditStudent = lazy(() => import('./lists/EditStudent'));
const InvoicesList = lazy(() => import('./lists/InvoicesList'));
const PackageBalanceList = lazy(() => import('./lists/balance/PackageBalanceList'));
const InvoiceDetails = lazy(() => import('./lists/invoice/InvoiceDetails'));
const GeneralUnscheduledLists = lazy(() => import('./lists/Unscheduled/GeneralUnscheduledLists'));
const UnscheduledList = lazy(() => import('./lists/Unscheduled/UnscheduledList'));
const UnscheduledFamilyList = lazy(() => import('./lists/Unscheduled/UnscheduledFamilyList'));
const GeneralScheduledEmployeesLists = lazy(
  () => import('./lists/ScheduledEmployeesLists/GeneralScheduledEmployeesLists'));
const SchedulingErrorsTableList = lazy(() => import('./lists/ScheduledEmployeesLists/ScheduledErrorsTableList'));

export {
  AdminClassesPage,
  AdminHomePage,
  AdminTeachersPage,
  AdminReportsPage,
  AdminStudentsPage,
  AddEmployeeForm,
  AddTeacherForm,
  AddParentForm,
  AddStudentForm,
  AddStudentToFamilyForm,
  CreateInvoiceForm,
  EditInvoiceForm,
  StudentsList,
  InvoicesList,
  PackageBalanceList,
  InvoiceDetails,
  CopyInvoicesForm,
  ScheduleLesson,
  RescheduleLesson,
  GeneralUnscheduledLists,
  UnscheduledList,
  UnscheduledFamilyList,
  GeneralScheduledEmployeesLists,
  SchedulingErrorsTableList,
  AdminRolesPage,
  EditStudent
};
