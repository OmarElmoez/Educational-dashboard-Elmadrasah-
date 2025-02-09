import { Card, Heading, ImgBox } from "@/components/UI";

import ImgPlaceholder from '@/assets/person-placeholder.svg?react'
import GraduationIcon from '@/assets/Graduation_ hat.svg?react';
import LanguageIcon from '@/assets/Language.svg?react';
import EgyptFlag from '@/assets/big-flag-egypt.svg?react';
import EmiratesFlag from '@/assets/flag-united-arab-emirates.svg?react'
import OnlineClassIcon from '@/assets/onlineClass.svg?react'
import Stars from '@/assets/stars.svg?react';

import styles from './personalCard.module.css'
import { TPersonInfo } from "@/pages/shared/join-class/JoinClass.tsx";

const {
  personal_info,
  text_box,
  rate_box,
  goalsAndSubjects
} = styles;

type TPersonalCardProps = {
  cardFor: 'student' | 'teacher';
  person: TPersonInfo;
}

const PersonalCard = ({cardFor, person}: TPersonalCardProps) => {

  const forTeacher = cardFor === 'teacher';

  return (
    <Card>
      <Heading text={forTeacher ? "تفاصيل المعلم" : "تفاصيل الطالب"}
               style={{fontSize: "2.4rem", margin: '0'}}/>

      <section className={personal_info}>

        <ImgBox size="56px">
          {person.image ? <img src={person.image} alt="user image"/> : <ImgPlaceholder/>}
        </ImgBox>

        <div className={text_box}>
          <h4>{person?.name}</h4>
          <p>{forTeacher ? `أستاذ مادة ${person.subject}` : `طالب بالصف ${person.grade}`} </p>
        </div>

      </section>

      {forTeacher && <section className={rate_box}>
          <span>التقييم</span>
          <Stars/>
      </section>}

      {!forTeacher && <section className={goalsAndSubjects}>

          <div>
              <Heading text="المواد :" style={{fontSize: "2rem", margin: '0'}}/>
              <span style={{color: "#616161"}}>العربي , القرآن الكريم</span>
          </div>

          <div>
              <Heading text="هدف الطالب :" style={{fontSize: "2rem", margin: '0'}}/>
              <span style={{color: "#616161"}}>{person.student_goal}</span>
          </div>

      </section>}

      <menu>
        {forTeacher && <li>
            <GraduationIcon/>
            <span>{person.teacher_bio}</span>
        </li>}

        {!forTeacher && <li>
            <OnlineClassIcon/>
            <span>عدد الحصص: </span>
        </li>}

        <li>
          <LanguageIcon/>
          <span>
   اللغة :          {person.language ? (person.language === "ar" ? "العربية" : "الانجليزية") : "غير محددة"}
          </span>
        </li>

        <li>
          {person.country === 'Egypt' ? <EgyptFlag/> : <EmiratesFlag/>}
          <span>الدولة: {person.country}</span>
        </li>
      </menu>
    </Card>
  )
}

export default PersonalCard;