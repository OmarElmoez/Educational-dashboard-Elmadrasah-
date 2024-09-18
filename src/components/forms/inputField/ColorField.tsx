import { useRef, useState } from "react";
import { INITIAL_CALENDAR_COLOR } from "@/constants";
import styles from "./colorField.module.css";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

const { color_wrapper, colorInput, colorPreview, colorValue, previewBox } =
  styles;

const ColorField = <T extends FieldValues>({
  name,
  register,
  label,
  error,
  setValue
}: {
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  error?: string;
  setValue: (name: Path<T>, value: string) => void;
}) => {
  const [selectedColor, setSelectedColor] = useState(INITIAL_CALENDAR_COLOR);
  const inputColorRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    inputColorRef.current?.click();
  };

  return (
    <article className="group">
      <label htmlFor={name} className="adminFormLabel">{label}</label>
      <section
        className={`select_wrapper inputField ${color_wrapper}`}
        onClick={onClickHandler}
      >
        <input
          type="color"
          {...register(name)}
          style={{ visibility: "hidden" }}
          className={colorInput}
          ref={inputColorRef}
          onChange={(e) => {
            setValue(name, e.target.value);
            setSelectedColor(e.target.value);
          }}
        />
        <div className={previewBox}>
          <span
            className={colorPreview}
            style={{
              backgroundColor: selectedColor,
              borderColor: selectedColor,
            }}
          ></span>
          <span className={colorValue}>{selectedColor}</span>
        </div>
      </section>
      {error && <p className="error">{error}</p>}
    </article>
  );
};

export default ColorField;
