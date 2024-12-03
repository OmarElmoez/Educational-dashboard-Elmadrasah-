import {TabHeader} from "@/components/tabs/sub-components/Shared.tsx";
import ImgPlaceholder from '@/assets/person-placeholder.svg?react'

import styles from './teachers.module.css';
import {ImgBox} from "@/components/UI";
import {Rate} from "@/components";
import {getAllRelatedTeachers, TRelatedTeacher} from "@/services/studentsAndTeachers.ts";
import {useCallback, useContext, useEffect, useState} from "react";
import {CalendarContext} from "@/store/context/CalendarContext.tsx";


const {teachers_menu, info, text_box, subject_name, teacher_box} = styles;
const Teachers = () => {

  const [teachersData, setTeachersData] = useState<TRelatedTeacher[]>([])

  const {role, studentId} = useContext(CalendarContext)
  
  const sendRequestToServer = useCallback(() => {
    if (role === 'Family' && studentId) {
      getAllRelatedTeachers(studentId).then(res => {
        setTeachersData(res)
      })
      return ;
    }
    getAllRelatedTeachers().then(res => {
      setTeachersData(res)
    })
  }, [role, studentId])

  useEffect(() => {
    sendRequestToServer()
  }, [sendRequestToServer])

  return (
    <>
      <TabHeader text="قائمة المُعلمين" onClick={sendRequestToServer}/>

      <section className={teachers_menu}>
        {teachersData?.map((teacher) => {
          return (
            <article key={teacher.id} className={teacher_box}>
              <section className={info}>
                <ImgBox size="56px">
                  {teacher.image ? <img src={teacher.image} alt='teacher image' /> : <ImgPlaceholder/>}
                </ImgBox>

                <div className={text_box}>
                  <h4>{teacher.name}</h4>
                  <Rate defaultRate={teacher.average_rating}/>
                </div>
              </section>
              <span className={subject_name}>{teacher.subject}</span>
            </article>
          )
        })}
      </section>
    </>
  );
}

export default Teachers;