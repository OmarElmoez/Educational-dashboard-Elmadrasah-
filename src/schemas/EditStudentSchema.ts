import { z } from "zod";
import { matchIsValidTel } from "mui-tel-input";

export const EditStudentSchema = z.object({
  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().min(1, "برجاء ادخال الاسم بالكامل"),
  email: z
  .string()
  .min(1, "برجاء ادخال البريد الإلكتروني")
  .email("برجاء ادخال بريد إلكتروني صحيح"),
  status: z.union([z.string(), z.boolean()]),
  mobile_phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),
  address: z.string().optional(),
  subject_choices: z.array(z.union([z.string(), z.number()])).min(1, {message: 'يجب علي الاقل اختيار مادة.'}),
  initial_services: z.array(z.union([z.string(), z.number()])).min(1, {message: 'يجب علي الاقل اختيار خدمة.'}),
  billing_method: z.string().min(1, "برجاء اختيار طريقة الدفع"),
  student_cost: z.string().optional(),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
})

export type TEditStudentSchema = z.infer<typeof EditStudentSchema>;