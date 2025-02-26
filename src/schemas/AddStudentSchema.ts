import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod";

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
    email?: string;
    mobile_phone?: string;
    birth_date?: string | null;
    start_date: string | null;
    school?: string | null;
    grade?: string | null;
    additional_notes?: string | null;
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
  }[];
};
