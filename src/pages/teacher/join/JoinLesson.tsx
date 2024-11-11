import {Card, FlexWrapper} from "@/components/UI";
import PersonalCard from "@/components/personal-card/PersonalCard.tsx";

import HeroImg from '@/assets/join-lesson-cover.svg?react';

const JoinLesson = () => {
  return (
    <>
      <div style={{textAlign: 'center'}}>
        <HeroImg/>
      </div>

      <FlexWrapper>

        <PersonalCard>
          ي
        </PersonalCard>

        <Card>
          <h3>الدرس الحالي</h3>
        </Card>

      </FlexWrapper>

    </>
  )
}

export default JoinLesson