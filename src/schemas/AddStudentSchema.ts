import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod";
import { TLessonStatus } from "@/types/shared.ts";
import { TStatus } from "@/types/Dropdown.ts";

export const AddStudentSchema = z.object({
  status: z.string().min(1, "برجاء اختيار الحالة"),
  salutation: z.string().min(1, "برجاء اختيار اللقب"),
  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().min(1, "برجاء ادخال الاسم الكامل"),

  email: z
  .string()
  .min(1, "برجاء ادخال البريد الإلكتروني")
  .email("برجاء ادخال بريد إلكتروني صحيح"),

  additional_email: z
  .string()
  .email("برجاء ادخال بريد إلكتروني صحيح")
  .optional(),

  mobile_phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),

  home_phone: z.string().optional(),

  work_phone: z.string().optional(),

  address: z.string().optional(),
  address_2: z.string().optional(),

  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  additional_notes: z.string().optional(),
  birth_date: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  school: z.string().nullable().optional(),
  grade: z.string().nullable().optional(),
  student_curriculum: z.string().min(1, "برجاء اختيار المنهج الدراسي"),
  subject_choices: z.array(z.string()).min(1, "برجاء اختيار مادة"),
  initial_services: z.array(z.string()).optional(),
  initial_location: z.string().optional(),
  initial_teachers: z.array(z.string()).optional(),
  calendar_color: z.string().optional(),
  billing_method: z.string().min(1, "برجاء اختيار طريقة الدفع"),
  student_cost: z.string().optional(),
  sms_lesson_reminders: z.boolean().optional(),
  email_lesson_reminders: z.boolean().optional(),
  whatsapp_reminders: z.boolean().optional(),
  app_reminders: z.boolean().optional(),
  web_reminders: z.boolean().optional(),
  // send_welcome_email: z.boolean(),
  user_account: z.boolean(),
  customer_type: z.string().optional(),
});

export type TAddStudentFormData = z.infer<typeof AddStudentSchema>;

type TKeysToOmit = "subject_choices" | "status" | "student_curriculum";

export type TAddStudentFormDataForServer = Omit<
  TAddStudentFormData,
  TKeysToOmit
> & {
  customer_type: string;
  is_superuser: boolean;
  students_attributes: {
    first_name?: string;
    last_name?: string;
    full_name?: string;
    time_zone?: string;
    email?: string;
    mobile_phone?: string;
    birth_date?: string | null;
    start_date: string | null;
    school?: string | null;
    grade?: string | null;
    additional_notes?: string;
    calendar_color?: string;
    status: boolean;
    billing_method: string;
    student_cost?: string;
    initial_services?: number[];
    initial_teachers?: number[];
    initial_location?: number;
    subject_choices?: number[];
    student_type: string;
    student_curriculum: number;
  };
};

export type TSubscriptionCredit = {
  id: number;
  service_name: string;
  quantity: number;
  scheduled_lessons: number;
  unscheduled_lessons: number;
  unused_lessons: number;
  used_lessons: number;
}

export type TSpecificStudentLesson = {
  id: number;
  from_date: string;
  from_time: string;
  to_time: string;
  subject_name: string;
  default_cost: string;
  status: TLessonStatus;
};

export type TStudentInvoice = Partial<{
  id: number;
  formatted_number: string;
  date: string;
  due_date: string;
  status: TStatus;
  total: string;
  sent_at: string;
  customer_name: string;
  invoice_type: string;
  amount_due: number;
}>

export type TStudentPayment = Partial<{
  id: number;
  unallocated_amount: number;
  customer_name: string;
  created_at: string;
  updated_at: string;
  tw_id: string | null;
  type: string;
  amount: string;
  date: string;
  payment_method: string;
  description: string;
  customer: number;
}>

export type TDataForSpecificStudent = Omit<TAddStudentFormDataForServer, 'students_attributes'> & {
  first_name?: string;
  last_name?: string;
  services_str: string;
  teachers_str: string;
  subjects_str: string;
  subscriptions_credits: TSubscriptionCredit[];
  upcoming_lessons: TSpecificStudentLesson[];
  today_lessons: TSpecificStudentLesson[];
  invoices: TStudentInvoice[],
  payments: TStudentPayment[],
  initial_location: {
    link: string;
  }
  full_name?: string;
  family_name?: string;
  email?: string;
  mobile_phone?: string;
  home_phone?: string;
  time_zone?: string;
  birth_date?: string;
  start_date: string;
  school?: string;
  grade?: string;
  additional_notes?: string;
  calendar_color?: string;
  status: boolean;
  billing_method: string;
  student_cost?: string;
  initial_services?: number[];
  initial_teachers?: number[];
  subject_choices?: number[];
  student_type: string;
  student_curriculum: number;
  email_lesson_notes: boolean;
}
