import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod";

// Define the time entry schema for each item in the field array
const TimeEntrySchema = z.object({
  day: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  description: z.string().optional(),
});

export const AddEmployeeSchema = z.object({
  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().min(1, "برجاء ادخال الاسم الكامل"),
  email: z
    .string()
    .min(1, "برجاء ادخال البريد الإلكتروني")
    .email("برجاء ادخال بريد إلكتروني صحيح"),
  employee_type: z.string().min(1, "برجاء اختيار نوع الموظف"),
  title: z.string().min(1, "برجاء اختيار اللقب"),
  wage_type: z.string().min(1, "برجاء اختيار نوع الأجر"),
  work_wage_type: z.string().min(1, "برجاء اختيار نوع الأجر"),
  default_subject: z.string().min(1, "برجاء اختيار المادة"),
  is_active: z.string().min(1, "برجاء اختيار الحالة"),
  phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),
  home_phone: z
    .string()
    .refine(
      (value) => {
        // This regex only allows digits, spaces, dashes, and a plus sign at the start
        return /^[+]?[\d\s-]+$/.test(value);
      },
      {
        message: "برجاء ادخال رقم هاتف صحيح",
      }
    )
    .optional(),
  uploaded_pp: z.array(z.instanceof(File)),
  uploaded_cv: z.array(z.instanceof(File)),
  uploaded_id: z.array(z.instanceof(File)),
  uploaded_passport: z.array(z.instanceof(File)),
  state: z.string().min(1, "برجاء اختيار الولاية/المحافظة"),
  city: z.string().min(1, "برجاء اختيار المدينة"),
  country: z.string().min(1, "برجاء اختيار الدولة"),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  address: z.string().min(1, "برجاء ادخال العنوان").optional(),
  address_2: z.string().min(1, "برجاء ادخال العنوان").optional(),
  zip: z.string().min(1, "برجاء ادخال الرمز البريدي"),
  additional_notes: z.string().optional(),
  bio: z.string().optional(),
  birth_date: z.string().min(1, "برجاء ادخال تاريخ الميلاد"),
  hire_date: z.string().min(1, "برجاء ادخال تاريخ التوظيف"),
  national_id_expiration_date: z
    .string()
    .min(1, "برجاء ادخال تاريخ انتهاء الهوية"),
  passport_expiration_date: z
    .string()
    .min(1, "برجاء ادخال تاريخ انتهاء جواز السفر"),
  place_of_birth: z.string().min(1, "برجاء ادخال مكان الميلاد"),
  subject_choices: z.array(z.string()).min(1, "برجاء اختيار مادة"),
  initial_students: z.array(z.string()).min(1, "برجاء اختيار طلاب"),
  position: z.string().min(1, "برجاء ادخال المسمى"),
  link: z.string().optional(),
  employee_wage: z.string().min(1, "برجاء ادخال الأجر").optional(),
  work_wage: z.string().min(1, "برجاء ادخال الأجر").optional(),
  calendar_color: z.string().min(1, "برجاء اختيار لون التقويم"),
  calendar_setting: z.enum(["Day", "Month", "Week"], {
    errorMap: () => ({ message: "برجاء اختيار اعدادات التقويم" }),
  }),
  availabilities: z.array(TimeEntrySchema),
  calendar_color_by: z.enum(["Student", "Website", "Lesson"], {
    errorMap: () => ({ message: "برجاء اختيار درس التقويم" }),
  }),
  sms_lesson_reminders: z.boolean().refine((val) => typeof val === "boolean", {
    message: "برجاء اختيار الحالة",
  }),
  email_lesson_reminders: z
    .boolean()
    .refine((val) => typeof val === "boolean", {
      message: "برجاء اختيار الحالة",
    }),
  whatsapp_reminders: z.boolean().refine((val) => typeof val === "boolean", {
    message: "برجاء اختيار الحالة",
  }),
  app_reminders: z.boolean().refine((val) => typeof val === "boolean", {
    message: "برجاء اختيار الحالة",
  }),
  web_reminders: z.boolean().refine((val) => typeof val === "boolean", {
    message: "برجاء اختيار الحالة",
  }),
  send_welcome_email: z.boolean().refine((val) => typeof val === "boolean", {
    message: "برجاء اختيار الحالة",
  }),
  user_account: z.boolean().refine((val) => typeof val === "boolean", {
    message: "برجاء اختيار الحالة",
  }),
});

export type TAddEmployeeFormData = z.infer<typeof AddEmployeeSchema>;

type TKeysToOmit =
  | "default_subject"
  | "subject_choices"
  | "is_active"
  | "initial_students"

export type TAddEmployeeFormDataForServer = Omit<
  TAddEmployeeFormData,
  TKeysToOmit
> & {
  default_subject: number;
  subject_choices: number[];
  initial_students: number[];
  is_active: boolean;
};
