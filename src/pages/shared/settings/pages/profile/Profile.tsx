import styles from "./profile.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UploadPhoto } from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileSchema, TProfile } from "@/schemas/ProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  actGetUserProfile,
  actUpdateUserProfile,
} from "@/store/profile/ProfileSlice";
import { useCallback, useEffect } from "react";

const { form, row, content } = styles;

const Profile = () => {
  const { loading } = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue, reset } = useForm<TProfile>({
    mode: "onBlur",
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit: SubmitHandler<TProfile> = (data) => {
    dispatch(actUpdateUserProfile({ formData: data }))
      .unwrap()
      .then(() => {
        getUserData();
      });
  };

  const getUserData = useCallback(() => {
    dispatch(actGetUserProfile())
      .unwrap()
      .then((data) => {
        reset({
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          phone: data.user.phone,
          birth_date: data.user.birth_date,
          gender: data.user.gender,
        });
      });
  }, [dispatch, reset]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <section className={content}>
      <form method="post" className={form} onSubmit={handleSubmit(onSubmit)}>
        <UploadPhoto register={register} name="image" setValue={setValue} />
        <section className={row}>
          <div className="group">
            <label htmlFor="firstName">الاسم الأول</label>
            <input
              type="text"
              className="inputField"
              id="firstName"
              {...register("first_name")}
            />{" "}
          </div>

          <div className="group">
            <label htmlFor="lastName">الاسم الأخير</label>
            <input
              type="text"
              className="inputField"
              id="lastName"
              {...register("last_name")}
            />
          </div>
        </section>

        <section className={row}>
          <div className="group">
            <label htmlFor="email">البريد الإلكترونى</label>
            <input
              type="text"
              className="inputField"
              id="email"
              {...register("email")}
              disabled
            />
          </div>
          <div className="group">
            <label htmlFor="mobile">رقم الموبايل</label>
            <input
              type="tel"
              className="inputField"
              id="mobile"
              {...register("phone")}
            />
          </div>
        </section>

        <section className={row}>
          <div className="group">
            <label htmlFor="gender">الجنس</label>
            <input
              type="text"
              className="inputField"
              id="gender"
              placeholder="ذكر - انثى"
              {...register("gender")}
              disabled
            />
          </div>
          <div className="group">
            <label htmlFor="birth_date">تاريخ الميلاد</label>
            <input
              type="date"
              className="inputField"
              id="birth_date"
              {...register("birth_date")}
            />
          </div>
        </section>

        <button type="submit" disabled={loading === "pending"}>
          {loading === "pending" ? "جاري الحفظ..." : "حفظ"}
        </button>
        {/* <input type="submit" value="حفظ" onClick={() => console.log('you click')} /> */}
        {loading === "failed" && (
          <p className="error" style={{ marginTop: "1rem" }}>
            لم يتم الحفظ
          </p>
        )}
      </form>
    </section>
  );
};

export default Profile;
