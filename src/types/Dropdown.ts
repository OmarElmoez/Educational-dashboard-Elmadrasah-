import React, { ReactNode } from "react";
import { FieldValues, Path, UseFormRegister, UseFormWatch } from "react-hook-form";
import { TModalRef,  } from "./shared";

type TOption = {
  value: string;
  label: string | undefined;
};

type TDropdownProps<T extends FieldValues, U> = {
  name: Path<T>;
  label: string;
  options: TOption[] | undefined;
  chosen?: string | null;
  register: UseFormRegister<T>;
  error: string;
  isRequired?: boolean;
  subjectRef?: React.RefObject<TModalRef>;
  isWithPopup?: boolean;
  children?: ReactNode | null;
  disabled?: boolean;
  handleChange?: (service: U) => void;
  watch?: UseFormWatch<T>
  removePreviewChoices?: boolean;
  isEdit?: boolean;
};

type TStatus = "" | "Saved" | "Approved" | "Paid" | "Void";

export type { TOption, TDropdownProps, TStatus };
