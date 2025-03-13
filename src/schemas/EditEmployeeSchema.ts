import { z } from 'zod';
import { matchIsValidTel } from 'mui-tel-input';

export const EditEmployeeSchema = z.object({
  is_active: z.union([z.string(), z.boolean()]),
  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().optional(),
  email: z
    .string()
    .min(1, "برجاء ادخال البريد الإلكتروني")
    .email("برجاء ادخال بريد إلكتروني صحيح"),

  phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  wage_type: z.string().min(1, {message: 'برجاء تحديد نوع اجر الدرس'}),
  work_wage_type: z.string().min(1, {message: 'برجاء تحديد نوع الاجر غير التدريسي'}),
  uploaded_pp: z.array(z.instanceof(File)).optional(),
  uploaded_cv: z.array(z.instanceof(File)).optional(),
  uploaded_id: z.array(z.instanceof(File)).optional(),
  uploaded_passport: z.array(z.instanceof(File)).optional(),
  national_id_expiration_date: z
    .string()
    .optional(),
  passport_expiration_date: z
    .string()
    .optional(),

  subject_choices: z.array(z.union([z.string(), z.number()])).min(1, {message: 'يجب علي الاقل اختيار مادة.'}),
  position: z.string().min(1, "برجاء ادخال المسمى"),
  initial_students: z.array(z.union([z.string(), z.number()])).min(1, {message: 'يرجي تحديد الطلاب.'}),
  employee_wage: z.string().optional(),
  work_wage: z.string().optional(),
  user_permissions_id: z.array(z.union([z.string(), z.number()])).optional(),
  groups_id: z.array(z.union([z.string(), z.number()])).optional(),
})

export type TEditEmployeeForm = z.infer<typeof EditEmployeeSchema>;