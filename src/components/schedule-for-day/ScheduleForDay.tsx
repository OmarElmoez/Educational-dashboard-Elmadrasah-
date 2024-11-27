import styles from './scheduleForDay.module.css'
import {Heading} from "@/components/UI";
import {TTab} from "@/components/tabs/Tabs.tsx";
import {Tabs} from "@/components";

const {schedule_container} = styles;

const ScheduleForDay = ({tabs}: {tabs: TTab[]}) => {
  return (
    <section className={schedule_container}>
      <Heading text="جدولك اليوم"
               style={{paddingBottom: "1.2rem", borderBottom: "1px dashed #C0C6C2", marginBottom: "0"}}/>
      <article style={{ marginTop: "2.4rem" }}>
        <Tabs tabs={tabs}/>
      </article>

    </section>
  )
}

export default ScheduleForDay