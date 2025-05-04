import { TCheckboxGroup, TSingleCheckbox } from "@/types/InputField";
import { FieldValues } from "react-hook-form";
import "./input.css";

export const CheckboxGroup = <T extends FieldValues>({
  register,
  name,
  options,
  error,
  isRequired = false,
  disabled = false,
}: TCheckboxGroup<T>) => {
  return (
    <article>
      <label className={`checkboxGroupLabel ${isRequired && "required"}`}>
        {name}
      </label>
      <div className="checkboxOptions">
        {options.map((option) => (
          <label key={option.value} className="checkboxItem">
            <span className="checkmark"></span>
            <input
              type="checkbox"
              value={option.value}
              {...register(name, { required: isRequired })}
              className="checkboxInput"
              disabled={disabled}
            />
            <span className="checkboxLabel"></span>
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
    </article>
  );
};

// -----------------------------------------------------------

export const SingleCheckbox = <T extends FieldValues>({
  register,
  name,
  label,
  isRequired = false,
  disabled = false,
  error,
  className = "",
  labelStyle = {},
}: TSingleCheckbox<T>) => {
  return (
    <div className={`flex-start ${className}`}>
      <label className="checkboxItem">
        <span className={`checkmark ${disabled && 'disabled_btn'}`}></span>
        <input
          type="checkbox"
          {...register(name, { required: isRequired })}
          className="checkboxInput"
          disabled={disabled}
        />
        <span style={labelStyle}>{label}</span>
      </label>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
