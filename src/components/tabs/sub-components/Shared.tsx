import {Heading, Satisfaction} from "@/components/UI";

import TeacherIcon from '@/assets/teacher.svg?react';
import StudentsIcon from '@/assets/students.svg?react';
import ReloadIcon from '@/assets/reload.svg?react';

import styles from './shared.module.css'
import {ReactNode} from "react";
import timeDifferenceStatus from "@/utils/timeDifferenceStatus.ts";
import convert24HourToArabic from "@/utils/convert24HourToArabic.ts";

const {test_classes, dot, satisfaction_container, timing, label, info_paragraphs, section_header} = styles;

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


export type TTeacher = {
  start_time_employee: string,
  status: string,
  from_time: string,
  teacher_name: string,
}

export type TStudent = {
  start_time_student: string;
  lesson__from_time: string;
  student_name: string;
}

export const TimingDetails = ({teachers, students}: {
  teachers: TTeacher[],
  students: TStudent[]
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

          {teachers.length > 0 && teachers.map((teacher, idx) => (
            <p key={`${teacher.teacher_name}_${idx}`} style={{backgroundColor: `${timeDifferenceStatus(
                teacher.from_time,
                "13:50:00").bg_color}`}}>
              <span className={dot}></span>
              <span>{teacher.teacher_name} : في الساعة {convert24HourToArabic(
                teacher.start_time_employee as string)} ( {timeDifferenceStatus(
                teacher.from_time,
                "13:50:00").text} )</span>
            </p>
          ))}

        </div>
      </section>

      <section>
        <div className={label}>
          <StudentsIcon/>
          <span>الطلاب</span>
        </div>
        <div className={info_paragraphs}>

          {students.length > 0 && students.map((student, idx) => (
            <p key={`${student.student_name}_${idx}`} style={{backgroundColor: `${timeDifferenceStatus(
                student.lesson__from_time,
                "14:00:00").bg_color}`}}>
              <span className={dot}></span>
              <span>{student.student_name} : في الساعة {convert24HourToArabic(
                student.start_time_student as string)} ( {timeDifferenceStatus(
                student.lesson__from_time,
                "14:00:00").text} )</span>
            </p>
          ))}

        </div>
      </section>
    </article>
  )
}