import {TabHeader} from "@/components/tabs/sub-components/Shared.tsx";
import ImgPlaceholder from '@/assets/person-placeholder.svg?react'
import styles from './students.module.css';
import {ImgBox, ProgressBar} from "@/components/UI";

const {students_menu, info, text_box, count, student_box} = styles;

const Students = () => {
  return (
    <>
      <TabHeader text="قائمة طلابك" onClick={() => {
      }}/>

      <section className={students_menu}>
        {[...Array(10)].map((_, idx) => {
          const sectionNumber = idx + 1;
          return (
            <article key={idx} className={student_box}>

              <section className={info}>
                <ImgBox size="56px">
                  <ImgPlaceholder/>
                </ImgBox>

                <div className={text_box}>
                  <h4>محمد أحمد</h4>
                  <ProgressBar width="55%" color1={sectionNumber % 2 === 0 ? "#eda61c" : undefined} color2={sectionNumber % 2 === 0 ? "#e5ba68" : undefined}/>
                </div>
              </section>
              <span className={count}>4 حصص</span>

            </article>
          )
        })}
      </section>
    </>
  );
}

export default Students;