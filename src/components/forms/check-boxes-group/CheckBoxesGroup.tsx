import Row from "@/components/row/Row";
import { SingleCheckbox } from "../inputField/CheckboxGroup";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import React from "react";

type TCheckBoxesGroup<T extends FieldValues> = {
  register: UseFormRegister<T>;
  options: {
    name: string;
    label: string;
  }[];
  style?: React.CSSProperties;
};

const CheckBoxesGroup = <T extends FieldValues>({
  register,
  options,
  style,
}: TCheckBoxesGroup<T>) => {
  return (
    <Row style={style}>
      {options.map((option) => (
        <SingleCheckbox
          register={register}
          name={option.name as Path<T>}
          key={option.name}
          label={option.label}
        />
      ))}
    </Row>
  );
};

export default CheckBoxesGroup;
