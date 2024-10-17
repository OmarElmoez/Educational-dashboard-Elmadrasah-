import {
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { SingleCheckbox, Heading, CheckBoxesGroup } from "@/components";
import { LESSON_CHECK_BOXES } from "@/constants/checkbox-options";

export interface TNotificationFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;

}

const NotificationForm = <T extends FieldValues>({
  register,
}: TNotificationFormProps<T>) => {
  return (
    <>
      <Heading text="إشعارات الدرس" />
      <CheckBoxesGroup
        options={LESSON_CHECK_BOXES}
        register={register}
        style={{
          width: "85%",
          columnGap: "20rem",
          rowGap: "2.6rem",
          flexWrap: "wrap",
        }}
      />
      
      <hr className="hr" />

      <Heading text="حساب المستخدم" />
      <div className="flex-start-center">
        <SingleCheckbox
          register={register}
          name={"user_account" as Path<T>}
          label="تمكين حساب المستخدم"
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
