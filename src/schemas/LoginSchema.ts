import {z} from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "برجاء ادخال البريد الالكتروني")
    .email("برجاء ادخال بريد الكتروني صالح"),
  password: z
    .string()
    .trim()
    .optional()
});

export type TFormData = z.infer<typeof LoginSchema>;



export default LoginSchema