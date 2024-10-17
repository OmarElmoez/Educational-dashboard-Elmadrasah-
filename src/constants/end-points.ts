import { TInvoiceHistoryFormDataForServer } from "@/pages/admin/lists/invoice/InvoiceِApproveForm";
import { TAddEmployeeFormDataForServer } from "@/schemas/AddEmployeeSchema";
import { TAddParentFormData } from "@/schemas/AddParentSchema";
import { TAddStudentFormDataForServer } from "@/schemas/AddStudentSchema";
import { TAddStudentToFamilyFormDataForServer } from "@/schemas/AddStudentToFamilySchema";
import { TCreateInvoiceFormDataForServer } from "@/schemas/CreateInvoiceSchema";

const END_POINTS = {
  subject_choices: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/?ordering=-id",
    placeholder: "المواد",
  },
  initial_students: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/student/",
    placeholder: "الطلاب",
  },
  initial_services: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/service/?paginate=false",
    placeholder: "الخدمات الإفتراضية",
  },
  initial_teachers: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/default-teachers?paginate=false",
    placeholder: "المعلمون ",
  },
  student_curriculum: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/curriculum?paginate=false",
    placeholder: " منهج الطالب  ",
  },
  initial_location: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/location/?paginate=false",
    placeholder: "رابط دخول الحصة",
  },
  // Temp data
  days: {
    url: "",
    placeholder: "الأيام",
  },
 
  teachers_choices: {
    url: "",
    placeholder: "المعلمين",
  },
 

  // *********** test ***
  family: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/families?paginate=false",
    placeholder: "  العائلة",
  },
 
};

const POST_END_POINTS = {
  add_employee: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/modify/",
    dataType: {} as TAddEmployeeFormDataForServer,
  },
  add_family: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/family/",
    dataType: {} as TAddParentFormData,
  },
  add_individual_student: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/individual/",
    dataType: {} as TAddStudentFormDataForServer,
  },
  add_family_student: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/family-student/",
    dataType: {} as TAddStudentToFamilyFormDataForServer,
  },
  
  create_payment: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/payments/",
    dataType: {} as TInvoiceHistoryFormDataForServer,
  },
  create_invoice: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/invoices/",
    dataType: {} as TCreateInvoiceFormDataForServer,
  },
  edit_invoice: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/invoices/",
    dataType: {} as TCreateInvoiceFormDataForServer,
  },
  edit_invoice_status: {
    url: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/invoices/",
    dataType: {} as any,
  },
};

type TPurpose = keyof typeof POST_END_POINTS;

type TPostEndPoints = typeof POST_END_POINTS;

export type { TPurpose, TPostEndPoints };

export { END_POINTS, POST_END_POINTS };


const DROPDOWN_END_POINTS = {
  subjects: "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/?ordering=-id",
  curriculums: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/curriculum?paginate=false",
  locations: "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/location/?paginate=false",
  families: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/families?paginate=false",
  customers: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/customers/?paginate=false",
  customersSearch: "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/customers/?paginate=false&first_name=",
  services: "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/service/?paginate=false",
}

type TOptionsFor = keyof typeof DROPDOWN_END_POINTS;

export type { TOptionsFor };

export { DROPDOWN_END_POINTS };
