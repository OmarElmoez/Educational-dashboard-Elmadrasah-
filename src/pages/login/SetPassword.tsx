import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./login.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import SetPasswordSchema, {
  TFormValues,
} from "@/schemas/SetPasswordSchema";
import { useNavigate } from "react-router-dom";
import { actSetPassword } from "@/store/auth/authSlice";

export type TFormValuesWithEmail = TFormValues & {
  email: string;
};
const SetPassword = () => {
  const { loginBox, hide } = styles;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {modified_email} = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValuesWithEmail>({
    mode: "onBlur",
    resolver: zodResolver(SetPasswordSchema),
  });



  const onSubmit: SubmitHandler<TFormValuesWithEmail> = (data) => {
    if (modified_email) {
      data["email"] = modified_email;
    }
    dispatch(actSetPassword(data))
      .unwrap()
      .then((data) => data.user.user_type &&  navigate(`/${data.user.user_type.toLowerCase()}`));
  };

  return (
    <article className={loginBox}>
      <h2>تعيين كلمة المرور</h2>
      <p>من فضلك، قم بإدخال كلمة المرور الجديدة وتأكيدها لضمان أمان حسابك.</p>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="new_password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <label htmlFor="new_password">
              <span className={field.value ? hide : ""}>كلمة المرور</span>
              <input type="password" id="new_password" {...field} />
            </label>
          )}
        />
        {errors.new_password && <p className="error">{errors.new_password.message}</p>}

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <label htmlFor="confirmPassword">
              <span className={field.value ? hide : ""}>تاكيد كلمة المرور</span>
              <input type="password" id="confirmPassword" {...field} />
            </label>
          )}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <button type="submit">
          {/* {loading === "pending" ? "جاري الحفظ..." : "حفظ كلمة المرور"} */}
          حفظ كلمة المرور
        </button>
        {/* {error && (
          <p className="error" style={{ textAlign: "center" }}>
            {error}
          </p>
        )} */}
      </form>
    </article>
  );
};

export default SetPassword;
