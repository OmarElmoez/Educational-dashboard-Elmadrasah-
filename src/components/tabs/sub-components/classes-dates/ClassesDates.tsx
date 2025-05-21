import styles from './classesDates.module.css';
import formatDateIntoArabic from "@/utils/formatDateIntoArabic.ts";
import {useEffect, useState} from "react";
import {actGetSharedLessons} from "@/services/lessons.ts";
import {TLesson} from "@/schemas/LessonSchema.ts";
import { TLoading } from "@/types/shared.ts";
import { LoadingIndicator } from "@/components";

const {classes_wrapper, duration} = styles;

const STATUS_COLORS = {
  'Attended': '#0650A7',
  'Scheduled': '#1C8A44',
  'Progressing': '#828684',
  'Missed': '#F64E60',
  'Cancelled': '#F64E60',
}

const ClassesDates = ({classId}: {classId: string}) => {

  const [sharedLessons, setSharedLessons] = useState<TLesson[]>([])

  const [loading, setLoading] = useState<TLoading>('idle')

  useEffect(() => {
    if (classId) {
      setLoading("pending")
      actGetSharedLessons(classId).then((res) => {
        setLoading("succeeded")
        setSharedLessons(res)
      })
    }
  }, [classId]);

  return (
    <>
      {loading === "pending" && <LoadingIndicator />}
      {(loading === "succeeded" && sharedLessons.length === 0) && <p>لا توجد بيانات</p>}
      {(loading === 'succeeded' && sharedLessons.length > 0) && <section className={classes_wrapper}>
        {sharedLessons.map(lesson => {
          return (
            <article key={lesson.id}>
              <span>{formatDateIntoArabic(new Date(lesson.from_date))}</span>
              <span>{lesson.name}</span>
              <span className={duration} style={{width: '150px', backgroundColor: STATUS_COLORS[lesson.status], color: '#f4f4f4', fontWeight: '400'}}>{lesson.status}</span>
              <span className={duration}>{lesson.duration_minutes} دقيقة</span>
            </article>
          )
        })}
      </section>}
    </>
  )
}

export default ClassesDates;