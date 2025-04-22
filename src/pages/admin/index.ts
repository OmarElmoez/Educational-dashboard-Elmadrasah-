import {lazy} from "react";

const AdminClassesPage = lazy(() => import('./classes/Classes'))
const AdminHomePage = lazy(() => import('./HomePage'))
const AdminReportsPage = lazy(() => import('./Reports'));
const AdminStudentsPage = lazy(() => import('./Students'));
const AdminRolesPage = lazy(() => import('./roles/Roles'));
// FORMS
const AddEmployeeForm = lazy(() => import("./forms/AddEmployeeForm"));
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
const StudentsList = lazy(() => import('./students/list/studentsList.tsx'));
const EditStudent = lazy(() => import('./students/edit/EditStudent.tsx'));
const StudentProfile = lazy(() => import('./students/profile/StudentProfile'));
const FamiliesList = lazy(() => import('./families/list/List.tsx'));
const FamilyProfile = lazy(() => import('./families/profile/FamilyProfile.tsx'))
const EditFamily = lazy(() => import('./families/edit/Edit.tsx'))
const InvoicesList = lazy(() => import('./lists/InvoicesList'));
const PackageBalanceList = lazy(() => import('./lists/balance/PackageBalanceList'));
const InvoiceDetails = lazy(() => import('./lists/invoice/InvoiceDetails'));
const GeneralUnscheduledLists = lazy(() => import('./lists/Unscheduled/GeneralUnscheduledLists'));
const UnscheduledSeparateStudentsTable = lazy(() => import('@/components/table/unscheduled-tables/UnscheduledSeparateStudentsTable'));
const UnscheduledFamilyList = lazy(() => import('./lists/Unscheduled/UnscheduledFamilyList'));
const GeneralScheduledEmployeesLists = lazy(
  () => import('./lists/ScheduledEmployeesLists/GeneralScheduledEmployeesLists'));
const SchedulingErrorsTableList = lazy(() => import('./lists/ScheduledEmployeesLists/ScheduledErrorsTableList'));
const EmployeesList = lazy(() => import('./employees/list/EmployeesList.tsx'))

export {
  AdminClassesPage,
  AdminHomePage,
  AdminReportsPage,
  AdminStudentsPage,
  AddEmployeeForm,
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
  UnscheduledSeparateStudentsTable,
  UnscheduledFamilyList,
  GeneralScheduledEmployeesLists,
  SchedulingErrorsTableList,
  AdminRolesPage,
  EditStudent,
  StudentProfile,
  FamiliesList,
  FamilyProfile,
  EditFamily,
  EmployeesList
};
