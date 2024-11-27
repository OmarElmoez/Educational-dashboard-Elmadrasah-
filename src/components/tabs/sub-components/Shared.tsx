import {Heading, Satisfaction} from "@/components/UI";

import TeacherIcon from '@/assets/teacher.svg?react';
import StudentsIcon from '@/assets/students.svg?react';
import ReloadIcon from '@/assets/reload.svg?react';

import styles from './shared.module.css'
import {ReactNode} from "react";

const {test_classes, dot, satisfaction_container, timing, label, info_paragraphs, section_header} = styles;

// todo: there will be an index to detect the api that the button will reload.
export const TabHeader = ({text, children, onClick}: { text: string, children?: ReactNode, onClick: () => void }) => {
  return (
    <header className={section_header}>
      <span>{text}</span>

      <>
        {children}
      </>

      <button onClick={onClick}>
        <ReloadIcon/>
        <span>إعادة تحميل</span>
      </button>
    </header>
  )
}

export const TestClasses = () => {
  return (
    <div style={{marginTop: '2.4rem'}}>
      <Heading text="صفوف اختبارات" style={{fontSize: "2rem", marginBottom: "0"}}/>

      <p className={test_classes}>
        <span className={dot}></span>
        <span>3 حصص بهم اختبارات</span>
      </p>
    </div>
  )
}

export const StudentSatisfaction = () => {
  return (
    <div style={{marginTop: '2.4rem'}}>
      <Heading text="رضا الطلاب" style={{fontSize: "2rem", marginBottom: "0"}}/>

      <div className={satisfaction_container}>
        <Satisfaction type="happy" rate="25"/>
        <Satisfaction type="sad" rate="2"/>
      </div>
    </div>
  )
}


type TTeacher = {
  start_time_employee?: string,
  status: string,
  from_time: string,
  teacher_name: string,
}

type TStudent = {
  start_time_student?: string;
  lesson__from_time: string;
  student_name: string;
}

export const TimingDetails = ({teachers, students}: {
  teachers?: TTeacher[] | undefined,
  students?: TStudent[] | undefined
}) => {
  return (
    <article className={timing}>
      <Heading text="توقيت دخول الدرس" style={{fontSize: "2rem", marginBottom: "0"}}/>

      <section>
        <div className={label}>
          <TeacherIcon/>
          <span>المعلمين</span>
        </div>
        <div className={info_paragraphs}>
          <p style={{backgroundColor: "#E04A4A33"}}>
            <span className={dot}></span>
            <span>{teachers && teachers[0].teacher_name} : في الساعة 10:05 ص ( متأخر 5 دقائق )</span>
          </p>

          <p style={{backgroundColor: "#1C8A4433"}}>
            <span className={dot}></span>
            <span>ياسين يوسف : في الساعة 10:00 ص ( في الميعاد )</span>
          </p>
        </div>
      </section>

      <section>
        <div className={label}>
          <StudentsIcon/>
          <span>الطلاب</span>
        </div>
        <div className={info_paragraphs}>
          <p style={{backgroundColor: "#E04A4A33"}}>
            <span className={dot}></span>
            <span>{students && students[0].student_name} : في الساعة 10:05 ص ( متأخر 5 دقائق )</span>
          </p>

          <p style={{backgroundColor: "#1C8A4433"}}>
            <span className={dot}></span>
            <span>ياسين يوسف : في الساعة 10:00 ص ( في الميعاد )</span>
          </p>
        </div>
      </section>
    </article>
  )
}