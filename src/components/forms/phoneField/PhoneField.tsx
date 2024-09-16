import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

const PhoneField = <T extends FieldValues>({
  control,
  name = "phone" as Path<T>,
  error,
  label,
  isRequired
}: {
  control: Control<T>;
  name?: Path<T>;
  error?: string;
  label?: string;
  isRequired?: boolean;
}) => {

  return (
    <article className="group">
      {label && <label className="adminFormLabel" htmlFor={name}>{label}   {isRequired && <span className="required-star" > * </span>}</label>}
      <Controller
        control={control}
        rules={{
          required: "برجاء ادخال رقم الهاتف",
          validate: (value) => matchIsValidTel(value),
        }}
        render={({ field, fieldState }) => (
          <MuiTelInput
            {...field}
            defaultCountry="EG"
            helperText={
              !field.value && fieldState.invalid
                ? "برجاء ادخال رقم الهاتف"
                : (fieldState.invalid && error) ?? ""
            }
            error={fieldState.invalid}
            id={name}
          />
        )}
        name={name}
      />
    </article>
  );
};
export default PhoneField;
