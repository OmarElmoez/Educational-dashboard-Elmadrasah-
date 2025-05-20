import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useComponentLoading } from "@/hooks";
import styles from "../login.module.css";
import { useNavigate } from "react-router-dom";
import ResetPasswordServices from "@/services/resetPassword";
import { useFeedback } from "@/store/context";
const { loginBox, formInput } = styles;

const ConfirmEmailSchema = z.object({
  email: z
  .string()
  .trim()
  .min(1, "برجاء ادخال البريد الالكتروني")
  .email("البريد الإكتروني غير صحيح"),
});

export type TFormData = z.infer<typeof ConfirmEmailSchema>;

const ConfirmEmail = () => {

  const {isPending, setPending, setSucceeded, setFailed} = useComponentLoading();

  const navigate = useNavigate();


  const {register, handleSubmit, setError, formState: {errors}} = useForm<TFormData>(
    {
      resolver: zodResolver(ConfirmEmailSchema),
    }
  );

  const {openFeedbackModal} = useFeedback();

  const onSubmit = async (data: TFormData) => {
    setPending();
    await ResetPasswordServices.forgetPassword(data).then((res)=>{
      if(res?.status === 201) {
        setSucceeded();
        navigate('/otp-code', {
          state: {
            data
          },
        })
        return;
      }

      if(res?.status === 400) {
        setFailed();
        setError("email", {
          type: "manual",
          message: "البريد الإلكتروني غير صحيح" ,
        });
      return;
      }

      setFailed();
      openFeedbackModal('failed', "Failed to send OTP", "something went wrong, please try again later")
    })
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