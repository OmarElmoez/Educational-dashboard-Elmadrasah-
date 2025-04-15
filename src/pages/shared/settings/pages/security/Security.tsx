import React from "react";
import { useState } from "react";
import { Success } from "@/components";
import styles from "./security.module.css";
import actChangePassword from "@/store/auth/act/actChangePassword";
import { useAppDispatch } from "@/store/hooks.ts";
import { useFeedback } from "@/store/context";
const { title, desc, form, row, group, content, saveChangesBtn } = styles;
type TPasswordChange = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};
const Security = () => {
  const dispatch = useAppDispatch();
  const { openFeedbackModal } = useFeedback();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<TPasswordChange>({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [errors, setErrors] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    };

    if (!formData.old_password) {
      newErrors.old_password = "كلمة المرور الحالية مطلوبة";
      valid = false;
    }

    if (!formData.new_password) {
      newErrors.new_password = "كلمة المرور الجديدة مطلوبة";
      valid = false;
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل";
      valid = false;
    }

    if (!formData.confirm_new_password) {
      newErrors.confirm_new_password = "تأكيد كلمة المرور مطلوب";
      valid = false;
    } else if (formData.new_password !== formData.confirm_new_password) {
      newErrors.confirm_new_password = "كلمة المرور غير متطابقة";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(
        actChangePassword({
          old_password: formData.old_password,
          new_password: formData.new_password,
          confirm_new_password: formData.confirm_new_password,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsSuccess(true);
          setFormData({
            old_password: "",
            new_password: "",
            confirm_new_password: "",
          });
        } else if (res.meta.requestStatus === "rejected") {
          const errorMessage = res.payload as string;
          setErrors((prev) => ({
            ...prev,
            old_password: errorMessage.includes("wrong password")
              ? errorMessage
              : "",
            general: errorMessage,
          }));
          openFeedbackModal("failed", errorMessage);
        }
      });
    } catch (error) {
      console.error("Failed to change password:", error);
      setErrors((prev) => ({
        ...prev,
        general: "An unexpected error occurred",
      }));
    }
  };

  return (
    <>
      <section className={content}>
        <h1 className={title}>تغيير كلمة المرور</h1>
        {!isSuccess ? (
          <>
            <p className={desc}>
              قم بإنشاء كلمة مرور جديدة مكونة من 8 أحرف على الأقل.
            </p>
            <form onSubmit={handleSubmit} className={form}>
              <section className={row}>
                <div className={group}>
                  <label htmlFor="old_password">ادخل كلمة المرور الحالية</label>
                  <input
                    type="password"
                    id="old_password"
                    value={formData.old_password}
                    onChange={handleChange}
                  />
                  {errors.old_password && (
                    <span className="error">{errors.old_password}</span>
                  )}
                </div>
                <div className={group}></div>
              </section>
              <section className={row}>
                <div className={group}>
                  <label htmlFor="new_password">ادخل كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    id="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                  />
                  {errors.new_password && (
                    <span className="error">{errors.new_password}</span>
                  )}
                </div>
                <div className={group}>
                  <label htmlFor="confirm_new_password">
                    تاكيد كلمة المرور الجديدة
                  </label>
                  <input
                    type="password"
                    id="confirm_new_password"
                    value={formData.confirm_new_password}
                    onChange={handleChange}
                  />
                  {errors.confirm_new_password && (
                    <span className="error">{errors.confirm_new_password}</span>
                  )}
                </div>
              </section>
              <div className={saveChangesBtn}>
                <button type="submit">حفظ التغييرات</button>
              </div>
            </form>
          </>
        ) : (
          <Success text="تم تغيير كلمة المرور بنجاح" />
        )}
      </section>
      {/* 
      <section className={content}>
        <h1 className={title}>تغيير البريد الإلكترونى</h1>
        <form action="" className={form}>
          <section className={row}>
            <div className={group}>
              <label htmlFor="current_email">
                ادخل البريد الالكتروني الحالي
              </label>
              <input type="text" id="current_email" />
            </div>
            <div className={group}>
              <label htmlFor="new_email">ادخل البريد الالكتروني الجديد</label>
              <input type="text" id="new_email" />
            </div>
          </section>
          <button type="submit">حفظ</button>
        </form>
      </section> */}
    </>
  );
};

export default Security;
