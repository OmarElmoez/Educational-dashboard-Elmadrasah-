// import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";

const PhoneField = <T extends FieldValues>({
  control,
  name,
  error,
  label,
  isRequired,
}: {
  control: Control<T>;
  name: Path<T>;
  error?: string;
  label?: string;
  isRequired?: boolean;
}) => {
  return (
    <article className="group">
      {label && (
        <label
          className={`adminFormLabel ${isRequired && "required"}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        rules={{
          required: "برجاء ادخال رقم الهاتف",
          validate: (value) => matchIsValidTel(value),
        }}
        render={({ field, fieldState }) => (
          <MuiTelInput
            {...field}
            defaultCountry="AE"
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
