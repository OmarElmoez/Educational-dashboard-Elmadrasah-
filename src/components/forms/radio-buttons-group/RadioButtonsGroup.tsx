import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import styles from "./radioButtonsGroup.module.css";
import React from "react";

const {
  radioOptions,
  customRadioLabel,
  customRadioInput,
  disabled_btn,
  customRadio,
  radioLabel,
} = styles;

type TRadioButtonsGroupProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
  style?: React.CSSProperties;
};

const RadioButtonsGroup = <T extends FieldValues>({
  register,
  name,
  options,
  disabled = false,
  style,
}: TRadioButtonsGroupProps<T>) => {
  return (
    <div className={radioOptions} style={style}>
      {options.map((option) => (
        <label key={option.value} className={customRadioLabel}>
          <input
            type="radio"
            value={option.value}
            {...register(name)}
            className={customRadioInput}
            disabled={disabled}
          />
          <span className={`${customRadio} ${disabled && disabled_btn}`}></span>
          <span className={radioLabel}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonsGroup;
