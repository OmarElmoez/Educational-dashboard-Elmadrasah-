import { z } from "zod";
import { matchIsValidTel } from "mui-tel-input";

export const EditFamilySchema = z.object({
  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().optional(),
  email: z
  .string()
  .min(1, "برجاء ادخال البريد الإلكتروني")
  .email("برجاء ادخال بريد إلكتروني صحيح"),
  status: z.union([z.string(), z.boolean()]),
  mobile_phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),
  time_zone: z.string().optional(),
})

export type TEditFamilySchema = z.infer<typeof EditFamilySchema>;