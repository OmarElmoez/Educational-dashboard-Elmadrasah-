import {ProgressBar, StatusBullet} from "@/components/UI";
import {StudentSatisfaction, TabHeader, TestClasses, TimingDetails} from "@/components/tabs/sub-components/Shared.tsx";
import styles from './currentHour.module.css'

const {status} = styles;

const CurrentHour = () => {
  return (
    <section>
      <TabHeader text="الحضور للساعة الحالية" onClick={() => {}}/>

      <article style={{marginTop: "2rem"}}>
        <p>الحصص الجارية ( 6 حصص )</p>

        <ProgressBar width="55%" style={{marginTop: '2.3rem'}}/>
        <div className={status}>
          <StatusBullet color="var(--main-color)" label="10 حضور"/>
          <StatusBullet color="#E02D2D" label="10 عدم حضور"/>
        </div>
      </article>

      <TimingDetails teachers={[]} students={[]}/>

      <TestClasses/>

      <StudentSatisfaction/>

    </section>
  )
}

export default CurrentHour;