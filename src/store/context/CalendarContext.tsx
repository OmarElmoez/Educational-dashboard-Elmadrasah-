import React, {createContext, ReactNode, useState} from "react";
import {useAppSelector} from "@/store/hooks.ts";

type TCalendarContextType = {
  clickedDate: Date;
  formattedDate: string;
  studentId: number | null;
  setClickedDate: React.Dispatch<React.SetStateAction<Date>>;
  setStudentId: React.Dispatch<React.SetStateAction<number | null>>;
  role: string | undefined;
  headerTitle: string | undefined;
  setHeaderTitle: React.Dispatch<React.SetStateAction<string>>;
  activeId: number;
  setActiveId: React.Dispatch<React.SetStateAction<number>>;
}

export const CalendarContext = createContext<TCalendarContextType>({
  clickedDate: new Date(),
  formattedDate: "",
  setClickedDate: () => {},
  setStudentId: () => {},
  studentId: null,
  role: "",
  headerTitle: "",
  setHeaderTitle: () => {},
  activeId: 0,
  setActiveId: () => {}
});

const CalendarProvider = ({children}: { children: ReactNode }) => {

  const [headerTitle, setHeaderTitle] = useState('');

  const [activeId, setActiveId] = useState(0)

  const [clickedDate, setClickedDate] = useState(new Date());

  const {credintials} = useAppSelector(state => state.auth);

  const [studentId, setStudentId] = useState<number | null>(null)

  const splittingDate = clickedDate.toLocaleDateString().split('/');

  const formattedDate = `${splittingDate[0]}/${splittingDate[2]}`;

  const ctxValue: TCalendarContextType = {
    clickedDate,
    formattedDate,
    setClickedDate,
    role: credintials?.role,
    studentId,
    setStudentId,
    headerTitle,
    setHeaderTitle,
    activeId,
    setActiveId,
  }

  return (
    <CalendarContext.Provider value={ctxValue}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarProvider;