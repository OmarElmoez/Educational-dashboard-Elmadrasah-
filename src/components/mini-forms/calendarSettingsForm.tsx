import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { Heading, RadioField, Row, ColorField } from "@/components";

export interface TCalendarSettingsFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  calendar_setting: Path<T>;
  calendar_color_by: Path<T>;
  calendar_color: Path<T>;
  setValue: (name: Path<T>, value: string) => void;
  errors: FieldErrors<T>;
}

const CalendarSettingsForm = <T extends FieldValues>({
  register,
  calendar_setting,
  calendar_color_by,
  calendar_color,
  setValue,
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
          error={errors.calendar_setting?.message as string}
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
          error={errors.calendar_color_by?.message as string}
          isRequired={true}
          className="flex-1"
        />
      </div>
      <Row>
        <ColorField
          label="لون التقويم"
          register={register}
          setValue={setValue}
          name={calendar_color}
          error={errors.calendar_color?.message as string}
        />
      </Row>

      <hr className="hr" />
    </div>
  );
};

export default CalendarSettingsForm;
