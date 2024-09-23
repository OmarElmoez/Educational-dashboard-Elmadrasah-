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
  employee_type: z.string().min(1, "برجاء اختيار نوع الموظف"),
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
  home_phone: z
    .string()
    .refine(
      (value) => {
        // This regex only allows digits, spaces, dashes, and a plus sign at the start
        return /^[+]?[\d\s-]+$/.test(value);
      },
      { message: "برجاء ادخال رقم هاتف صحيح" }
    )
    .optional(),

  address: z.string().min(1, "برجاء ادخال العنوان").optional(),
  address_2: z.string().min(1, "برجاء ادخال العنوان").optional(),
  country: z.string().min(1, "برجاء اختيار الدولة").optional(),

  state: z.string().min(1, "برجاء اختيار الولاية/المحافظة").optional(),
  city: z.string().min(1, "برجاء اختيار المدينة").optional(),
  zip: z.string().min(1, "برجاء ادخال الرمز البريدي").optional(),
  additional_notes: z.string().optional(),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  birth_date: z.string().min(1, "برجاء ادخال تاريخ الميلاد"),
  place_of_birth: z.string().min(1, "برجاء ادخال مكان الميلاد"),

  wage_type: z.string().min(1, "برجاء اختيار نوع الأجر"),
  work_wage_type: z.string().min(1, "برجاء اختيار نوع الأجر"),
  default_subject: z.string().min(1, "برجاء اختيار المادة"),
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

  subject_choices: z.array(z.string()).min(1, "برجاء اختيار مادة"),
  position: z.string().min(1, "برجاء ادخال المسمى"),
  bio: z.string().optional().optional(),
  hire_date: z.string(),

  initial_students: z.array(z.string()).min(1, "برجاء اختيار طلاب"),
  link: z.string().optional(),
  employee_wage: z.string().min(1, "برجاء ادخال الأجر").optional(),
  work_wage: z.string().min(1, "برجاء ادخال الأجر").optional(),
  calendar_color: z.string().optional(),
  calendar_setting: z.enum(["Day", "Month", "Week"], {
    errorMap: () => ({ message: "برجاء اختيار اعدادات التقويم" }),
  }),
  availabilities: z.array(TimeEntrySchema),
  calendar_color_by: z.enum(["Student", "Website", "Lesson"], {
    errorMap: () => ({ message: "برجاء اختيار درس التقويم" }),
  }),
  sms_lesson_reminders: z.boolean().optional(),
  email_lesson_reminders: z.boolean().optional(),
  whatsapp_reminders: z.boolean().optional(),
  app_reminders: z.boolean().optional(),
  web_reminders: z.boolean().optional(),
  // send_welcome_email: z.boolean().optional(),
  user_account: z.boolean().optional(),
  is_superuser: z.boolean().optional(),
});

export type TAddEmployeeFormData = z.infer<typeof AddEmployeeSchema>;

type TKeysToOmit =
  | "default_subject"
  | "subject_choices"
  | "is_active"
  | "initial_students";

export type TAddEmployeeFormDataForServer = Omit<
  TAddEmployeeFormData,
  TKeysToOmit
> & {
  default_subject: number;
  subject_choices: Array<number>;
  initial_students: number[];
  is_active: boolean;
};
