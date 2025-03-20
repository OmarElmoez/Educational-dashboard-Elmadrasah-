import { z } from 'zod';
import { matchIsValidTel } from 'mui-tel-input';

export const EditEmployeeSchema = z.object({
  is_active: z.union([z.string(), z.boolean()]),
  employee_type: z.string().optional(),
  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().min(1, "برجاء ادخال الاسم بالكامل"),
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
  subject_choices: z.array(z.union([z.string(), z.number()])),
  position: z.string().min(1, "برجاء ادخال المسمى"),
  initial_students: z.array(z.union([z.string(), z.number()])),
  employee_wage: z.string().optional(),
  work_wage: z.string().optional(),
  user_permissions_id: z.array(z.union([z.string(), z.number()])).optional(),
  groups_id: z.array(z.union([z.string(), z.number()])).optional(),
  create_events: z.boolean().optional(),
}).refine(data => {
  return data?.employee_type === 'Staff' || data?.initial_students.length >= 1;
},
  {
    message: "يرجي تحديد الطلاب.",
    path: ["initial_students"]
  }).refine(data => {
  return data?.employee_type === 'Staff' || data?.subject_choices.length >= 1;
},
  {
    message: 'يجب علي الاقل اختيار مادة.',
    path: ["subject_choices"]
  }).refine(data => {
  return data?.employee_type === 'Staff' || data?.work_wage_type !== '';
},
  {
    message: 'برجاء تحديد نوع الاجر غير التدريسي',
    path: ["work_wage_type"]
  }).refine(data => {
  return data?.employee_type === 'Staff' || data?.wage_type !== '';
},
  {
    message: 'برجاء تحديد نوع اجر الدرس',
    path: ["wage_type"]
  })

export type TEditEmployeeForm = z.infer<typeof EditEmployeeSchema>;