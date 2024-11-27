import {TabHeader} from "@/components/tabs/sub-components/Shared.tsx";
import ImgPlaceholder from '@/assets/person-placeholder.svg?react'

import styles from './teachers.module.css';
import {ImgBox} from "@/components/UI";
import {Rate} from "@/components";


const {teachers_menu, info, text_box, subject_name, teacher_box} = styles;
const Teachers = () => {
  return (
    <>
      <TabHeader text="قائمة المُعلمين" onClick={() => {
      }}/>

      <section className={teachers_menu}>

        <article className={teacher_box}>
          <section className={info}>
            <ImgBox size="56px">
              <ImgPlaceholder/>
            </ImgBox>

            <div className={text_box}>
              <h4>محمد أحمد</h4>
              <Rate defaultRate={3}/>
            </div>
          </section>
          <span className={subject_name}>اللغة الإنجليزية</span>
        </article>
        
        <article className={teacher_box}>
          <section className={info}>
            <ImgBox size="56px">
              <ImgPlaceholder/>
            </ImgBox>

            <div className={text_box}>
              <h4>محمد أحمد</h4>
              <Rate defaultRate={3}/>
            </div>
          </section>
          <span className={subject_name}>اللغة الإنجليزية</span>
        </article>

      </section>
    </>
  );
}

export default Teachers;