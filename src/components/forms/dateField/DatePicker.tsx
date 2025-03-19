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
}

const DatePicker = <T extends FieldValues>({
                                             name,
                                             register,
                                             label,
                                             error,
                                             setValue,
                                             removePreviewChoices,
                                             style,
                                             isRequired,
                                             predefinedDate,
                                           }: TDatePickerProps<T>) => {

  const [selectedDate, setSelectedDate] = useState("")
  const dateRef = useRef<HTMLInputElement>(null);

  const clickDateHandler = () => {
    dateRef.current?.showPicker();
  }

  const onDateChange = (value: string) => {
    setValue(name, value);
    setSelectedDate(value)
  }

  useEffect(() => {
    if (removePreviewChoices) {
      setSelectedDate("")
      setValue(name, "");
    }
  }, [name, removePreviewChoices, setValue])

  return (
    <article className='group' style={style}>
      <label htmlFor={name} className={`adminFormLabel ${isRequired && "required"}`}>{label}</label>
      <section className='inputField cursor-pointer relative' onClick={clickDateHandler}>
        <input type='date' {...register(name)} ref={dateRef} id={name} className="absolute opacity-0 cursor-pointer"
               onChange={(e) => onDateChange(e.target.value)} />
        <div>{(predefinedDate && !selectedDate) ? predefinedDate : selectedDate ? selectedDate : (<span className='firstOption'>يوم / شهر / سنة</span>)}</div>
      </section>
      <p className="error absolute bottom-0">
        {error}
      </p>
    </article>
  )
}

export default DatePicker;