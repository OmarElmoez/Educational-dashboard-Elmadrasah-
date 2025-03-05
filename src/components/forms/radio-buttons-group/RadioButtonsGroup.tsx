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
  error?: string;
};

const RadioButtonsGroup = <T extends FieldValues>({
  register,
  name,
  options,
  disabled = false,
  style,
  error,
}: TRadioButtonsGroupProps<T>) => {
  return (
    <div className={radioOptions} style={style}>
      {options.map((option) => (
        <label key={option.value} className={customRadioLabel} style={{cursor: disabled ? 'not-allowed' : 'pointer'}} >
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
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RadioButtonsGroup;
