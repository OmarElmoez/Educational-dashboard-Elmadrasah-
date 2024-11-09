import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Component() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear())

  // Arabic month names
  const months = ["ديسمبر", "يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر"]

  // Arabic weekday abbreviations
  const weekDays = ["س", "أح", "أث", "ث", "ر", "خ", "ج"]

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const getCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayIndex = firstDay.getDay()

    const calendarDays = []
    let currentDate = new Date(year, month - 1, 1 - startingDayIndex)

    for (let i = 0; i < 42; i++) {
      calendarDays.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isPreviousMonth: currentDate.getMonth() === (month - 1 + 12) % 12,
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return calendarDays
  }

  const calendarDays = getCalendarDays(currentYear, currentMonth)

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
    <div className="w-full max-w-md mx-auto" dir="rtl">
      <div className="bg-[#1B874B] rounded-3xl p-6 text-white">
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white hover:bg-white/20"
            onClick={handlePrevMonth}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="flex gap-8 text-lg">
            {[
              months[(currentMonth - 1 + 12) % 12],
              months[currentMonth],
              months[(currentMonth + 1) % 12],
            ].map((month, index) => (
              <span
                key={month}
                className={cn(
                  index === 1 ? "text-white" : "text-[#bbdcc7]"
                )}
              >
                {month}
              </span>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white hover:bg-white/20"
            onClick={handleNextMonth}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map(({ date, isCurrentMonth, isPreviousMonth }, index) => {
            const isToday = date.getTime() === today.getTime()
            return (
              <div
                key={index}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-full text-sm",
                  isToday && "bg-white/20",
                  !isCurrentMonth && "opacity-40",
                  isPreviousMonth && "line-through"
                )}
              >
                {date.getDate()}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}