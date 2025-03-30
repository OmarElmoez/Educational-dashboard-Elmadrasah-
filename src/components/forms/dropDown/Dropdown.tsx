import { FieldValues } from "react-hook-form";
import { TDropdownProps } from "@/types/Dropdown";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setChosenState } from "@/store/location/LocationSlice";

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
                                                             removePreviewChoices,
                                                             style,
                                                             isEdit = false,
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
  const [selectedValue, setSelectedValue] = useState("")
  useEffect(() => {
    if (removePreviewChoices) {
      setSelectedValue("");
    }
  }, [isEdit, removePreviewChoices]);
  return (
    <article className="group" style={style}>
      <label className={`adminFormLabel ${isRequired && "required"}`}>
        {label}
      </label>
      <div className="select_wrapper">
        <select
          {...register(name)}
          value={chosenValue}
          onClick={handleChosenState}
          disabled={disabled || false}
          className={`${disabled && "disabled_btn"} ${(selectedValue !== "" || isEdit) && 'removeBefore'}`}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setSelectedValue(value);
            handleChange && handleChange(value as U);
          }
          }
        >
          <option value="" hidden></option>
          {options?.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className='feedback'>
        {error ? <p className="error">{error}</p> : <p></p>}
        {(isWithPopup && !disabled) && (
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
