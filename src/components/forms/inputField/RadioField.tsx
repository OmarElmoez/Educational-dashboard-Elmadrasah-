import { TRadioField } from "@/types/InputField";
import { FieldValues } from "react-hook-form";
import "./input.css"; 

const RadioField = <T extends FieldValues>({
  register,
  name,
  label,
  options,
  error,
  isRequired = false,
}: TRadioField<T>) => {
  return (
    <article>
      <label className="radioGroupLabel">
        {label} {isRequired && <span className="required-star"> * </span>}
      </label>
      <div className="radioOptions">
        {options.map((option) => (
          <label key={option.value} className="customRadioLabel">
            <input
              type="radio"
              value={option.value}
              {...register(name, { required: isRequired })}
              className="customRadioInput"
            />
            <span className="customRadio"></span>
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
    </article>
  );
};

export default RadioField;
