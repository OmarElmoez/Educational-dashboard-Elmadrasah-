import { Dropdown, InputField, Row } from "@/components";
import styles from "./schedule-form.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

const {
  customRadioLabel,
  customRadioInput,
  customRadio,
  radioLabel,
  endType_row,
  after_count,
  week_day,
} = styles;

const ScheduleForm = ({
  className,
  onClose,
}: {
  className?: string;
  onClose: () => void;
}) => {
  const { register, watch } = useForm();

  const [selectedRepeatType, setSelectedRepeatType] = useState("");
  const [monthsType, setMonthsType] = useState("");
  const [weekDays, setWeekDays] = useState<string[]>([]);

  const endType = watch("end_type");

  const DAYS_OPTIONS = [
    { label: "احد", value: "sunday", id: 1 },
    { label: "اثنين", value: "monday", id: 2 },
    { label: "ثلاثاء", value: "tuesday", id: 3 },
    { label: "أربعاء", value: "wednesday", id: 4 },
    { label: "خميس", value: "thursday", id: 5 },
    { label: "جمعة", value: "friday", id: 6 },
    { label: "سبت", value: "saturday", id: 7 },
  ];

  return (
    <form className={className}>
      <InputField
        type="date"
        label="تاريخ البدء"
        placeholder="2023-01-01"
        register={register}
        name="start_date"
        error=""
      />

      <Row>
        <Dropdown
          label="إعادة التكرار كل :"
          register={register}
          options={[
            { label: "أيام", value: "days" },
            { label: "أسبوع", value: "week" },
            { label: "شهر", value: "month" },
          ]}
          name="repeat_every"
          error=""
          handleChange={(value: string) => {
            setSelectedRepeatType(value);
          }}
        />

        {selectedRepeatType === "days" && (
          <InputField
            label="عدد الايام"
            placeholder="15"
            register={register}
            name="repeat_days_count"
            error=""
          />
        )}

        {selectedRepeatType === "week" && (
          <InputField
            label="عدد الاسابيع"
            placeholder="4"
            register={register}
            name="repeat_weeks_count"
            error=""
          />
        )}

        {selectedRepeatType === "month" && (
          <Dropdown
            label="التكرار شهرياً"
            register={register}
            options={[
              { label: "يوم", value: "day" },
              { label: "ارباع", value: "quarter" },
            ]}
            name="repeat_months_type"
            error=""
            handleChange={(value: string) => {
              setMonthsType(value);
            }}
          />
        )}
      </Row>

      {monthsType === "day" && (
        <Row>
          <InputField
            label=""
            type="date"
            placeholder="15"
            register={register}
            name="repeat_months_day_count"
            error=""
          />
        </Row>
      )}

      {monthsType === "quarter" && (
        <Row>
          <Dropdown
            label="الربع المراد تكراره : "
            register={register}
            options={[
              { label: "الربع الاول", value: "first_quarter" },
              { label: "الربع الثاني", value: "second_quarter" },
              { label: "الربع الثالث", value: "third_quarter" },
              { label: "الربع الرابع", value: "fourth_quarter" },
            ]}
            name="repeat_months_quarter_type"
            error=""
          />
        </Row>
      )}

      {(selectedRepeatType === "week" || monthsType === "quarter") && (
        <>
          <p className="adminFormLabel">في أيام</p>
          <Row style={{ marginTop: "1rem" }}>
            {DAYS_OPTIONS.map((day) => (
              <label key={day.id} htmlFor={day.value} className={week_day}>
                <input
                  type="checkbox"
                  {...register("week_days")}
                  id={day.value}
                  value={day.value}
                  checked={weekDays.includes(day.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setWeekDays((prev) => [...prev, day.value]);
                    } else {
                      setWeekDays((prev) =>
                        prev.filter((val) => val !== day.value)
                      );
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
              {...register("end_type")}
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
              {...register("end_type")}
              className={customRadioInput}
              value="on"
            />
            <span className={customRadio}></span>
            <span className={radioLabel}>إنهاء في</span>
          </label>

          <input
            type="date"
            {...register("end_date")}
            id=""
            disabled={endType !== "on"}
            style={{ backgroundColor: "transparent" }}
          />
        </section>

        <section className={endType_row} style={{ gap: "5.2rem" }}>
          <label className={customRadioLabel}>
            <input
              type="radio"
              {...register("end_type")}
              className={customRadioInput}
              value="after"
            />
            <span className={customRadio}></span>
            <span className={radioLabel}>بعد</span>
          </label>

          <div className={after_count}>
            <input
              type="number"
              {...register("after_count")}
              id=""
              disabled={endType !== "after"}
            />
            <span>مرة تنبيه</span>
          </div>
        </section>
      </Row>

      <Row style={{ justifyContent: "flex-end", marginTop: "2.4rem" }}>
        <button type="submit" className="btn submit-btn">
          حفظ
        </button>
        <button type="button" className="btn cancel-btn" onClick={onClose}>
          يُلغي
        </button>
      </Row>
    </form>
  );
};

export default ScheduleForm;
