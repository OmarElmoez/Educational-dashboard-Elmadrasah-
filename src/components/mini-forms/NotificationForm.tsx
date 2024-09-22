import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { SingleCheckbox, Heading, Row } from "@/components";

export interface TNotificationFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  sms_lesson_reminders: Path<T>;
  email_lesson_reminders: Path<T>;
  whatsapp_reminders: Path<T>;
  app_reminders: Path<T>;
  web_reminders: Path<T>;
  user_account: Path<T>;
  // send_welcome_email: Path<T>;
  errors: FieldErrors<T>;
}

const NotificationForm = <T extends FieldValues>({
  register,
  sms_lesson_reminders,
  email_lesson_reminders,
  whatsapp_reminders,
  app_reminders,
  web_reminders,
  user_account,
  // send_welcome_email,
  errors,
}: TNotificationFormProps<T>) => {
  return (
    <>
      <Heading text="إشعارات الدرس" />
      <Row>
        <SingleCheckbox
          register={register}
          name={sms_lesson_reminders}
          label="تفعيل تذكيرات الدروس"

          error={errors.sms_lesson_reminders?.message as string}
        />
        <SingleCheckbox
          register={register}
          name={email_lesson_reminders}
          label="تلقي رسائل البريد الإلكتروني الخاصة بملاحظات الدروس"

          error={errors.email_lesson_reminders?.message as string}
        />
        <SingleCheckbox
          register={register}
          name={whatsapp_reminders}
          label="تفعيل إشعارات الواتساب"

          error={errors.whatsapp_reminders?.message as string}
        />
      </Row>
      <Row>
        <SingleCheckbox
          register={register}
          name={app_reminders}
          label="تفعيل إشعارات التطبيق"

          error={errors.app_reminders?.message as string}
        />
        <SingleCheckbox
          register={register}
          name={web_reminders}
          label="تفعيل اشعارات الويب"

          error={errors.web_reminders?.message as string}
        />
      </Row>
      {/* <hr className="hr" /> */}

      {/* <Heading text="إشعارات الترحيب" /> */}
      {/* <SingleCheckbox
        register={register}
        name={send_welcome_email}
        label="إرسال بريد إلكتروني ترحيبي"
        error={errors.send_welcome_email?.message as string}
      /> */}

      <hr className="hr" />

      <Heading text="حساب المستخدم" />
      <div className="flex-start-center">
        <SingleCheckbox
          register={register}
          name={user_account}
          label="تمكين حساب المستخدم"
          error={errors.user_account?.message as string}
        />
        <span className="helper-text">
          يسمح حساب المستخدم للطالب باستخدام عنوان بريده الإلكتروني لتسجيل
          الدخول إلى حسابه الشخصي.يلغي
        </span>
      </div>
    </>
  );
};

export default NotificationForm;
