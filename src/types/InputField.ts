import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { CSSProperties } from "react";

export type TInputField<T extends FieldValues> = {
  name: Path<T>;
  type?: string;
  register: UseFormRegister<T>;
  error: string;
  label?: string;
  placeholder?: string;
  textarea?: boolean;
  isRequired?: boolean;
  disabled?: boolean;
  value?: string;
  style?: CSSProperties;
};

export type TRadioField<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  error: string;
  label: string;
  options: { label: string; value: string | number }[];
  placeholder?: string;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
};

export type TCheckboxGroup<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  options: Array<{ label: string; value: string }>;
  error?: string;
  isRequired?: boolean;
  disabled?: boolean;
};

export type TSingleCheckbox<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  isRequired?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
  labelStyle?: CSSProperties;
};
