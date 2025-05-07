import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./login.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actUpdatePhone from "@/store/auth/act/actUpdatePhone";
import { useNavigate } from "react-router-dom";
import { PhoneField } from "@/components";

export type TPhone = {
  phoneNumber: string;
  token: string;
};

const PhoneNumber = () => {
  const { loginBox } = styles;
  const { control, handleSubmit } = useForm<TPhone>();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TPhone> = (data) => {
    data["token"] = user?.token || "";
    dispatch(actUpdatePhone(data))
      .unwrap()
      .then(
        () => user?.user_type && navigate(`/${user.user_type.toLowerCase()}`)
      );
  };

  return (
    <article className={loginBox}>
      <h2>رقم الهاتف</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PhoneField control={control} error={"رقم الهاتف غير صالح"} name="phoneNumber" />
        <button type="submit">
          {/* {loading === "pending" ? "جاري التسجيل..." : "تسجيل الدخول"} */}
          تسجيل الدخول
        </button>
      </form>
    </article>
  );
};

export default PhoneNumber;