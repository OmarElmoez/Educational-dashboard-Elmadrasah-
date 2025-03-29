import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod";

// Define the time entry schema for each item in the field array
const TimeEntrySchema = z.object({
  day: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  description: z.string().optional(),
});

const InitialStudentSchema = z.object({
  id: z.number(),
  student_name: z.string(),
  email: z.string(),
  mobile_phone: z.string(),
  status: z.string(),
})

export type TInitialStudent = z.infer<typeof InitialStudentSchema>

export const AddEmployeeSchema = z.object({
  employee_type: z.string().min(1, "برجاء اختيار نوع الموظف"),
  include_as_teacher: z.boolean().optional(),
  is_active: z.string().min(1, "برجاء اختيار الحالة"),
  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().min(1, "برجاء ادخال الاسم الكامل"),
  title: z.string().min(1, "برجاء اختيار اللقب"),
  email: z
  .string()
  .min(1, "برجاء ادخال البريد الإلكتروني")
  .email("برجاء ادخال بريد إلكتروني صحيح"),

  phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),
  home_phone: z.string().optional(),

  address: z.string().optional(),
  address_2: z.string().optional(),
  country: z.string().optional(),

  state: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  additional_notes: z.string().optional(),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  birth_date: z.string().min(1, "برجاء ادخال تاريخ الميلاد"),
  place_of_birth: z.string().optional(),

  wage_type: z.string(),
  work_wage_type: z.string(),
  default_subject: z.string().nullable(),
  uploaded_pp: z.array(z.instanceof(File)),
  uploaded_cv: z.array(z.instanceof(File)),
  uploaded_id: z.array(z.instanceof(File)),
  uploaded_passport: z.array(z.instanceof(File)),

  national_id_expiration_date: z
  .string()
  .min(1, "برجاء ادخال تاريخ انتهاء الهوية"),
  passport_expiration_date: z
  .string()
  .min(1, "برجاء ادخال تاريخ انتهاء جواز السفر"),

  subject_choices: z.array(z.string()),
  position: z.string().min(1, "برجاء ادخال المسمى"),
  bio: z.string().optional(),
  hire_date: z.string().optional(),
  updated_at: z.string().optional(),
  created_at: z.string().optional(),
  link: z.string().optional(),
  initial_students: z.array(z.string()),
  initial_location: z.string().optional(),
  employee_wage: z.string().optional(),
  work_wage: z.string().optional(),
  calendar_color: z.string().optional(),
  // calendar_setting: z.enum(["Day", "Month", "Week"], {
  //   errorMap: () => ({ message: "برجاء اختيار اعدادات التقويم" }),
  // }),
  calendar_setting: z.enum(["Day", "Month", "Week", ""]).optional().nullable(),
  availabilities: z.array(TimeEntrySchema),
  calendar_color_by: z.enum(["Student", "Website", "Lesson", ""]).optional().nullable(),
  sms_lesson_reminders: z.boolean().optional(),
  email_lesson_reminders: z.boolean().optional(),
  whatsapp_reminders: z.boolean().optional(),
  app_reminders: z.boolean().optional(),
  web_reminders: z.boolean().optional(),
  // send_welcome_email: z.boolean().optional(),
  user_account: z.boolean().optional(),
  event_type: z.string().optional(),
  is_superuser: z.boolean().optional(),
  user_permissions_id: z.array(z.string()).optional(),
  groups_id: z.array(z.string()).optional(),
})
.transform(data => ({
  ...data,
  gender: data.title === 'Mr' ? 'Male' : 'Female',
}))

export type TAddEmployeeFormData = z.infer<typeof AddEmployeeSchema>;

type TKeysToOmit =
  | "default_subject"
  | "subject_choices"
  | "is_active"
  | "initial_students"
  | "user_permissions_id"
  | "groups_id"

export type TAddEmployeeFormDataForServer = Omit<
  TAddEmployeeFormData,
  TKeysToOmit
> & {
  default_subject: number | null;
  subject_choices: number[];
  initial_students: number[];
  is_active: boolean;
  user_permissions_id?: number[];
  groups_id?: number[];
};

export type TDataForSpecificEmployee = Omit<TAddEmployeeFormData, TKeysToOmit> & {
  groups: { id: number; name: string }[];
  user_permissions: { id: number; codename: string }[];
  is_active: boolean;
  subject_choices_response: { id: number; name_ar: string, name_en: string }[];
  initial_students_response: {
    id: number;
    student_name: string,
    email: string,
    mobile_phone: string,
    status: string
  }[];
}

