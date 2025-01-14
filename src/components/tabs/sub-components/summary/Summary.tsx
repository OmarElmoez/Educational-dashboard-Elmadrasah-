import {Button, Heading} from "@/components/UI";
import AddIcon from '@/assets/add.svg?react';
import Arrow from '@/assets/faq_arrow.svg?react';

import styles from './summary.module.css';
import {useAppSelector} from "@/store/hooks.ts";
import {useEffect, useRef, useState} from "react";
import {actGetLessonTracks} from "@/services/lessons.ts";
import formatDateIntoArabic from "@/utils/formatDateIntoArabic.ts";
import {BasicModal} from "@/components";
import {TModalRef} from "@/types/shared.ts";
import AddTrackForm from "./add-track-form/addTrackForm.tsx";

const {
  summary_header,
  tracks_container,
  track_box,
  track_toggle,
  track_label,
  track_info,
  info_box,
  info_text,
  goals,
} = styles;

export type TTrackFromServer = {
  id: number;
  title: string;
  status: string;
  description: string;
  created_at: string;
  track_goals: {
    id: number;
    text: string;
  }[]
}

const Summary = ({classId}: { classId: string }) => {

  const {credintials} = useAppSelector(state => state.auth);

  const [tracks, setTracks] = useState<TTrackFromServer[]>([])

  const addTrackRef = useRef<TModalRef>(null);

  useEffect(() => {
    if (classId) {
      actGetLessonTracks(classId).then((res) => {
        setTracks(res);
      })
    }
  }, [classId])

  const afterAddNewTrack = (newTrack: TTrackFromServer) => {
    setTracks(prevTracks => [...prevTracks || [], newTrack || {}]);
  }

  return (
    <>
      <BasicModal ref={addTrackRef} borderBottom={false} headerText="إضافة مسار جديد"
                  headerTextStyle={{fontWeight: "500", fontSize: "2rem"}}>
        <AddTrackForm addNewTrack={afterAddNewTrack}/>
      </BasicModal>
      <section>
        <p className='tab_description' style={{marginTop: "1.2rem"}}>نظرة عامة سريعة علي تقدم الطالب والدورات
          القادمة</p>

        <div className={summary_header}>
          <Heading text="مسار التعلم المخصص" style={{margin: "0"}}/>

          {(credintials?.role === 'Teacher' || credintials?.role === 'Admin') &&
              <Button onClick={() => addTrackRef.current?.open()}>
                  <AddIcon/>
                  <span>إضافة مسار</span>
              </Button>}
        </div>

        {tracks?.length > 0 && (

          <section className={tracks_container}>
            {tracks.map(track => {
              return (
                <article className={track_box} key={track.id}>
                  <input type="checkbox" id={`track-${track.id}`} className={track_toggle}/>

                  <label htmlFor={`track-${track.id}`} className={track_label}>
                    <Heading text={track.title} style={{margin: "0", fontWeight: "400", fontSize: "2rem"}}/>
                    <Arrow/>
                  </label>

                  <section className={track_info}>

                    <div className={info_box}>
                      <span>التاريخ:</span>
                      <span className={info_text}>{formatDateIntoArabic(new Date(track.created_at))}</span>
                    </div>

                    <div className={info_box}>
                      <span>الحالة:</span>
                      <span className={info_text}>{track.status}</span>
                    </div>

                    <div className={info_box}>
                      <span>الوصف:</span>
                      <span className={info_text}>{track.description}</span>
                    </div>

                    {track.track_goals?.length > 0 &&
                        <div className={info_box} style={{alignItems: 'flex-start', gap: "3rem"}}>
                            <span>أهداف:</span>
                            <p className={goals}>
                              {track.track_goals.map(goal => {
                                return (
                                  <span key={goal.id} className={info_text}>{goal.text}</span>
                                )
                              })}
                            </p>
                        </div>}

                  </section>
                </article>
              )
            })}

          </section>
        )}
      </section>
    </>
  )
}

export default Summary;