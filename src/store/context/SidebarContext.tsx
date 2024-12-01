//
//
// import React, { createContext, useRef, useState } from "react";
//
// type TSidebarContext = {
//   isSidebarOpen: boolean;
//   setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   calendarRef: React.MutableRefObject<FullCalendar | null>;
//   currentDate: Date;
//   handleDateChange: (date: Date) => void,
//   setCurrentDate: React.Dispatch<React.SetStateAction<Date>>,
//   clickedEvent:  Date | null,
//   setClickedEvent: React.Dispatch<React.SetStateAction<Date | null>>,
//   currentEvents: TEvent[] | null,
//   setCurrentEvents: React.Dispatch<React.SetStateAction<TEvent[] | null>>,
// }
//
// export const SidebarContext = createContext<TSidebarContext>({
//   isSidebarOpen: false,
//   setIsSidebarOpen: () => {},
//   calendarRef: { current: null },
//   currentDate: new Date(),
//   handleDateChange: () => {},
//   setCurrentDate: () => {},
//   clickedEvent: null,
//   setClickedEvent: () => {},
//   currentEvents: null,
//   setCurrentEvents: () => {},
// });
//
// export const SidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
//
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//
//   const calendarRef = useRef<FullCalendar>(null);
//
//   const [currentDate, setCurrentDate] = useState(new Date());
//
//   const [clickedEvent, setClickedEvent] = useState<Date | null>(null);
//
//   const [currentEvents, setCurrentEvents] = useState<TEvent[] | null>(null);
//
//   const handleDateChange = (date: Date) => {
//     setCurrentDate(date);
//     if (calendarRef.current) {
//       const calendarApi = calendarRef.current.getApi();
//       calendarApi.gotoDate(date);
//     }
//   };
//
//   return (
//     <SidebarContext.Provider
//       value={{
//         isSidebarOpen,
//         setIsSidebarOpen,
//         calendarRef,
//         currentDate,
//         handleDateChange,
//         setCurrentDate,
//         clickedEvent,
//         setClickedEvent,
//         currentEvents,
//         setCurrentEvents,
//       }}
//     >
//       {children}
//     </SidebarContext.Provider>
//   )
// };
