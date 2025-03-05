import { z } from "zod";
import { matchIsValidTel } from "mui-tel-input";

export const EditStudentSchema = z.object({
  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().min(1, "برجاء ادخال الاسم الكامل").nullable(),
  email: z
  .string()
  .min(1, "برجاء ادخال البريد الإلكتروني")
  .email("برجاء ادخال بريد إلكتروني صحيح"),
  status: z.boolean(),
  mobile_phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),
  address: z.string().optional(),
  subject_choices: z.array(z.union([z.string(), z.number()])),
  initial_services: z.array(z.union([z.string(), z.number()])),
  billing_method: z.string().min(1, "برجاء اختيار طريقة الدفع"),
  student_cost: z.string().optional(),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
})

export type TEditStudentSchema = z.infer<typeof EditStudentSchema>;