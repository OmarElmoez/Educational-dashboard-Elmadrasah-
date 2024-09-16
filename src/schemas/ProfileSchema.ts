import { z } from "zod";

export const ProfileSchema = z.object({
  first_name: z.string().trim().min(1, "برجاء ادخال الاسم"),
  last_name: z.string().trim().min(1, "برجاء ادخال اللقب"),
  email: z
    .string()
    .trim()
    .min(1, "برجاء ادخال البريد الالكتروني")
    .email("برجاء ادخال بريد الكتروني صالح")
    .nullable(),
  phone: z.string().trim().min(1, "برجاء ادخال رقم الهاتف"),
  birth_date: z.string().optional(),
  gender: z.string().nullable().optional(),
  image: z.instanceof(File).optional(),
})

export type TProfile = z.infer<typeof ProfileSchema>;