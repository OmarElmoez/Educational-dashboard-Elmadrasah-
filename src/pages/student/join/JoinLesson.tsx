import HeroImg from '@/assets/join-lesson-cover.svg?react';
import Stars from '@/assets/stars.svg?react';

import styles from './joinLesson.module.css';
import PersonalCard from "@/components/personal-card/PersonalCard.tsx";
import {Card, FlexWrapper, Heading} from "@/components/UI";


const {rate_box} = styles;

const JoinLesson = () => {
  return (
    <>
      <div style={{textAlign: 'center'}}>
        <HeroImg/>
      </div>

      <FlexWrapper>

        <PersonalCard>
          <div className={rate_box}>
            <span>التقييم</span>
            <Stars/>
          </div>
        </PersonalCard>

        <Card>
          <Heading text="الدرس الحالي" style={{fontSize: "3.2rem", marginTop: "0", marginBottom: "0"}}/>
        </Card>

      </FlexWrapper>

      <Heading text="تفاصيل الحصة" style={{fontSize: "3.2rem", marginTop: "4.8rem", marginBottom: "0"}}/>


    </>
  )
}

export default JoinLesson;