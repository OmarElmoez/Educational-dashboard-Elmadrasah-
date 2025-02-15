import { Dispatch, SetStateAction, useContext, useState } from "react";
import ChevronRight from '@/assets/chevronRight.svg?react';
import ChevronLeft from '@/assets/chevronLeft.svg?react';

import styles from './calendar.module.css'
import {CalendarContext} from "@/store/context/CalendarContext.tsx";
import {useAppDispatch} from "@/store/hooks.ts";
import actGetLessonsByMonth from "@/store/lessons/act/actGetLessonsByMonth.ts";

const {calendar_container, calendar_btn, months_wrapper, months_names, weekAbbreviations, days_wrapper} = styles;

const Calendar = ({setIsHourClicked}: {setIsHourClicked?: Dispatch<SetStateAction<boolean>>}) => {

  const {clickedDate, setClickedDate, setActiveId, activeId} = useContext(CalendarContext);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const months = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"]

  const monthsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const weekDaysAbbreviations = ["أح", "أث", "ث", "ر", "خ", "ج", "س"]

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const getCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1)

    const abbreviations = [...weekDaysAbbreviations.splice(firstDay.getDay()), ...weekDaysAbbreviations.splice(0,
      firstDay.getDay())];

    const lastDay = new Date(year, month + 1, 0);

    const totalDaysInMonth = lastDay.getDate();

    const calendarDays = []


    for (let i = 0; i < totalDaysInMonth; i++) {
      calendarDays.push({
        day: new Date(firstDay),
        isCurrentMonth: firstDay.getMonth() === month,
        isPreviousMonth: firstDay.getMonth() === (month - 1 + 12) % 12,
      })
      firstDay.setDate(firstDay.getDate() + 1)
    }

    return {calendarDays, abbreviations}
  }


  const {calendarDays, abbreviations} = getCalendarDays(currentYear, currentMonth)

  const dispatch = useAppDispatch();


  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1)
        return 11
      }
      return prev - 1
    })
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1)
        return 0
      }
      return prev + 1
    })
  }

  const displayTheCurrentMonth = (state: 'prev' | 'next') => {
    let month;
     if (state === 'prev') {
       month =  monthsNumbers[(currentMonth - 1 + 12) % 12];
     } else {
       month = monthsNumbers[(currentMonth + 1) % 12];
     }

     dispatch(actGetLessonsByMonth({date: `${month}-${currentYear}`}))
  }

  return (
    <section className={calendar_container}>
      <div className={months_wrapper}>
        <button
          className={calendar_btn}
          onClick={() => {
            handlePrevMonth();
            displayTheCurrentMonth('prev')
          }}
        >
          <ChevronRight/>
        </button>
        <div className={months_names}>
          {[
            months[(currentMonth - 1 + 12) % 12],
            months[currentMonth],
            months[(currentMonth + 1) % 12],
          ].map((month, index) => (
            <span
              key={`${month}-${index}`}
              style={{color: index === 1 ? "var(--secondary-color)" : "#646464"}}
            >
                      {month}
                    </span>
          ))}
        </div>
        <button
          className={calendar_btn}
          onClick={() => {
            handleNextMonth();
            displayTheCurrentMonth('next')
          }}
        >
          <ChevronLeft/>
        </button>
      </div>

      <div className={weekAbbreviations}>
        {abbreviations.map((day) => (
          <div key={day}>
            {day}
          </div>
        ))}
      </div>

      <div className={days_wrapper}>
        {calendarDays.map(({day}, index) => {
          const isToday = day.getTime() === today.getTime()
          const isClicked = (day.getTime() === clickedDate.getTime()) && activeId === 2;
          const beforeToday = day.getTime() < today.getTime()
          return (
            <div
              key={index}
              style={{
                background: (isToday || isClicked) ? "linear-gradient(90deg, #60D48A 4.01%, #35E93C 98.73%)" : "transparent",
                color: beforeToday ? "#646464" : "var(--secondary-color)",
                textDecoration: beforeToday ? 'line-through' : ""
              }}
              onClick={() => {
                setClickedDate(day);
                setIsHourClicked && setIsHourClicked(false);
                setActiveId(2)
              }}
            >
              {day.getDate()}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Calendar