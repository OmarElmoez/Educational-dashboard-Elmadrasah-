import { TInvoiceHistoryFormDataForServer } from "@/pages/admin/lists/invoice/InvoiceِApproveForm";
import { TAddEmployeeFormDataForServer } from "@/schemas/AddEmployeeSchema";
import { TAddParentFormData } from "@/schemas/AddParentSchema";
import { TAddStudentFormDataForServer } from "@/schemas/AddStudentSchema";
import { TAddStudentToFamilyFormDataForServer } from "@/schemas/AddStudentToFamilySchema";
import { TCreateInvoiceFormDataForServer } from "@/schemas/CreateInvoiceSchema";

const END_POINTS = {
  subject_choices: {
    url: `/employee/subject/?ordering=-id`,
    placeholder: "المواد",
  },
  initial_students: {
    url: `/employee/student/`,
    placeholder: "الطلاب",
  },
  initial_services: {
    url: `/dashboard/service/?paginate=false`,
    placeholder: "الخدمات الإفتراضية",
  },
  initial_teachers: {
    url: `/customer/default-teachers?paginate=false`,
    placeholder: "المعلمون ",
  },
  student_curriculum: {
    url: `/customer/curriculum?paginate=false`,
    placeholder: " منهج الطالب  ",
  },
  initial_location: {
    url: `/dashboard/location/?paginate=false`,
    placeholder: "رابط دخول الحصة",
  },
  // Temp data
  day: {
    url: "",
    placeholder: "الأيام",
  },
 
  teachers_choices: {
    url: "",
    placeholder: "المعلمين",
  },
 

  // *********** test ***
  family: {
    url: `/customer/families?paginate=false`,
    placeholder: "  العائلة",
  },
 
};

const POST_END_POINTS = {
  add_employee: {
    url: `/employee/modify/`,
    dataType: {} as TAddEmployeeFormDataForServer,
  },
  add_family: {
    url: `/customer/family/`,
    dataType: {} as TAddParentFormData,
  },
  add_individual_student: {
    url: `/customer/individual/`,
    dataType: {} as TAddStudentFormDataForServer,
  },
  add_family_student: {
    url: `/customer/family-student/`,
    dataType: {} as TAddStudentToFamilyFormDataForServer,
  },
  
  create_payment: {
    url: `/customer/payments/`,
    dataType: {} as TInvoiceHistoryFormDataForServer,
  },
  create_invoice: {
    url: `/customer/invoices/`,
    dataType: {} as TCreateInvoiceFormDataForServer,
  },
  edit_invoice: {
    url: `/customer/invoices/`,
    dataType: {} as TCreateInvoiceFormDataForServer,
  },
  edit_invoice_status: {
    url: `/customer/invoices/`,
    dataType: {} as any,
  },
};

type TPurpose = keyof typeof POST_END_POINTS;

type TPostEndPoints = typeof POST_END_POINTS;

export type { TPurpose, TPostEndPoints };

export { END_POINTS, POST_END_POINTS };


const DROPDOWN_END_POINTS = {
  subjects: `/employee/subject/?ordering=-id`,
  curriculums: `/customer/curriculum?paginate=false`,
  locations: `/dashboard/location/?paginate=false`,
  families: `/customer/families?paginate=false`,
  customers: `/customer/customers/?paginate=false`,
  services: `/dashboard/service/?paginate=false`,
  teachers: '/customer/default-teachers?paginate=false',
}
type TOptionsFor = keyof typeof DROPDOWN_END_POINTS;

export type { TOptionsFor };

export { DROPDOWN_END_POINTS };
