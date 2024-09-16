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
}: TInputField<T>) => {

  return (
    <article className="group">
      <label htmlFor={name} className="adminFormLabel">
        {label}
      </label>
      {textarea ? <textarea id="name" {...register(name)} placeholder={placeholder} /> : <input
        type={type}
        className="inputField"
        id={name}
        {...register(name)}
        placeholder={placeholder}
      />}
      <p className="error" style={{ position: "absolute", bottom: "0" }}>
        {error}
      </p>
    </article>
  );
};

export default InputField;
