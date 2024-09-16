import {z} from "zod";

const SetPasswordSchema = z.object({
  new_password: z
    .string()
    .trim()
    .min(1, "برجاء ادخال كلمة المرور"),
  confirmPassword: z
    .string()
    .trim()
    .min(1, "برجاء تأكيد كلمة المرور")
}).refine(data => data.new_password === data.confirmPassword, {
  message: "كلمة المرور غير متطابقة",
  path: ["confirmPassword"]
});

export type TFormValues = z.infer<typeof SetPasswordSchema>;



export default SetPasswordSchema