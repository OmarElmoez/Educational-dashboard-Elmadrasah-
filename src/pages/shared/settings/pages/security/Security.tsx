import { Success } from "@/components";
import styles from "./security.module.css";

const { title, desc, form, row, group, content, saveChangesBtn } = styles;

const Security = () => {
  const isSuccess = false;
  return (
    <>
      <section className={content}>
        <h1 className={title}>تغيير كلمة المرور</h1>
        {!isSuccess && (
          <>
            <p className={desc}>
              قم بإنشاء كلمة مرور جديدة مكونة من 8 أحرف على الأقل.
            </p>
            <form action="" className={form}>
              <section className={row}>
                <div className={group}>
                  <label htmlFor="current_password">
                    ادخل كلمة المرور الحالية
                  </label>
                  <input type="password" id="current_password" />
                </div>
                <div className={group}></div>
              </section>
              <section className={row}>
                <div className={group}>
                  <label htmlFor="new_password">ادخل كلمة المرور الجديدة</label>
                  <input type="password" id="new_password" />
                </div>
                <div className={group}>
                  <label htmlFor="confirm_password">
                    تاكيد كلمة المرور الجديدة
                  </label>
                  <input type="password" id="confirm_password" />
                </div>
              </section>
              <div className={saveChangesBtn}>
              <button type="submit">حفظ التغييرات</button>
              </div>
            </form>
          </>
        )}
        {isSuccess && <Success text="تم تغيير كلمة المرور بنجاح" />}
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
