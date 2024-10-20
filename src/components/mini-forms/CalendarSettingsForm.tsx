import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { RadioField, Row, ColorField } from "@/components";

export interface TCalendarSettingsFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: (name: Path<T>, value: string) => void;
  errors: FieldErrors<T>;
  disabled?: boolean;
  fields: {
    label: string;
    name: string;
    options: { label: string; value: string }[];
  }[]
}

const CalendarSettingsForm = <T extends FieldValues>({
  register,
  setValue,
  errors,
  disabled = false,
  fields
}: TCalendarSettingsFormProps<T>) => {
  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        {fields.map((field) => (
          <RadioField
            key={field.name}
            name={field.name as Path<T>}
            label={field.label}
            options={field.options}
            register={register}
            disabled={disabled}
            error={errors[field.name as Path<T>]?.message as string}
          />
        ))}
      </Row>
      <Row>
        <ColorField
          label="لون التقويم"
          register={register}
          setValue={setValue}
          disabled={disabled}
          name={"calendar_color" as Path<T>}
          error={errors.calendar_color?.message as string}
        />
      </Row>

      <hr className="hr" />
    </>
  );
};

export default CalendarSettingsForm;
