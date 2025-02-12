import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import "./overrideCalendar.css";

interface CustomCalendarProps {
  setDate: (date: Dayjs | null) => void;
  setTime: (time: Dayjs | null) => void;
  dispatchFunction?: (date: Dayjs | null, time: Dayjs | null) => void;
}

const CustomCalendar = ({ setDate, setTime, dispatchFunction }: CustomCalendarProps) => {
  const [value, setValue] = useState<Dayjs | null>(null);

  const handleDateTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setValue(newValue);
      const newDate = newValue.startOf('day');
      setDate(newDate);
      setTime(newValue);
      if (dispatchFunction) {
        dispatchFunction(newDate, newValue);
      }
    } else {
      setValue(null);
      setDate(null);
      setTime(null);
      if (dispatchFunction) {
        dispatchFunction(null, null);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DateTimePicker
          label="Controlled picker"
          value={value}
          onChange={handleDateTimeChange}
          className="custom-date-time-picker"
        />
      </div>
    </LocalizationProvider>
  );
};

export default CustomCalendar;
