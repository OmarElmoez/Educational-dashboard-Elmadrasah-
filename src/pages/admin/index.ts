import AdminClassesPage from "./classes/Classes";
import AdminHomePage from "./HomePage";
import AdminTeachersPage from "./Teachers";
import AdminReportsPage from "./Reports";
import AdminStudentsPage from "./Students";
// FORMS
import AddEmployeeForm from "./forms/AddEmployeeForm";
import AddTeacherForm from "./forms/AddTeacherForm";
import AddParentForm from "./forms/AddParentForm";
import AddStudentForm from "./forms/AddStudentForm";
import AddStudentToFamilyForm from "./forms/AddStudentToFamilyForm";
import CreateInvoiceForm from "./forms/create-invoice/CreateInvoiceForm";
import EditInvoiceForm from "./forms/create-invoice/EditInvoiceForm";
// import CopyInvoiceForm from "./forms/create-invoice/CopyInvoiceForm";
import CopyInvoicesForm from "./forms/create-invoice/CopyInvoicesForm";
import ScheduleLesson from "./forms/scheduling/ScheduleLesson";
import RescheduleLesson from "./forms/scheduling/RescheduleLesson";

// LIST:
import StudentsList from "./lists/StudentsList";
import InvoicesList from "./lists/InvoicesList";
import PackageBalanceList from "./lists/balance/PackageBalanceList";
import InvoiceDetails from "./lists/invoice/InvoiceDetails";
import GeneralUnscheduledLists from "./lists/Unscheduled/GeneralUnscheduledLists";
import UnscheduledList from "./lists/Unscheduled/UnscheduledList";
import UnscheduledFamilyList from "./lists/Unscheduled/UnscheduledFamilyList";
import GeneralScheduledEmployeesLists from "./lists/ScheduledEmployeesLists/GeneralScheduledEmployeesLists";
import SchedulingErrorsTableList from "./lists/ScheduledEmployeesLists/ScheduledErrorsTableList";

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
  // CopyInvoiceForm,
  StudentsList,
  InvoicesList,
  PackageBalanceList,
  InvoiceDetails,
  // CopyInvoiceForm,
  CopyInvoicesForm,
  ScheduleLesson,
  RescheduleLesson,
  GeneralUnscheduledLists,
  UnscheduledList,
  UnscheduledFamilyList,
  GeneralScheduledEmployeesLists,
  SchedulingErrorsTableList,
};
