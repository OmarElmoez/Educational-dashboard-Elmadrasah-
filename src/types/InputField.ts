import { FieldValues, Path, UseFormRegister } from "react-hook-form"

export type TInputField<T extends FieldValues> = {
  name: Path<T>;
  type?: string,
  register: UseFormRegister<T>;
  error: string;
  label: string;
  placeholder?: string;
  textarea?: boolean;
  isRequired?: boolean;
}

export type TRadioField<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  error: string;
  label: string;
  options: { label: string; value: string | number }[];
  placeholder?: string;
  isRequired?: boolean;
}

export interface TCheckboxGroup<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;  
  options: Array<{ label: string; value: string }>;
  error?: string;
  isRequired?: boolean;
}
