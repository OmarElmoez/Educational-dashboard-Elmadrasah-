import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod";

export const AddStudentToFamilySchema = z.object({
  customer: z.string().min(1, "برجاء اختيار العائلة  "),

  status: z.string().min(1, "برجاء اختيار الحالة"),

  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  email: z
    .string()
    .min(1, "برجاء ادخال البريد الإلكتروني")
    .email("برجاء ادخال بريد إلكتروني صحيح"),

  mobile_phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),

  home_phone: z.string().optional(),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  birth_date: z.string().nullable().optional(),
  start_date: z.string(),
  school: z.string().nullable().optional(),
  grade: z.string().nullable().optional(),
  student_curriculum: z.string().nullable(),
  subject_choices: z.array(z.string()).optional(),
  additional_notes: z.string().optional(),
  initial_services: z.array(z.string()).optional(),
  initial_location: z.string().optional(),
  initial_teachers: z.array(z.string()).optional(),
  calendar_color: z.string().optional(),
  billing_method: z.string().min(1, "برجاء اختيار طريقة الدفع"),
  student_cost: z.string().optional(),

  sms_lesson_reminders: z.boolean(),
  email_lesson_reminders: z.boolean(),
  whatsapp_reminders: z.boolean(),
  app_reminders: z.boolean(),
  web_reminders: z.boolean(),
  // send_welcome_email: z.boolean(),
  user_account: z.boolean(),
  is_superuser: z.boolean().optional(),
});

export type TAddStudentToFamilyFormData = z.infer<
  typeof AddStudentToFamilySchema
>;

type TKeysToOmit = "status" | "initial_services" | "initial_teachers" | 'subject_choices';

export type TAddStudentToFamilyFormDataForServer = Omit<
  TAddStudentToFamilyFormData,
  TKeysToOmit
> & {
  status: boolean;
  student_type: string;
  initial_services?: number[];
  initial_teachers?: number[];
  subject_choices?: number[];
};