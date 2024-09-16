import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod";

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
  default_subject: z.union([z.string(), z.number()]),
  is_active: z.union([z.boolean(), z.string()]),
  phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),
  home_phone: z.string().refine((value) => {
    // This regex only allows digits, spaces, dashes, and a plus sign at the start
    return /^[+]?[\d\s-]+$/.test(value);
  }, {
    message: "برجاء ادخال رقم هاتف صحيح",
  }),
  uploaded_pp: z.array(z.instanceof(File)),
  uploaded_cv: z.array(z.instanceof(File)),
  uploaded_id: z.array(z.instanceof(File)),
  uploaded_passport: z.array(z.instanceof(File)),
  state: z.string().min(1, "برجاء اختيار الولاية/المحافظة"),
  city: z.string().min(1, "برجاء اختيار المدينة"),
  country: z.string().min(1, "برجاء اختيار الدولة"),
  timezone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  address: z.string().min(1, "برجاء ادخال العنوان"),
  address_2: z.string().min(1, "برجاء ادخال العنوان"),
  zip: z.string().min(1, "برجاء ادخال الرمز البريدي"),
  additional_notes: z.string().optional(),
  bio: z.string().optional(),
  birth_date: z.string().min(1, "برجاء ادخال تاريخ الميلاد"),
  hire_date: z.string().min(1, "برجاء ادخال تاريخ التوظيف"),
  national_id_expiration_date: z.string().min(1, "برجاء ادخال تاريخ انتهاء الهوية"),
  passport_expiration_date: z.string().min(1, "برجاء ادخال تاريخ انتهاء جواز السفر"),
  place_of_birth: z.string().min(1, "برجاء ادخال مكان الميلاد"),
  subject_choices: z.array(z.union([z.string(), z.number()])).optional(),
  position: z.string().min(1, "برجاء ادخال المسمى"),
  // city: z.enum(cityOptions, {
  //   errorMap: () => ({ message: "برجاء ادخال المدينة" }),
  // })
  // phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  // dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
  //   message: 'Invalid date format',
  // }),
  // department: z.string().min(1, 'Department is required'),
  // position: z.string().min(1, 'Position is required'),
  // salary: z.number().positive('Salary must be a positive number'),
  // startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
  //   message: 'Invalid date format',
  // }),
});

export type TAddEmployeeFormData = z.infer<typeof AddEmployeeSchema>;
