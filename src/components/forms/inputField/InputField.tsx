import { TInputField } from "@/types/InputField";
import React from "react";
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
  value,
  style,
  onChange, // Add onChange as a prop
}: TInputField<T> & { onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) => {
  return (
    <article className="group" style={style}>
      <label
        htmlFor={name}
        className={`adminFormLabel ${isRequired && "required"}`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          {...register(name)}
          placeholder={placeholder}
          onChange={onChange} // Handle onChange 
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          className={`inputField ${disabled && 'disabled_btn'}`}
          id={name}
          {...register(name)}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange} // Handle onChange 
          defaultValue={value}
        />
      )}
      <p className="error" style={{ position: "absolute", bottom: "0" }}>
        {error}
      </p>
    </article>
  );
};

export default InputField;
