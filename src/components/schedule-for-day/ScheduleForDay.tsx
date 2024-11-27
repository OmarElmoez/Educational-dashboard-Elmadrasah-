import styles from './scheduleForDay.module.css'
import {Heading} from "@/components/UI";
import {TTab} from "@/components/tabs/Tabs.tsx";
import {AllHours, CurrentHour, Overview} from "@/components/tabs/sub-components";
import {Tabs} from "@/components";

const {schedule_container} = styles;

const ADMIN_TABS: TTab[] = [
  {
    id: 0,
    label: "الساعة الحالية",
    content: CurrentHour,
  },
  {
    id: 1,
    label: "نظرة عامة",
    content: Overview,
  },
  {
    id: 2,
    label: "جميع الساعات",
    content: AllHours,
  }
]

const ScheduleForDay = () => {
  return (
    <section className={schedule_container}>
      <Heading text="جدولك اليوم"
               style={{paddingBottom: "1.2rem", borderBottom: "1px dashed #C0C6C2", marginBottom: "0"}}/>
      <article style={{ marginTop: "2.4rem" }}>
        <Tabs tabs={ADMIN_TABS}/>
      </article>

    </section>
  )
}

export default ScheduleForDay