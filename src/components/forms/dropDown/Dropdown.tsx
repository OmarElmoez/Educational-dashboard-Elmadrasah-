import { FieldValues } from "react-hook-form";
import { TDropdownProps } from "@/types/Dropdown";
import React, { useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setChosenState } from "@/store/location/LocationSlice";
import styles from "./dropDown.module.css";
import AddNewSubjectModal from "@/components/add-new-subject-model/AddNewSubjectModal";
import { TModalRef } from "@/types/shared";

const { feedback, action } = styles;

const Dropdown = <T extends FieldValues>({
  name,
  options,
  chosen,
  register,
  label,
  error,
  isRequired,
  subjectRef,
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
        <label className="adminFormLabel">
          {label} {isRequired && <span className="required-star"> * </span>}
        </label>
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
        <div className={feedback}>
          {error ? <p className="error">{error}</p> : <p></p>}
          {name === "default_subject" && (
            <p className='add-action-btn' onClick={() => subjectRef?.current?.open()}>+ إضافة موضوع جديد</p>
          )}
        </div>
      </article>

  );
};
export default Dropdown;
