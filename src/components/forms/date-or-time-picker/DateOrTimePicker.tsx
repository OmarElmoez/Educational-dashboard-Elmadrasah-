import { CSSProperties, useEffect, useRef, useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TDatePickerProps<T extends FieldValues> = {
  name: Path<T>,
  register: UseFormRegister<T>;
  label: string;
  error?: string;
  setValue: (name: Path<T>, value: string) => void;
  removePreviewChoices?: boolean;
  style?: CSSProperties;
  isRequired?: boolean;
  predefinedDate?: string;
  type?: 'date' | 'time';
  onChange?: (val: string) => void;
  placeholder?: string;
}

const DateOrTimePicker = <T extends FieldValues>({
                                                   name,
                                                   register,
                                                   label,
                                                   error,
                                                   setValue,
                                                   removePreviewChoices,
                                                   style,
                                                   isRequired,
                                                   predefinedDate,
                                                   type = 'date', onChange, placeholder
                                                 }: TDatePickerProps<T>) => {

  const [selectedValue, setSelectedValue] = useState("")
  const dateRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    dateRef.current?.showPicker();
  }

  const onValueChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
    if (type === 'time') {
      handleTimeChange(value);
    } else {
      setSelectedValue(value)
    }
    setValue(name, value);
  }

  const handleTimeChange = (value: string) => {

    const [hours, minutes] = value.split(":").map(Number);

    let period = "ص";
    let formattedHours = hours;

    if (hours >= 12) {
      period = "م";
      if (hours > 12) {
        formattedHours = hours - 12;
      }
    } else if (hours === 0) {
      formattedHours = 12;
    }

    const formatted = `${formattedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
    setSelectedValue(formatted);
  };

  useEffect(() => {
    if (removePreviewChoices) {
      setSelectedValue("")
      setValue(name, "");
    }
  }, [name, removePreviewChoices, setValue])

  return (
    <article className='group' style={style}>
      <label htmlFor={name} className={`adminFormLabel ${isRequired && "required"}`}>{label}</label>
      <section className='inputField cursor-pointer relative' onClick={onClickHandler}>
        <input type={type} {...register(name)} ref={dateRef} id={name} className="absolute opacity-0 cursor-pointer w-full"
               onChange={(e) => onValueChange(e.target.value)}/>
        <div>{(predefinedDate && !selectedValue) ? predefinedDate : selectedValue ? selectedValue : (
          <span className='firstOption'>{type === 'time' ? '11:30 ص' : (placeholder || 'يوم / شهر / سنة')}</span>)}</div>
      </section>
      <p className="error absolute bottom-0">
        {error}
      </p>
    </article>
  )
}

export default DateOrTimePicker;