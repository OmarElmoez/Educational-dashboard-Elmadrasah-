import { TRadioField } from "@/types/InputField";
import { FieldValues } from "react-hook-form";
import "./input.css";
import Heading from "@/components/heading/Heading";

const RadioField = <T extends FieldValues>({
  register,
  name,
  label,
  options,
  error,
  disabled,
}: TRadioField<T>) => {
  return (
    <article className="group">
      <Heading text={label} />
      <div className="radioOptions">
        {options.map((option) => (
          <label key={option.value} className="customRadioLabel">
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              className="customRadioInput"
              disabled={disabled}
            />
            <span className={`customRadio ${disabled && 'disabled_btn'}`}></span>
            <span className="radioLabel">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
    </article>
  );
};

export default RadioField;
