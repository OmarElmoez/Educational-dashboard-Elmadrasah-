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

