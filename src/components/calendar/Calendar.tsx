// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import arLocale from "@fullcalendar/core/locales/ar";
//
// import Sidebar from "./sideBar/SideBar";
//
// import "./calendar.css";
// import { useCallback, useContext } from "react";
// import { EventContentArg } from "@fullcalendar/core/index.js";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import actGetLessonsByRange from "@/store/lessons/act/actGetLessonsByRange";
// import { useResponsive } from "@/hooks";
// import { SidebarContext } from "@/store/context/SidebarContext";
//
// export type TEvent = {
//   id: string;
//   title: string;
//   start: string;
//   end: string;
//   description: string;
//   location: string;
//   status: string;
//   employee: string;
//   timeZone: string;
// };
//
// const Calendar = () => {
//   const dispatch = useAppDispatch();
//
//   const { calendar_lessons } = useAppSelector((state) => state.lessons);
//
//   const { credintials } = useAppSelector((state) => state.auth);
//
//   const { calendarRef, setCurrentDate, setClickedEvent, setCurrentEvents } =
//     useContext(SidebarContext);
//
//   const { isPhone } = useResponsive();
//
//   const customArLocale = {
//     ...arLocale,
//     buttonText: {
//       today: "اليوم",
//       month: "شهر",
//       week: "أسبوع",
//       day: "يوم",
//     },
//   };
//
//   const renderEventContent = (eventContent: EventContentArg) => {
//     const { event, timeText, view } = eventContent;
//     if (view.type === "dayGridMonth") {
//       return event.title;
//     }
//
//     return (
//       <>
//         <span>{timeText}</span>
//         <p>{event.title}</p>
//       </>
//     );
//   };
//
//   const fetchEvents = useCallback(
//     async (
//       info: { start: Date; end: Date },
//       successCallback: (events: TEvent[]) => void
//     ) => {
//       // To make them in this format: 02-05-2024
//       const startStr = info.start
//         .toISOString()
//         .split("T")[0]
//         .split("-")
//         .reverse()
//         .join("-");
//       const endStr = info.end
//         .toISOString()
//         .split("T")[0]
//         .split("-")
//         .reverse()
//         .join("-");
//
//       const events = calendar_lessons.map((event) => ({
//         id: event.id.toString(),
//         title: event.name,
//         start: event.from_datetime,
//         end: event.to_datetime,
//         description: event.description,
//         location: event.location_name,
//         status: event.status,
//         employee: event.employee_name,
//         timeZone: event.time_zone,
//       }));
//
//       if (!credintials?.token) return;
//
//       // Check if we already have events for this date range
//       const hasEventsInRange = events.some(
//         (event) =>
//           new Date(event.start) >= info.start && new Date(event.end) <= info.end
//       );
//
//       if (!hasEventsInRange) {
//         try {
//           await dispatch(
//             actGetLessonsByRange({
//               start_date: startStr,
//               end_date: endStr,
//             })
//           );
//         } catch (error) {
//           console.error("Error fetching events:", error);
//         }
//       }
//
//       const eventsInRange = events.filter(
//         (event) =>
//           new Date(event.start) >= info.start && new Date(event.end) <= info.end
//       );
//
//       setCurrentEvents(eventsInRange);
//
//       successCallback(eventsInRange);
//     },
//     // if you add calendar_lessons in dependencies array, it will get into an infinite loop
//     // eslint-disable-next-line
//     [dispatch, credintials?.token, setCurrentEvents]
//   );
//
//   return (
//     <div className="calendar_container">
//       <div className={isPhone ? "phoneCalendar" : ""}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           eventContent={renderEventContent}
//           eventClassNames={"my-custom-event"}
//           locale={customArLocale}
//           direction="rtl"
//           headerToolbar={{
//             center: "title",
//             left: "prev,next today",
//             right: "dayGridMonth,timeGridWeek,timeGridDay",
//           }}
//           height={"auto"}
//           events={fetchEvents}
//           ref={calendarRef}
//           dateClick={(info) => {
//             setCurrentDate(info.date);
//             setClickedEvent(info.date);
//           }}
//           slotMinTime="08:00:00"
//         />
//       </div>
//       <Sidebar firstDayOfWeek={1} />
//     </div>
//   );
// };
//
// export default Calendar;
