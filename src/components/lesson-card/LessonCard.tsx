import { useState, useEffect } from "react";
import ClockIcon from "@/assets/clock.svg?react";
import ZoomIcon from "@/assets/zoom-logo.svg?react";
import EgyptFlag from "@/assets/flag-egypt.svg?react";
import EmiratesFlag from "@/assets/flag-united-arab-emirates.svg?react";
import FileIcon from "@/assets/file-outline.svg?react";
import { useNavigate } from "react-router-dom";
import styles from "./lessonCard.module.css";
import { useAppSelector } from "@/store/hooks.ts";
import { THourLesson } from "@/store/tabs/TabsSlice.ts";
import { TLesson } from "@/schemas/LessonSchema.ts";
import STATUS_INFO from "@/constants/lessons-status.ts";
import convertToArabicTime from "@/utils/convertToArabicTime";
import convertAppTime from "@/utils/convertAppTime";

const { card, status_box, role_title, status_data, uploaded_files } = styles;

type TLessonCardProps<T> = {
  lesson: T;
};
const isTLesson = (lesson: TLesson | THourLesson): lesson is TLesson => {
  return (lesson as TLesson).participants !== undefined;
};
const LessonCard = <T extends TLesson | THourLesson>({
  lesson,
}: TLessonCardProps<T>) => {
  const [displayTime, setDisplayTime] = useState<string>();
  useEffect(() => {
    let timeRange = `${lesson.from_time} - ${lesson.to_time}`;
    setDisplayTime(convertToArabicTime(timeRange));
  }, [lesson]);
  const navigate = useNavigate();
  const { credintials } = useAppSelector((state) => state.auth);

  const navigateToJoinPage = (id: number) => {
    navigate(`/${credintials?.role?.toLowerCase()}/calendar/join-class/${id}`);
  };
  const lessonStartEndTimeForUserRole = (lessonData: TLesson) => {
    let userRole = credintials?.role?.toLowerCase();
    const teacherEntry = lessonData?.start_time_employee ? (
      <span>
        دخول المدرس : {convertAppTime(lessonData.start_time_employee)}
      </span>
    ) : null;

    const teacherExit = lessonData?.end_time_employee ? (
      <span>خروج المدرس : {convertAppTime(lessonData.end_time_employee)}</span>
    ) : null;

    const studentEntry = lessonData?.participants[0]?.start_time_student ? (
      <span>
        دخول الطالب :{" "}
        {convertAppTime(lessonData.participants[0].start_time_student)}
      </span>
    ) : null;

    const studentExit = lessonData?.participants[0]?.end_time_student ? (
      <span>
        خروج الطالب :{" "}
        {convertAppTime(lessonData.participants[0].end_time_student)}
      </span>
    ) : null;

    switch (userRole) {
      case "teacher":
        return (
          <>
            {teacherEntry}
            {teacherExit}
          </>
        );
      case "student":
        return (
          <>
            {studentEntry}
            {studentExit}
          </>
        );
      case "family":
        return (
          <>
            {studentEntry}
            {studentExit}
          </>
        );
      default:
        return (
          <>
            {teacherEntry}
            {teacherExit}
            {studentEntry}
            {studentExit}
          </>
        );
    }
  };
  const lessonStartEndTimeForUserRoleOfTHourLesson = (
    lessonData: THourLesson
  ) => {
    let userRole = credintials?.role?.toLowerCase();
    const teacherEntry = lessonData?.start_time_employee ? (
      <span>
        دخول المدرس : {convertAppTime(lessonData.start_time_employee)}
      </span>
    ) : null;

    const teacherExit = lessonData?.end_time_employee ? (
      <span>خروج المدرس : {convertAppTime(lessonData.end_time_employee)}</span>
    ) : null;

    const studentEntry = lessonData?.start_time_student ? (
      <span>دخول الطالب : {convertAppTime(lessonData.start_time_student)}</span>
    ) : null;

    const studentExit = lessonData?.end_time_student ? (
      <span>خروج الطالب : {convertAppTime(lessonData.end_time_student)}</span>
    ) : null;

    switch (userRole) {
      case "teacher":
        return (
          <>
            {teacherEntry}
            {teacherExit}
          </>
        );
      case "student":
        return (
          <>
            {studentEntry}
            {studentExit}
          </>
        );
      case "family":
        return (
          <>
            {studentEntry}
            {studentExit}
          </>
        );
      default:
        return (
          <>
            {teacherEntry}
            {teacherExit}
            {studentEntry}
            {studentExit}
          </>
        );
    }
  };
  return (
    <article
      key={lesson.id}
      className={card}
      onClick={() => navigateToJoinPage(lesson.id)}
      style={{ backgroundColor: STATUS_INFO[lesson.status].colors.outer_bg }}
    >
      <h4 title={lesson.name}>{lesson.name}</h4>
      <div>
        <ClockIcon style={{ stroke: "#93B59F" }} />
        <p>{displayTime}</p>
      </div>

      <div>
        <EgyptFlag />
        <span>المعلم</span>
        <span className={role_title} title={lesson.employee_name}>
          {lesson.employee_name}
        </span>
      </div>

      <div>
        <EmiratesFlag />
        {"student_name" in lesson ? (
          <>
            <span>الطالب</span>
            <span className={role_title}> {lesson.student_name}</span>
          </>
        ) : (
          <>
            <span>الطالب</span>
            <span
              className={role_title}
              title={lesson.participants[0]?.student_name}
            >
              {lesson.participants[0]?.student_name}
            </span>
          </>
        )}
      </div>

      <div>
        <FileIcon />
        {lesson.lesson_files?.length > 0 ? (
          <p className={uploaded_files}> تم رفع الملفات</p>
        ) : (
          <p>لم يتم رفع الملفات</p>
        )}
      </div>
      {credintials?.role === "Admin" && lesson.zoom_id && <div>
          <ZoomIcon />
      </div>}
      <div className={status_data}>
        {isTLesson(lesson)
          ? lessonStartEndTimeForUserRole(lesson)
          : lessonStartEndTimeForUserRoleOfTHourLesson(lesson)}
        <span
          className={status_box}
          style={{
            backgroundColor: STATUS_INFO[lesson.status].colors.inner_bg,
            color: STATUS_INFO[lesson.status].colors.text,
          }}
        >
          {STATUS_INFO[lesson.status].label}
        </span>
      </div>
    </article>
  );
};

export default LessonCard;
