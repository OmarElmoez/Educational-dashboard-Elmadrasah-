import { FieldValues } from "react-hook-form";
import styles from "./dropDown.module.css";
import { TDropdownProps } from "@/types/Dropdown";
import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { set } from "date-fns";
import { setChosenState } from "@/store/location/LocationSlice";

const Dropdown = <T extends FieldValues>({
  name,
  options,
  chosen,
  register,
  label,
  error,
  isRequired,
}: TDropdownProps<T>) => {
  const chosenValue = options.find((option) => option.value === chosen)?.value;

  const dispatch = useAppDispatch();

  const handleChosenState = (event: React.MouseEvent<HTMLSelectElement>) => {
    if (name === "state") {
      const selectedState = options.find(
        (option) => option.value === event.currentTarget.value
      )?.label;

      if (selectedState) {
        dispatch(setChosenState(selectedState));
      }
    }
  };

  return (
    <article className="group">
      <label className="adminFormLabel">{label}  {isRequired && <span className="required-star"> * </span>}</label>
      <div className="select_wrapper">
        <select
          {...register(name)}
          defaultValue={chosenValue}
          onClick={handleChosenState}
        >
          <option value="">--اختر--</option>
          {options.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <p className="error">{error}</p>
    </article>
  );
};
export default Dropdown;
