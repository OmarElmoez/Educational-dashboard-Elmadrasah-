import { TInputField } from "@/types/InputField";
import { FieldValues } from "react-hook-form";

const InputField = <T extends FieldValues>({
  register,
  type = "text",
  name,
  error,
  label,
  placeholder,
  textarea,
  disabled = false,
  isRequired = false,
}: TInputField<T>) => {
  return (
    <article className="group">
      <label
        htmlFor={name}
        className={`adminFormLabel ${isRequired && "required"}`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea id="name" {...register(name)} placeholder={placeholder} />
      ) : (
        <input
          type={type}
          className={`inputField ${disabled && 'disabled_btn'}`}
          id={name}
          {...register(name)}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      <p className="error" style={{ position: "absolute", bottom: "0" }}>
        {error}
      </p>
    </article>
  );
};

export default InputField;
