import {TabHeader} from "@/components/tabs/sub-components/Shared.tsx";
import ImgPlaceholder from '@/assets/person-placeholder.svg?react'
import styles from './students.module.css';
import {ImgBox, ProgressBar} from "@/components/UI";
import {useEffect, useState} from "react";
import {getAllRelatedStudents, TRelatedStudent} from "@/services/studentsAndTeachers.ts";

const {students_menu, info, text_box, count, student_box} = styles;

const Students = () => {

  const [studentsData, setStudentsData] = useState<TRelatedStudent[]>([])

  const sendRequestToServer = () => {
    getAllRelatedStudents().then(res => {
      setStudentsData(res)
    })
  }

  useEffect(() => {
    sendRequestToServer()
  }, [])

  return (
    <>
      <TabHeader text="قائمة طلابك" onClick={sendRequestToServer}/>

      <section className={students_menu}>
        {studentsData.map((student) => {
          return (
            <article key={student.id} className={student_box}>

              <section className={info}>
                <ImgBox size="56px">
                  <ImgPlaceholder/>
                </ImgBox>

                <div className={text_box}>
                  <h4>{student.name}</h4>
                  <ProgressBar width={`${student.completion_percentage}%`} color1={student.lesson_count < 4 ? "#eda61c" : undefined}
                               color2={student.lesson_count < 4 ? "#e5ba68" : undefined}/>
                </div>
              </section>
              <span className={count}>{`${student.lesson_count}`} حصص</span>

            </article>
          )
        })}
      </section>
    </>
  );
}

export default Students;