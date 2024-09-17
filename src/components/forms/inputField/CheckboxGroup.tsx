import { TCheckboxGroup } from "@/types/InputField";
import { FieldValues } from "react-hook-form";
import "./input.css";

const CheckboxGroup = <T extends FieldValues>({
  register,
  name,
  options,
  error,
  isRequired = false,
}: TCheckboxGroup<T>) => {
  return (
    <article>
      <label className="checkboxGroupLabel">
        {name} {isRequired && <span className="required-star"> * </span>}
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

export default CheckboxGroup;
