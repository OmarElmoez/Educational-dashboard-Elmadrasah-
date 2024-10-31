import { FieldValues } from "react-hook-form";
import { TDropdownProps } from "@/types/Dropdown";
import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { setChosenState } from "@/store/location/LocationSlice";
import styles from "./dropDown.module.css";

const { feedback } = styles;

const Dropdown = <T extends FieldValues, U extends string>({
  name,
  options,
  chosen,
  register,
  label,
  error,
  isRequired,
  subjectRef,
  isWithPopup = false,
  disabled = false,
  children = null,
  handleChange,
}: TDropdownProps<T, U>) => {
  const chosenValue = options?.find((option) => option.value === chosen)?.value;

  const dispatch = useAppDispatch();

  const handleChosenState = (event: React.MouseEvent<HTMLSelectElement>) => {
    if (name === "state") {
      const selectedState = options?.find(
        (option) => option.value === event.currentTarget.value
      )?.label;

      if (selectedState) {
        dispatch(setChosenState(selectedState));
      }
    }
  };

  return (
    <article className="group">
      <label className={`adminFormLabel ${isRequired && "required"}`}>
        {label}
      </label>
      <div className="select_wrapper">
        <select
          {...register(name)}
          value={chosenValue}
          onClick={handleChosenState}
          disabled={disabled || false}
          className={`${disabled && "disabled_btn"}`}
          onChange={(e) => handleChange && handleChange(e.currentTarget.value as U)}
          // onChange={(e) =>
          //   setTreatmentType &&
          //   setTreatmentType(
          //     e.currentTarget.value as
          //       | "Tax Exclusive"
          //       | "Tax Inclusive"
          //       | "Tax Exempt"
          //   )
          // }
        >
          <option value="">--اختر--</option>          
          {options?.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className={feedback}>
        {error ? <p className="error">{error}</p> : <p></p>}
        {isWithPopup && (
          <p
            className="add-action-btn"
            onClick={() => subjectRef?.current?.open()}
          >
            + إضافة جديد
          </p>
        )}
        {children && children}
      </div>
    </article>
  );
};
export default Dropdown;
