import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import {
  SingleCheckbox,
  Heading,
  InputField,
  RadioField,
  Row,
} from "@/components";

export interface TCalendarSettingsFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  calendar_setting: Path<T>;
  calendar_color_by: Path<T>;
  calendar_color: Path<T>;
  sms_lesson_reminders: Path<T>;
  email_lesson_reminders: Path<T>;
  whatsapp_reminders: Path<T>;
  app_reminders: Path<T>;
  web_reminders: Path<T>;
  user_account: Path<T>;
  send_welcome_email: Path<T>;
  errors: any;
}

const CalendarSettingsForm = <T extends FieldValues>({
  register,
  calendar_setting,
  calendar_color_by,
  calendar_color,
  sms_lesson_reminders,
  email_lesson_reminders,
  whatsapp_reminders,
  app_reminders,
  web_reminders,
  user_account,
  send_welcome_email,
  errors,
}: TCalendarSettingsFormProps<T>) => {
  return (
    <div>
      <Heading text="التقويم" />
      <div className="mainContainer flex-wrap">
        <RadioField
          name={calendar_setting}
          label="إعدادات التقويم"
          options={[
            { label: "شهر", value: "Month" },
            { label: "اسبوع", value: "Week" },
            { label: "يوم", value: "Day" },
          ]}
          register={register}
          error={errors.calendar_setting?.message}
          isRequired={true}
          className="flex-1"
        />
        <RadioField
          name={calendar_color_by}
          label="درس التقويم اللون حسب "
          options={[
            { label: "طالب", value: "Student" },
            { label: "موقع", value: "Website" },
            { label: "درس", value: "Lesson" },
          ]}
          register={register}
          error={errors.calendar_color_by?.message}
          isRequired={true}
          className="flex-1"
        />
      </div>
      <Row>
        <InputField
          type="color"
          label="لون التقويم"
          placeholder="#1C8A44 "
          register={register}
          name={calendar_color}
          error={errors.calendar_color?.message as string}
        />
        <article className="group"></article>
      </Row>

      <hr className="hr" />
      <br />

      <Heading text="إشعارات الدرس" />
      <div className="mainContainer flex-wrap">
        <SingleCheckbox
          className="flex-1"
          register={register}
          name={sms_lesson_reminders}
          label="تفعيل تذكيرات الدروس"
          isRequired={true}
          error={errors.sms_lesson_reminders?.message}
        />
        <SingleCheckbox
          className="flex-2"
          register={register}
          name={email_lesson_reminders}
          label="تلقي رسائل البريد الإلكتروني الخاصة بملاحظات الدروس"
          isRequired={true}
          error={errors.sms_lesson_reminders?.message}
        />
      </div>
      <div className="mainContainer flex-wrap">
        <SingleCheckbox
          className="flex-1"
          register={register}
          name={whatsapp_reminders}
          label="تفعيل إشعارات الواتساب"
          isRequired={true}
          error={errors.sms_lesson_reminders?.message}
        />

        <SingleCheckbox
          className="flex-1"
          register={register}
          name={app_reminders}
          label="تفعيل إشعارات التطبيق"
          isRequired={true}
          error={errors.sms_lesson_reminders?.message}
        />
        <SingleCheckbox
          className="flex-1"
          register={register}
          name={web_reminders}
          label="تفعيل اشعارات الويب"
          isRequired={true}
          error={errors.sms_lesson_reminders?.message}
        />
      </div>
      <br />
      <Heading text="إشعارات الترحيب" />
      <SingleCheckbox
        register={register}
        name={send_welcome_email}
        label="إرسال بريد إلكتروني ترحيبي"
        isRequired={true}
        error={errors.sms_lesson_reminders?.message}
      />

      <br />

      <Heading text="حساب المستخدم" />
      <div className="flex-start-center">
        <SingleCheckbox
          register={register}
          name={user_account}
          label="تمكين حساب المستخدم"
          isRequired={true}
          error={errors.sms_lesson_reminders?.message}
        />
        <span className="helper-text">
          يسمح حساب المستخدم للطالب باستخدام عنوان بريده الإلكتروني لتسجيل
          الدخول إلى حسابه الشخصي.يلغي
        </span>
      </div>
    </div>
  );
};

export default CalendarSettingsForm;
