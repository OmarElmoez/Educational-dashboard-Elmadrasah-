import React, { ReactNode } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { TModalRef,  } from "./shared";

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
  handleChange?: (service: U) => void;
};

type TStatus = "" | "Saved" | "Approved" | "Paid" | "Void";

export type { TOption, TDropdownProps, TStatus };
