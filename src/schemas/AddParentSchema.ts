import { EmployeeTitleForSchema } from "@/constants";

import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod";

export const AddParentSchema = z.object({
  customer_type: z.string().optional(),
  // customer_type: z.enum(FamilyStatusForSchema as [string, ...string[]], {
  //   errorMap: () => ({ message: "برجاء اختيار نوع الموظف" }),
  // }),
  salutation: z.enum(EmployeeTitleForSchema as [string, ...string[]], {
    errorMap: () => ({ message: "برجاء اختيار اللقب" }),
  }),
  status: z.string().min(1, "برجاء اختيار الحالة"),
  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().min(1, "برجاء ادخال الاسم الكامل"),
  email: z
    .string()
    .min(1, "برجاء ادخال البريد الإلكتروني")
    .email("برجاء ادخال بريد إلكتروني صحيح"),

  mobile_phone: z.string().refine((phoneNumber) => {
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

  work_phone: z
    .string()
    .refine((phoneNumber) => {
      return matchIsValidTel(phoneNumber);
    }, "رقم الهاتف غير صالح")
    .optional(),
  address: z.string().min(1, "برجاء ادخال العنوان").optional(),
  address_2: z.string().min(1, "برجاء ادخال العنوان").optional(),

  country: z.string().min(1, "برجاء اختيار الدولة"),
  state: z.string().min(1, "برجاء اختيار الولاية/المحافظة"),
  city: z.string().min(1, "برجاء اختيار المدينة"),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  zip: z.string().min(1, "برجاء ادخال الرمز البريدي"),
  additional_notes: z.string().optional(),

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

export type TAddParentFormData = z.infer<typeof AddParentSchema>;

// type TKeysToOmit = 'status';

// export type TAddParentFormDataForServer = Omit<TAddParentFormData, TKeysToOmit> & {
//   status: boolean;
// };
