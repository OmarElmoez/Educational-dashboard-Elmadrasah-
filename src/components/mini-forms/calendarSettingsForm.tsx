import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import {
  // CheckboxGroup,
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
  errors: any;
}

const CalendarSettingsForm = <T extends FieldValues>({
  register,
  calendar_setting,
  calendar_color_by,
  calendar_color,
  errors,
}: TCalendarSettingsFormProps<T>) => {
  return (
    <div>
      <Heading text="التقويم" />
      <Row>
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
        />
      </Row>
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
    </div>
  );
};

export default CalendarSettingsForm;
