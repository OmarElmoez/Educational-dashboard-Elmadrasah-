import React, { ReactNode } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { TModalRef, TService, TTax_Treatment } from "./shared";

type TOption = {
  value: string;
  label: string;
};

type TDropdownProps<T extends FieldValues, U> = {
  name: Path<T>;
  label: string;
  options: TOption[];
  chosen?: string;
  register: UseFormRegister<T>;
  error: string;
  isRequired?: boolean;
  subjectRef?: React.RefObject<TModalRef>;
  isWithPopup?: boolean;
  children?: ReactNode | null;
  disabled?: boolean;  
  handleChange?: (service: U) => void
}

export type { TOption, TDropdownProps };
