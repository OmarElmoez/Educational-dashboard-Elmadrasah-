import { TCountry } from "@/schemas/CountrySchema";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TOption = {
  value: string;
  label: string;
};

type TDropdownProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: TOption[];
  chosen?: string;
  register: UseFormRegister<T>;
  error: string;
};

export type { TOption, TDropdownProps };