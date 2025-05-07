import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./login.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import SetPasswordSchema, { TFormValues } from "@/schemas/SetPasswordSchema";
import { useLocation, useNavigate } from "react-router-dom";
import { actSetPassword } from "@/store/auth/authSlice.ts";
import ResetPasswordServices from "@/services/resetPassword";

const { loginBox, formInput } = styles;
export type TFormValuesWithEmail = TFormValues & {
  email: string;
};
const SetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { modified_email } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TFormValuesWithEmail>({
    mode: "onBlur",
    resolver: zodResolver(SetPasswordSchema),
  });
  const { state } = location;
  const onSubmit: SubmitHandler<TFormValuesWithEmail> = async (data) => {
    if (state.submittedData) {
      const updatedData = state.submittedData;
      updatedData["password"] = data.new_password;
      await ResetPasswordServices.resetNewPassword(updatedData).then((res) => {
        if (res?.status === 201) {
          navigate("/");
        }
      });
    } else {
      if (modified_email) {
        data["email"] = modified_email;
      }
      dispatch(actSetPassword(data))
        .unwrap()
        .then(
          (data) =>
            data.user.user_type &&
            navigate(`/${data.user.user_type.toLowerCase()}`)
        );
    }
  };

  return (
    <article className={loginBox}>
      <h2>تعيين كلمة المرور</h2>
      <p>من فضلك، قم بإدخال كلمة المرور الجديدة وتأكيدها لضمان أمان حسابك.</p>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
          className={formInput}
          style={{ marginTop: 0 }}
          {...register("new_password")}
          placeholder="كلمة المرور"
        />
        {errors.new_password && (
          <p className="error" style={{ marginTop: "0.5rem" }}>
            {errors.new_password.message}
          </p>
        )}

        <input
          type="password"
          className={formInput}
          style={{ marginTop: "1.6rem" }}
          {...register("confirmPassword")}
          placeholder="تاكيد كلمة المرور"
        />
        {errors.confirmPassword && (
          <p className="error" style={{ marginTop: "0.5rem" }}>
            {errors.confirmPassword.message}
          </p>
        )}

        <button type="submit">حفظ كلمة المرور</button>
      </form>
    </article>
  );
};

export default SetPassword;
