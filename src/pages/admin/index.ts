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

// LIST: 
import StudentsList from "./lists/StudentsList";
import InvoicesList from "./lists/InvoicesList";
import PackageBalanceList from "./lists/balance/PackageBalanceList";
import InvoiceDetails from "./lists/invoice/InvoiceDetails";
import UnscheduledList from "./lists/Unscheduled/UnscheduledList";
import UnscheduledFamilyList from "./lists/Unscheduled/UnscheduledFamilyList";

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
  InvoiceDetails,
  CopyInvoicesForm,
  StudentsList,
  InvoicesList,
  PackageBalanceList,
  UnscheduledList,
  UnscheduledFamilyList,

};
