import {Dropdown, InputField, Row} from "@/components";
import styles from "./schedule-form.module.css";
import {FieldValues, Path, UseFormRegister, UseFormWatch} from "react-hook-form";
import { useMemo, useState} from "react";
import {TDay, TLessonDraftData} from "@/store/single-actions/actGetRescheduleLessonData.ts";
import turnDaysIntoEnglishString from "@/utils/turnDaysIntoEnglish.ts";

const {
  customRadioLabel,
  customRadioInput,
  customRadio,
  radioLabel,
  endType_row,
  after_count,
  week_day,
  selected
} = styles;

const ScheduleForm = <T extends FieldValues>({
                                               className,
                                               onClose,
                                               register,
                                               watch,
                                               resetRepetition,
                                               setValue,
                                               draftLessonData,
                                               selectedDays
                                             }: {
  className?: string;
  onClose: () => void;
  register: UseFormRegister<T>,
  watch: UseFormWatch<T>,
  resetRepetition: () => void,
  setValue: (name: Path<T>, value: string | null | undefined) => void,
  draftLessonData?: TLessonDraftData,
  selectedDays?: TDay[]
}) => {

  const [selectedRepeatType, setSelectedRepeatType] = useState("");
  const [monthsType, setMonthsType] = useState("");

  const formattedSelectedDays: string[] = useMemo(() => selectedDays?.map(selectedDay => selectedDay.name) || [], [selectedDays]);
  const [weekDays, setWeekDays] = useState<string[]>([]);


  // todo:  you need to know why it works ^_^, it doesn't refer to the correct type.
  const endType = watch('end_repeat' as Path<T>);


  const DAYS_OPTIONS = [
    {label: "الأحد", value: "sunday", id: 1},
    {label: "الأثنين", value: "monday", id: 2},
    {label: "الثلاثاء", value: "tuesday", id: 3},
    {label: "الأربعاء", value: "wednesday", id: 4},
    {label: "الخميس", value: "thursday", id: 5},
    {label: "الجمعة", value: "friday", id: 6},
    {label: "السبت", value: "saturday", id: 7},
  ];

  return (
    <form className={className}>

      <InputField
        label="تاريخ البدء"
        register={register}
        name={"start_date" as Path<T>}
        error=""
        disabled
      />

      <Row>
        <Dropdown
          label="إعادة التكرار كل :"
          register={register}
          options={[
            {label: "أيام", value: "daily"},
            {label: "أسبوع", value: "weekly"},
            {label: "شهر", value: "monthly"},
          ]}
          name={"repeat_every" as Path<T>}
          error=""
          handleChange={(value: string) => {
            setSelectedRepeatType(value);
          }}
          isEdit
        />

        {((selectedRepeatType === "daily" || selectedRepeatType === 'weekly') || (draftLessonData?.repeat_count && selectedRepeatType !== "monthly" && draftLessonData?.repeat_every !== 'monthly')) && (
          <InputField
            label={(selectedRepeatType === 'daily' || draftLessonData?.repeat_every === 'daily') ? "عدد الايام" : "عدد الاسابيع"}
            placeholder={(selectedRepeatType === 'daily' || draftLessonData?.repeat_every === 'daily') ? "15" : "4"}
            register={register}
            name={"repeat_count" as Path<T>}
            error=""
            type="number"
          />
        )}

        {(selectedRepeatType === "monthly" || draftLessonData?.repeat_every === 'monthly' && selectedRepeatType !== 'daily' && selectedRepeatType !== 'weekly') && (
          <Dropdown
            label="التكرار شهرياً"
            register={register}
            options={[
              {label: "يوم", value: "day"},
              {label: "ارباع", value: "quarter"},
            ]}
            name={"repeat_monthly" as Path<T>}
            error=""
            handleChange={(value: string) => {
              setMonthsType(value);
            }}
          />
        )}
      </Row>

      {(monthsType === "day" || draftLessonData?.repeat_monthly_date && selectedRepeatType !== 'daily' && selectedRepeatType !== 'weekly' && !draftLessonData?.on_quarter) && (
        <Row>
          <InputField
            label=""
            type="date"
            register={register}
            name={"repeat_monthly_date" as Path<T>}
            error=""
          />
        </Row>
      )}

      {(monthsType === "quarter" || draftLessonData?.on_quarter && selectedRepeatType !== 'daily' && selectedRepeatType !== 'weekly') && (
        <Row>
          <Dropdown
            label="الربع المراد تكراره : "
            register={register}
            options={[
              {label: "الربع الاول", value: "first"},
              {label: "الربع الثاني", value: "second"},
              {label: "الربع الثالث", value: "third"},
              {label: "الربع الرابع", value: "fourth"},
            ]}
            name={"on_quarter" as Path<T>}
            error=""
          />
        </Row>
      )}

      {(selectedRepeatType === "weekly" || monthsType === "quarter" || draftLessonData?.on_quarter || draftLessonData?.repeat_every === 'weekly') && selectedRepeatType !== "daily" && (
        <>
          <p className="adminFormLabel">في أيام</p>
          <Row style={{marginTop: "1rem"}}>
            {DAYS_OPTIONS.map((day) => (
              <label key={day.id} htmlFor={day.value}
                     className={`${week_day} ${(weekDays.length === 0 ? formattedSelectedDays : weekDays)?.includes(day.label) ? selected : ''}`}>
                <input
                  type="checkbox"
                  {...register("days" as Path<T>)}
                  className='repetitionWeekDay'
                  id={day.value}
                  value={day.label}
                  checked={formattedSelectedDays?.includes(day.label)}
                  onChange={(e) => {
                    if (weekDays.includes(e.target.value)) {
                      setWeekDays((prev) =>
                        prev.filter((val) => val !== day.label)
                      );
                    } else {
                      setWeekDays((prev) => [...prev, day.label]);
                    }
                  }}
                />
                <span>{day.label}</span>
              </label>
            ))}
          </Row>
        </>
      )}

      <p className="adminFormLabel">إنهاء التكرار: </p>
      <Row
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "1rem",
        }}
      >
        <section>
          <label className={customRadioLabel}>
            <input
              type="radio"
              {...register("end_repeat" as Path<T>)}
              className={customRadioInput}
              value="never"
            />
            <span className={customRadio}></span>
            <span className={radioLabel}>نهائياً</span>
          </label>
        </section>

        <section className={endType_row}>
          <label className={customRadioLabel}>
            <input
              type="radio"
              {...register("end_repeat" as Path<T>)}
              className={customRadioInput}
              value="on"
            />
            <span className={customRadio}></span>
            <span className={radioLabel}>إنهاء في</span>
          </label>

          <input
            type="date"
            {...register("end_repeat_on" as Path<T>)}
            id=""
            disabled={endType !== "on"}
            style={{backgroundColor: "transparent"}}
          />
        </section>

        <section className={endType_row} style={{gap: "5.2rem"}}>
          <label className={customRadioLabel}>
            <input
              type="radio"
              {...register("end_repeat" as Path<T>)}
              className={customRadioInput}
              value="after"
            />
            <span className={customRadio}></span>
            <span className={radioLabel}>بعد</span>
          </label>

          <div className={after_count}>
            <input
              type="number"
              {...register("repeat_times" as Path<T>)}
              id=""
              disabled={endType !== "after"}
            />
            <span>مرة تنبيه</span>
          </div>
        </section>
      </Row>

      <Row style={{justifyContent: "flex-end", marginTop: "2.4rem"}}>
        <button type="button" onClick={() => {
          onClose();
          setValue('days' as Path<T>, turnDaysIntoEnglishString(weekDays))
        }} className="btn submit-btn">
          حفظ
        </button>
        <button type="button" className="btn cancel-btn" onClick={() => {
          resetRepetition()
          onClose();
          setMonthsType('')
          setSelectedRepeatType('')
          setWeekDays([])
          setValue("end_repeat_on" as Path<T>, null)
          setValue("repeat_times" as Path<T>, null)
        }}>
          إلغاء
        </button>
      </Row>
    </form>
  )
}

export default ScheduleForm;