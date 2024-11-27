import React, {createContext, ReactNode, useState} from "react";

type TCalendarContextType = {
  clickedDate: Date;
  formattedDate: string;
  setClickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const CalendarContext = createContext<TCalendarContextType>({
  clickedDate: new Date(),
  formattedDate: "",
  setClickedDate: () => {}
});

const CalendarProvider = ({children}: {children: ReactNode}) => {
  const [clickedDate, setClickedDate] = useState(new Date());
  console.log('from calendar context: ', new Date().getMonth());

  // serverDateFormat => day - month - year
  const formattedDate = clickedDate.toISOString()
  .split("T")[0]
  .split("-")
  .reverse()
  .join("-");

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