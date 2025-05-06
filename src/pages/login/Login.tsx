import {  SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import LoginSchema, { TFormData } from "@/schemas/LoginSchema";

import styles from "./login.module.css";
import Logo from '@/assets/logo.png'

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actAuthLogin, actGoogleLogin } from "@/store/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { actGetReviewQuestions } from "@/store/review-questions/reviewSlice";
import actFCMLogin from "@/store/FCM/act/actFCMLogin";
import { useFirebaseMessaging } from "@/hooks";
import {useFeedback} from "@/store/context";

const { loginBox, loginWithBox, actionsBox, formInput, logo } = styles;

const Login = () => {
  const { loading, error } = useAppSelector((state) => state.auth);

  const { fcmToken } = useFirebaseMessaging();

  const dispatch = useAppDispatch();

  const { openFeedbackModal } = useFeedback();

  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<TFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<TFormData> = (data) => {
    dispatch(actAuthLogin(data))
      .unwrap()
      .then((res: any) => {
        if(res.status === 400) {
          openFeedbackModal("failed", JSON.parse(res.response).error)
          return;
        }
        if (res.password === '') {
          navigate(`/set-password`);
        } else {
          if (res.user?.phone === null) {
            navigate("/set-phoneNumber");
            return;
          }
          if (res.user.user_type !== 'Admin') {
          dispatch(actGetReviewQuestions());
          }
          if (fcmToken) {
            dispatch(
              actFCMLogin({ FCM_token: fcmToken })
            );
          }
          navigate(`/${res.user?.user_type?.toLowerCase()}`, {
            replace: true,
          });
        }
      });
  };

  const googleLoginHandler = (credential: string) => {
    dispatch(actGoogleLogin(credential))
      .unwrap()
      .then((data) => {
        if (data.user_type && data.phone) {
          navigate(`/${data.user_type?.toLowerCase()}`, { replace: true });
        } else {
          openFeedbackModal('failed', "you are not registered yet")
        }
      });
  };

  return (
    <article className={loginBox}>
      <div className={logo}>
        <img src={Logo} alt="Logo" />
      </div>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className={formInput} {...register("email")} placeholder="البريد الالكتروني" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input type="password" className={formInput} {...register("password")} placeholder="كلمة المرور" />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <Link to="#">هل نسيت كلمة المرور؟</Link>
        <button type="submit" disabled={loading === "pending"}>
          {loading === "pending" ? "جاري التسجيل..." : "تسجيل الدخول"}
        </button>
        {error && (
          <p className="error" style={{ textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>
      <div className={loginWithBox}>
        <p>
          <span>أو</span>
        </p>
        <div className={actionsBox}>
          <div>
            <GoogleLogin
              onSuccess={({ credential }) => {
                googleLoginHandler(credential as string);
              }}
              onError={() => {
                openFeedbackModal('failed', "Login Failed")
              }}
            />
          </div>
          {/* <button>
            Apple
            <AppleIcon />
          </button> */}
        </div>
      </div>
    </article>
  );
};

export default Login;
