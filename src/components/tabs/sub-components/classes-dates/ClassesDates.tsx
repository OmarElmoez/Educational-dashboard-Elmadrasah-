import styles from './classesDates.module.css';
import formatDateIntoArabic from "@/utils/formatDateIntoArabic.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {actGetSharedLessons} from "@/services/lessons.ts";
import {TLesson} from "@/schemas/LessonSchema.ts";

const {classes_wrapper, duration} = styles;

const ClassesDates = () => {

  const {classId} = useParams();

  const [sharedLessons, setSharedLessons] = useState<TLesson[]>([])

  useEffect(() => {
    if (classId) {
      actGetSharedLessons(classId).then((res) => {
        setSharedLessons(res)
      })
    }
  }, [classId]);

  return (
    <>
      {sharedLessons.length > 0 && <section className={classes_wrapper}>
        {sharedLessons.map(lesson => {
          return (
            <article key={lesson.id}>
              <span>{formatDateIntoArabic(new Date(lesson.from_date))}</span>
              <span>{lesson.name}</span>
              <span className={duration}>{lesson.duration_minutes} دقيقة</span>
            </article>
          )
        })}
      </section>}
    </>
  )
}

export default ClassesDates;