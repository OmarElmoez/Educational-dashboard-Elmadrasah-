import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useComponentLoading } from "@/hooks";

import styles from "../login.module.css";
import { useNavigate } from "react-router-dom";
const { loginBox, formInput } = styles;

const ConfirmEmailSchema = z.object({
  email: z
  .string()
  .trim()
  .min(1, "برجاء ادخال البريد الالكتروني")
  .email("البريد الإكتروني غير صحيح"),
});

type TFormData = z.infer<typeof ConfirmEmailSchema>;

const ConfirmEmail = () => {

  const {isPending, setPending, setSucceeded} = useComponentLoading();

  const navigate = useNavigate();

  const {register, handleSubmit, formState: {errors}} = useForm<TFormData>(
    {
      resolver: zodResolver(ConfirmEmailSchema),
    }
  );

  const onSubmit = (data: TFormData) => {
    setPending();
    console.log('confirm email page: ', data)
    setTimeout(() => {
      setSucceeded();
      navigate('/otp-code', {
        state: {
          data
        },
      })
    }, 500)
  }

  return (
    <article className={loginBox}>
      <h2>برجاء ادخال البريد الالكتروني للتحقق</h2>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className={formInput} style={{marginTop: '0'}} {...register("email")} placeholder="البريد الالكتروني" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? "جاري الارسال..." : "ارسال OTP"}
        </button>
      </form>
    </article>
  );
};

export default ConfirmEmail;