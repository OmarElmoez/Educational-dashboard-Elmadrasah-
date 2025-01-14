import HeroImg from '@/assets/join-lesson-cover.svg?react';
import VideoCallIcon from '@/assets/videoCall.svg?react';
import VideoCamIcon from '@/assets/videoCam.svg?react';
import PhoneHangUpIcon from '@/assets/phoneHangUp.svg?react';
import {Card, FlexWrapper, Heading, ProgressBar} from "@/components/UI";
import PersonalCard from "@/components/personal-card/PersonalCard.tsx";
import {ReviewForm, Tabs} from "@/components";

import styles from './joinClass.module.css'
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import actJoinLesson from "@/store/lessons/act/actJoinLesson.ts";
import {TLesson} from "@/schemas/LessonSchema.ts";
import {useEffect, useRef, useState} from "react";
import {actGetSpecificLessonData} from "@/services/lessons.ts";
import {useFeedback} from "@/store/context";
import generateTabs from "@/utils/generateTabs.ts";
import {TModalRef} from "@/types/shared.ts";

const {attendance_box, student_classes, lesson_actions} = styles;

const STATUS_TEXT = {
  Attended: "تم الحضور",
  Scheduled: "لم يبدأ الدرس بعد .",
  Missed: "متغيب",
  Progressing: "جارية",
  Canceled: "تم الالغاء"
}

export type TPersonInfo = {
  name: string;
  subject: string | null;
  image: string | null;
  grade: string;
  country: string | null;
  language: string | null;
  teacher_bio: string;
  student_goal: string;
//   todo: waiting for student classes
}


const JoinClass = () => {

  const {classId} = useParams();

  const [lessonData, setLessonData] = useState<TLesson>();

  const dispatch = useAppDispatch();

  const {credintials} = useAppSelector(state => state.auth)

  const [person, setPerson] = useState<TPersonInfo>({
    name: '',
    subject: null,
    image: null,
    grade: "",
    country: null,
    language: null,
    teacher_bio: "",
    student_goal: "",
  })

  const {openFeedbackModal} = useFeedback();

  const isTeacher = credintials?.role === 'Teacher';

  useEffect(() => {
      if (classId) {
        actGetSpecificLessonData(classId).then((res) => {
          setLessonData(res);
          setPerson({
            name: isTeacher ? res.participants[0].student_name : res.employee_name,
            grade: res.participants[0].grade,
            image: isTeacher ? res.participants[0].image : res.employee_image,
            subject: res.subject,
            country: isTeacher ? res.participants[0].country : res.employee_country,
            language: isTeacher ? res.participants[0].student_language : res.employee_language,
            teacher_bio: res.employee_bio,
            student_goal: res.participants[0].objective,
          })
        })
      }
    },
    [classId, isTeacher]);

  const lessonHandler = (status: 'start' | 'end') => {
    dispatch(actJoinLesson({
      attendance_link: (status === 'start' ? lessonData?.attendance_link : lessonData?.end_attendance_link) as string,
    }))
    .then((res) => {
      if (typeof res.payload === 'string') {
        openFeedbackModal("failed",
          `${res.payload}`);
        return;
      }
    });
  }

  const reviewRef = useRef<TModalRef>(null);
  const openReviewForm = () => {
    reviewRef.current?.open();
  }

  const onEndLesson = () => {
    lessonHandler('end')
    if (["Teacher", "Student"].includes(credintials?.role as string)) {
      openReviewForm()
    }
  }

  return (
    <>
      <ReviewForm ref={reviewRef} lesson_id={lessonData?.id}/>
      <div style={{textAlign: 'center'}}>
        <HeroImg/>
      </div>
      <FlexWrapper>

        <PersonalCard cardFor={isTeacher ? "student" : "teacher"} person={person}/>

        <Card>
          <Heading text="الدرس الحالي" style={{fontSize: "3.2rem", marginTop: "0", marginBottom: "0"}}/>

          <section className={attendance_box}>
            <div style={{display: "flex", gap: "1.2rem", alignItems: "center"}}>
              <VideoCallIcon/>
              <Heading text="حضور الدرس" style={{fontSize: "2.4rem", fontWeight: "400", margin: '0'}}/>
            </div>
            {lessonData?.status && <span>{STATUS_TEXT[lessonData.status]}</span>}
          </section>

          <section className={student_classes}>
            <Heading text="حصص الطالب" style={{fontSize: "2.4rem", fontWeight: "400", margin: '0'}}/>

            <ProgressBar width="65%"/>
            <p style={{textAlign: 'left', marginTop: "1.6rem", color: "var(--main-color)"}}>أتم 65%</p>
          </section>

          <section className={lesson_actions}>
            {((isTeacher && lessonData?.can_join) || (!isTeacher && lessonData?.participants[0].can_join)) &&
                <button onClick={() => lessonHandler("start")}
                        style={{backgroundColor: lessonData?.can_join === false ? "var(--gray-color)" : "var(--main-color)"}}>
                    <VideoCamIcon/>
                    <span>بدأ الدرس</span>
                </button>}

            {!lessonData?.can_join && <button onClick={onEndLesson}>
                <PhoneHangUpIcon/>
                <span>إنهاء الدرس</span>
            </button>}
          </section>
        </Card>

      </FlexWrapper>

      <Heading text="تفاصيل الحصة" style={{fontSize: "3.2rem", marginTop: "4.8rem"}}/>

      <Tabs tabs={generateTabs({lessonData, classId, isTeacher})}/>
    </>
  )
}

export default JoinClass