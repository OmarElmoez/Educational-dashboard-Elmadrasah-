import {ClassesForDay} from "@/components";
import ImgPlaceholder from '@/assets/person-placeholder.svg?react'
import styles from "./classes.module.css";
import Calendar from "@/components/calendar/Calendar.tsx";
// import {AllHours, CurrentHour, Teachers} from "@/components/tabs/sub-components";
// import {TTab} from "@/components/tabs/Tabs.tsx";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {Heading} from "@/components/UI";
import {useContext, useEffect, useState} from "react";
import {CalendarContext} from "@/store/context/CalendarContext.tsx";
import actGetLessonsByDay from "@/store/lessons/act/actGetLessonsByDay.ts";

const {kids_wrapper, kids_names} = styles;

// const FAMILY_TABS: TTab[] = [
//   {
//     id: 0,
//     label: "الساعة الحالية",
//     content: CurrentHour,
//   },
//   {
//     id: 1,
//     label: "المٌعلمين",
//     content: Teachers,
//   },
//   {
//     id: 2,
//     label: "جميع الساعات",
//     content: AllHours,
//   }
// ]

type TChild =  {   id: number, first_name: string, last_name: string }

const Classes = () => {

  const {statistics} = useAppSelector(state => state.profile);

  const {setStudentId} = useContext(CalendarContext)
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState({
    idx: -1,
    name: "",
  })

  const onClickHandler = (idx: number, child: TChild) => {
    setActiveTab({idx, name: child.first_name})
    setStudentId(child.id)
    dispatch(actGetLessonsByDay({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`, studentId: child.id}))
  }

  useEffect(() => {
    dispatch(actGetLessonsByDay({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`}))
  }, [dispatch]);

  return (
    <>
      {/*<WelcomeSection img={<CalendarImg/>}>*/}
      {/*  <section className={info}>*/}
      {/*    <ProgressCircle/>*/}
      {/*    <div className={welcome_text}>*/}
      {/*      <p>ابنائك يقدموا مستوي</p>*/}
      {/*      <p>رائع 🥳</p>*/}
      {/*    </div>*/}
      {/*  </section>*/}
      {/*</WelcomeSection>*/}

      <section className={kids_wrapper}>
        <Heading text="جدول ابنائك"/>
        <section className={kids_names}>
          {statistics?.map((child: TChild, idx: number) => (
            <div key={child.id} onClick={() => onClickHandler(idx, child)}
                 style={{borderColor: activeTab.idx === idx ? "var(--main-color)" : "#EBEBEB"}}>
              <ImgPlaceholder/>
              <span>{child.first_name}</span>
            </div>
          ))}
        </section>
      </section>

      <section className='calendar_wrapper'>
        <Calendar/>
        {/*<ScheduleForDay tabs={FAMILY_TABS} label = { activeTab.name ? `جدول ${activeTab.name}` : undefined} />*/}
      </section>

      <ClassesForDay/>
    </>
  )
}

export default Classes;