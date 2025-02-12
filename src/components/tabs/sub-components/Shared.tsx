import { Heading, Satisfaction } from "@/components/UI";

import TeacherIcon from '@/assets/teacher.svg?react';
import StudentsIcon from '@/assets/students.svg?react';
import ReloadIcon from '@/assets/reload.svg?react';

import styles from './shared.module.css'
import { ReactNode } from "react";
import convert24HourToArabic from "@/utils/convert24HourToArabic.ts";
import { TLoading } from "@/types/shared.ts";
import { LoadingIndicator } from "@/components";

const {
  test_classes,
  dot,
  satisfaction_container,
  timing,
  label,
  info_paragraphs,
  section_header,
  timing_box,
  titles_box
} = styles;

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
  start_time_student: string,
  lesson__from_time: string;
  student_name: string;
  status: string;
}

export const TimingDetails = ({teachers, students, loading}: {
  teachers: TTeacher[],
  students: TStudent[],
  loading: TLoading,
}) => {

  return (
    <article className={timing}>
      <Heading text="توقيت دخول الدرس" style={{fontSize: "2rem", marginBottom: "0"}}/>

      <section className={titles_box}>
        <div className={label}>
          <TeacherIcon/>
          <span>المعلمين</span>
        </div>
        <div className={label}>
          <StudentsIcon/>
          <span>الطلاب</span>
        </div>
      </section>
      {loading === 'pending' && <LoadingIndicator/>}
      <div className={timing_box}>
        <section>
          <div className={info_paragraphs}>

            {teachers.length > 0 && teachers.map((teacher, idx) => (
              <p key={`${teacher.teacher_name}_${idx}`} style={{
                backgroundColor: `${teacher?.status === 'Missed' ? "#f7cece" : "#FF880033"}`
              }}>
                <span className={dot}></span>
                <span>{teacher.teacher_name} : في الساعة {convert24HourToArabic(
                  teacher.from_time)}</span>
                <span style={{marginRight: "auto", whiteSpace: "nowrap"}}>( {teacher?.status === 'Missed' ? "متغيب" : "متأخر"} )</span>
              </p>
            ))}

          </div>
        </section>

        <section>
          <div className={info_paragraphs}>

            {students.length > 0 && students.map((student, idx) => (
              <p key={`${student.student_name}_${idx}`} style={{
                backgroundColor: `${student?.status === 'Missed' ? "#f7cece" : "#FF880033"}`
              }}>
                <span className={dot}></span>
                <span>{student.student_name} : في الساعة {convert24HourToArabic(
                  student.lesson__from_time)}
                  </span>
                <span style={{marginRight: "auto", whiteSpace: "nowrap"}}>( {student?.status === 'Missed' ? "متغيب" : "متأخر"} )</span>
              </p>
            ))}

          </div>
        </section>
      </div>
    </article>
  )
}