import React, {createContext, ReactNode, useState} from "react";
import {useAppSelector} from "@/store/hooks.ts";

type TCalendarContextType = {
  clickedDate: Date;
  formattedDate: string;
  studentId: number | null;
  setClickedDate: React.Dispatch<React.SetStateAction<Date>>;
  setStudentId: React.Dispatch<React.SetStateAction<number | null>>;
  role: string | undefined;
}

export const CalendarContext = createContext<TCalendarContextType>({
  clickedDate: new Date(),
  formattedDate: "",
  setClickedDate: () => {},
  setStudentId: () => {},
  studentId: null,
  role: "",
});

const CalendarProvider = ({children}: { children: ReactNode }) => {
  const [clickedDate, setClickedDate] = useState<Date>(new Date());

  const {credintials} = useAppSelector(state => state.auth);

  const [studentId, setStudentId] = useState<number | null>(null)

  const splittingDate = clickedDate.toLocaleDateString().split('/');

  const formattedDate = `${splittingDate[0]}/${splittingDate[2]}`;

  const ctxValue = {
    clickedDate,
    formattedDate,
    setClickedDate,
    role: credintials?.role,
    studentId,
    setStudentId,
  }


  return (
    <CalendarContext.Provider value={ctxValue}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarProvider;