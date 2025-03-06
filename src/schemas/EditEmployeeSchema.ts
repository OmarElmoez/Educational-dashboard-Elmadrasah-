import { z } from 'zod';
import { matchIsValidTel } from 'mui-tel-input';

export const EditEmployeeSchema = z.object({
  is_active: z.string().min(1, "برجاء اختيار الحالة"),
  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().min(1, "برجاء ادخال الاسم الكامل"),
  email: z
    .string()
    .min(1, "برجاء ادخال البريد الإلكتروني")
    .email("برجاء ادخال بريد إلكتروني صحيح"),

  phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  wage_type: z.string(),
  work_wage_type: z.string(),
//   uploaded_pp: z.array(z.instanceof(File)),
//   uploaded_cv: z.array(z.instanceof(File)),
//   uploaded_id: z.array(z.instanceof(File)),
//   uploaded_passport: z.array(z.instanceof(File)),
//   national_id_expiration_date: z
//     .string()
//     .min(1, "برجاء ادخال تاريخ انتهاء الهوية"),
//   passport_expiration_date: z
//     .string()
//     .min(1, "برجاء ادخال تاريخ انتهاء جواز السفر"),

  subject_choices: z.array(z.string()),
  position: z.string().min(1, "برجاء ادخال المسمى"),
  initial_students: z.array(z.string()),
  employee_wage: z.string().optional(),
  work_wage: z.string().optional(),
  user_permissions_id: z.array(z.string()).optional(),
  groups_id: z.array(z.string()).optional(),
})
export type TEditEmployeeForm = z.infer<typeof EditEmployeeSchema>;