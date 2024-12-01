import React, {createContext, ReactNode, useState} from "react";

type TCalendarContextType = {
  clickedDate: Date;
  formattedDate: string;
  setClickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const CalendarContext = createContext<TCalendarContextType>({
  clickedDate: new Date(),
  formattedDate: "",
  setClickedDate: () => {
  }
});

const CalendarProvider = ({children}: { children: ReactNode }) => {
  const [clickedDate, setClickedDate] = useState<Date>(new Date());

  const splittingDate = clickedDate.toLocaleDateString().split('/');

  const formattedDate = `${splittingDate[1]}-${splittingDate[0]}-${splittingDate[2]}`;

  const ctxValue = {
    clickedDate,
    formattedDate,
    setClickedDate,
  }


  return (
    <CalendarContext.Provider value={ctxValue}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarProvider;