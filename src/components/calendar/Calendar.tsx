import {useContext, useState} from "react";
import ChevronRight from '@/assets/chevronRight.svg?react';
import ChevronLeft from '@/assets/chevronLeft.svg?react';

import styles from './calendar.module.css'
import {CalendarContext} from "@/store/context/CalendarContext.tsx";

const {calendar_container, calendar_btn, months_wrapper, months_names, weekAbbreviations, days_wrapper} = styles;

const Calendar = () => {

  const {clickedDate, setClickedDate} = useContext(CalendarContext);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const months = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"]

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

  return (
    <section className={calendar_container}>
      <div className={months_wrapper}>
        <button
          className={calendar_btn}
          onClick={handlePrevMonth}
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
              style={{color: index === 1 ? "#fff" : "#bbdcc7"}}
            >
                      {month}
                    </span>
          ))}
        </div>
        <button
          className={calendar_btn}
          onClick={handleNextMonth}
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
          const isClicked = day.getTime() === clickedDate.getTime()
          const beforeToday = day.getTime() < today.getTime()
          return (
            <div
              key={index}
              style={{
                background: (isToday || isClicked) ? "linear-gradient(90deg, #60D48A 4.01%, #35E93C 98.73%)" : "transparent",
                color: beforeToday ? "#bbdcc7" : "#fff",
                textDecoration: beforeToday ? 'line-through' : ""
              }}
              onClick={() => setClickedDate(day)}
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