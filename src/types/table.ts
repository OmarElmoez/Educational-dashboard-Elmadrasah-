type TCustomer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  home_phone: string;
  student_type?: string;
  customer?: number;
  customer_type?: string;
  name?: string;
  status?: number;
};

type TTableResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  searchFor: string | null;
  results: TCustomer[] | TEmployeesData[];
};

type TPayment = {
  id: number;
  unallocated_amount: number;
  customer_name: string;
  created_at: string;
  updated_at: string;
  tw_id: string | number | null;
  type: string;
  amount: string;
  date: string;
  payment_method: string;
  description: string;
  customer: number;
};

type TPaymentResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TPayment[];
};

type TInvoice = {
  id: number;
  amount_due: number;
  customer_name: string;
  tw_id: string | null;
  invoice_type: string;
  formatted_number: string;
  date: string;
  due_date: string;
  reference: string;
  tax_treatment: string;
  status: string;
  start_date: string;
  end_date: string;
  terms_text: string;
  subtotal: string;
  sales_tax_total: string;
  total: string;
  hide_flags: boolean;
  invoice_token: string | null;
  sent_at: string | null;
  reminder_sent_at: string | null;
  created_at: string;
  updated_at: string;
  customer: number;
};

type TInvoiceResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TInvoice[];
};

type TBalance = {
  customer_first_name: string;
  customer_last_name: string;
  service_name: string;
  purchased: number;
  scheduled: number;
  unscheduled: number;
  over_scheduled: number;
  used: number;
  unused: number;
  over_used: number;
};
type TBalanceResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TBalance[];
};
type TEmployeesData = {
  status: number;
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  is_active: boolean;
  is_superuser: boolean;
  gender: string | null;
  employee_type: string | null;
  include_as_teacher: boolean | null;
  title: string | null;
  home_phone: string | null;
  address: string | null;
  address_2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip: string | "";
  last_login: string | null;
  time_zone: string | null;
  additional_notes: string | "";
  birth_date: string | null;
  place_of_birth: string | "";
  personal_photo: [
    {
      id: number;
      image: string | null;
      uploaded_at: string | null;
    }
  ];
  national_id: [
    {
      id: number;
      image: string | null;
      uploaded_at: string | null;
    }
  ];
  national_id_expiration_date: string | null;
  passport: [
    {
      id: number;
      image: string | null;
      uploaded_at: string | null;
    }
  ];
  passport_expiration_date: string | null;
  cv: [
    {
      id: number;
      file: string | null;
      uploaded_at: string | null;
    }
  ];
  subject_choices_response: [
    {
      id: number;
      name_ar: string | null;
      name_en: string | null;
    }
  ];
  availabilities: [
    {
      id: number;
      day: string | null;
      start_time: string | null;
      end_time: string | null;
      description: string | null;
    }
  ];
  position: string | null;
  hire_date: string | null;
  wage_type: string | null;
  employee_wage: string | null;
  work_wage_type: string | null;
  work_wage: string | null;
  default_subject: number;
  school: string | null;
  grade_year: string | null;
  teacher_language: string | null;
  bio: string | "";
  initial_location: number;
  initial_students_response: number[];
  calendar_setting: string | null;
  calendar_color_by: string | null;
  calendar_color: string | null;
  email_lesson_reminders: boolean;
  sms_lesson_reminders: boolean;
  app_reminders: boolean;
  web_reminders: boolean;
  whatsapp_reminders: boolean;
  user_account: boolean;
  created_at: string | null;
  updated_at: string | null;
  user_permissions: string[];
  groups: string[];
};
type TAllEmployeesData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TEmployeesData[];
  status: number;
};
type TFamilyData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  home_phone: string;
  customer_type: string;
  name: string;
};
type TAllFamiliesData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TFamilyData[];
};
type TTeacherReport = {
  employee_id: number;
  employee_name: string;
  lesson_count_today: number;
  attended_lesson_count: number;
  last_login: string | null;
};
type TAllTeachersReportData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TTeacherReport[],
  total_lessons_today: number;
};
export type {
  TCustomer,
  TTableResponse,
  TInvoice,
  TInvoiceResponse,
  TPayment,
  TPaymentResponse,
  TBalance,
  TBalanceResponse,
  TAllEmployeesData,
  TEmployeesData,
  TFamilyData,
  TAllFamiliesData,
  TTeacherReport,
  TAllTeachersReportData
};
