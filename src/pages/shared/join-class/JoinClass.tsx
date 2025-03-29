import VideoCallIcon from "@/assets/videoCall.svg?react";
import VideoCamIcon from "@/assets/videoCam.svg?react";
import PhoneHangUpIcon from "@/assets/phoneHangUp.svg?react";
import { Card, FlexWrapper, Heading, ProgressBar } from "@/components/UI";
import Fingerprint from "@mui/icons-material/Fingerprint";
import PersonalCard from "@/components/personal-card/PersonalCard.tsx";
import { ReviewForm, Tabs } from "@/components";
import styles from "./joinClass.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import actJoinLesson from "@/store/lessons/act/actJoinLesson.ts";
import { TLesson } from "@/schemas/LessonSchema.ts";
import { useEffect, useRef, useState } from "react";
import { actGetSpecificLessonData } from "@/services/lessons.ts";
import { useFeedback } from "@/store/context";
import generateTabs from "@/utils/generateTabs.ts";
import { TModalRef } from "@/types/shared.ts";
import convertToArabicTime from "@/utils/convertToArabicTime.ts";
import convert24HourToArabic from "@/utils/convert24HourToArabic.ts";
import IconButton from "@mui/material/IconButton";
import CalculateTimeToStartLesson from "@/utils/calculateTimeToStartLesson";
import ClockIcon from "@/assets/clock.svg?react";
const {
  attendance_box,
  student_classes,
  lesson_actions,
  lesson_status,
  heading_button_container,
  lesson_indicator,
  entrance_data,
} = styles;

const STATUS_TEXT = {
  Attended: "تم الحضور",
  Scheduled: "لم يبدأ الدرس بعد .",
  Missed: "متغيب",
  Progressing: "جارية",
  Cancelled: "تم الالغاء",
};

export type TPersonInfo = {
  name: string;
  employee_name?: string;
  subject: string | null;
  employee_subject?: string | null;
  image: string | null;
  employee_image?: string | null;
  grade: string;
  country: string | null;
  employee_country?: string | null;
  language: string | null;
  employee_language?: string | null;
  teacher_bio: string;
  student_goal: string;
  number_of_lessons?: number | null;
  //   todo: waiting for student classes
};
type TEntranceTime = {
  startTimeTeacher: string;
  startTimeStudent: string;
};
const JoinClass = () => {
  const { classId } = useParams();
  const [lessonData, setLessonData] = useState<TLesson>();
  const dispatch = useAppDispatch();
  const { credintials } = useAppSelector((state) => state.auth);
  const [displayTime, setDisplayTime] = useState<string>();
  const [displayEntranceTime, setDisplayEntranceTime] =
    useState<boolean>(false);
  const [EntranceTime, setEntranceTime] = useState<TEntranceTime>({
    startTimeTeacher: "",
    startTimeStudent: "",
  });
  const [person, setPerson] = useState<TPersonInfo>({
    name: "",
    subject: "",
    image: null,
    grade: "",
    country: null,
    language: null,
    teacher_bio: "",
    student_goal: "",
  });

  const { openFeedbackModal } = useFeedback();

  const isTeacher = credintials?.role === "Teacher";


  useEffect(() => {
    if (classId) {
      actGetSpecificLessonData(classId).then((res) => {
        setLessonData(res);
        if (credintials?.role === "Admin") {
          let timeRange = `${res?.from_time} - ${res?.to_time}`;
          setDisplayTime(convertToArabicTime(timeRange));
          setPerson({
            name: res.participants[0].student_name,
            employee_name: res.employee_name,
            subject: res.subject_name,
            image: res.participants[0].image,
            employee_image: res.employee_image,
            grade: res.participants[0].grade,
            country: res.participants[0].country,
            employee_country: res.employee_country,
            language: res.participants[0].student_language,
            employee_language: res.employee_language,
            teacher_bio: res.employee_bio,
            student_goal: res.participants[0].objective,
            number_of_lessons: res.participants[0].credit,
          });
        } else {
          setPerson({
            name: isTeacher
              ? res.participants[0].student_name
              : res.employee_name,
            grade: res.participants[0].grade,
            image: isTeacher ? res.participants[0].image : res.employee_image,
            subject: res.subject,
            country: isTeacher
              ? res.participants[0].country
              : res.employee_country,
            language: isTeacher
              ? res.participants[0].student_language
              : res.employee_language,
            teacher_bio: res.employee_bio,
            student_goal: res.participants[0].objective,
          });
        }
      });
    }
  }, [classId, isTeacher, credintials]);

  const lessonHandler = (status: "start" | "end") => {
    dispatch(
      actJoinLesson({
        attendance_link: (status === "start"
          ? lessonData?.attendance_link
          : lessonData?.end_attendance_link) as string,
      })
    ).then((res) => {
      if (typeof res.payload === "string") {
        openFeedbackModal("failed", `${res.payload}`);
        return;
      }
    });
  };
  const handleAttendanceTime = () => {
    if (classId) {
      actGetSpecificLessonData(classId).then((res) => {
        setEntranceTime({
          startTimeTeacher: res?.start_time_employee || "",
          startTimeStudent:
            res?.participants[0]?.start_time_student || "",
        });
        setDisplayEntranceTime(!displayEntranceTime);
      });
    }
  };

  const reviewRef = useRef<TModalRef>(null);
  const openReviewForm = () => {
    reviewRef.current?.open();
  };

  const onEndLesson = () => {
    lessonHandler("end");
    if (["Teacher", "Student"].includes(credintials?.role as string)) {
      openReviewForm();
    }
  };

  return (
    <>
      <ReviewForm ref={reviewRef} lesson_id={lessonData?.id} />
      <FlexWrapper>
        <PersonalCard cardFor={credintials?.role} person={person} />
        {credintials?.role === "Admin" ? (
          <>
            <Card>
              <Heading
                text="الدرس الحالي"
                style={{ fontSize: "2rem", marginTop: "0", marginBottom: "0" }}
              />
              <section className={attendance_box}>
                {lessonData?.from_datetime && (
                  <>
                    <div
                      className="start_timer"
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "0.4rem",
                        fontSize: "1rem",
                        textAlign: "left",
                        color: "#AAB8AF",
                      }}
                    >
                      <ClockIcon style={{ stroke: "#AAB8AF" }} />
                      <CalculateTimeToStartLesson
                        fromTime={lessonData?.from_datetime}
                      />
                    </div>
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    gap: "1.2rem",
                    alignItems: "center",
                  }}
                >
                  <VideoCallIcon />
                  <Heading
                    text="ميعاد الدرس"
                    style={{ fontSize: "2rem", fontWeight: "400", margin: "0" }}
                  />
                  <span>{`(${displayTime})`}</span>
                </div>
                {lessonData?.status && (
                  <>
                    <span className={lesson_status}>
                      {STATUS_TEXT[lessonData.status]}
                    </span>
                  </>
                )}
              </section>

              <section className={student_classes}>
                <div className={entrance_data}>
                  <IconButton
                    aria-label="fingerprint"
                    color="success"
                    style={{ border: "1px solid" }}
                    onClick={handleAttendanceTime}
                  >
                    <Fingerprint />
                  </IconButton>
                  {displayEntranceTime ? (
                    <>
                      <p>
                        حضر المُعلم الساعة : {convert24HourToArabic(EntranceTime.startTimeTeacher)}
                      </p>
                      <p>
                        حضر الطالب الساعة : {convert24HourToArabic(EntranceTime.startTimeStudent)}
                      </p>
                    </>
                  ) : null}
                </div>

                <div className={heading_button_container}>
                  <Heading
                    text="حصص الطالب"
                    style={{
                      fontSize: "2rem",
                      fontWeight: "400",
                      marginTop: "1rem",
                      marginBottom: "0rem",
                    }}
                  />
                </div>
                <div
                  className={lesson_indicator}
                  style={{ marginTop: "1.2rem" }}
                >
                  <div style={{ width: "90%" }}>
                    <ProgressBar
                      style={{ marginTop: "0rem" }}
                      width={`${
                        lessonData?.participants[0]
                          .remaining_classes_percentage ?? 0
                      }%`}
                    />
                  </div>
                  <p
                    style={{
                      textAlign: "left",
                      color: "var(--main-color)",
                    }}
                  >
                    أتم{" "}
                    {`${
                      lessonData?.participants[0]
                        .remaining_classes_percentage ?? 0
                    }%`}
                  </p>
                </div>
              </section>
              <section
                className={lesson_actions}
                style={{ marginTop: "1.2rem" }}
              >
                {((isTeacher && lessonData?.can_join) ||
                  (!isTeacher && lessonData?.participants[0].can_join)) && (
                  <button
                    onClick={() => lessonHandler("start")}
                    style={{
                      backgroundColor:
                        lessonData?.can_join === false
                          ? "var(--gray-color)"
                          : "var(--main-color)",
                      width: "18rem",
                      height: "4.8rem",
                    }}
                  >
                    <VideoCamIcon />
                    <span>بدأ الدرس</span>
                  </button>
                )}

                {(!lessonData?.can_join && lessonData?.end_time_employee === null) && (
                  <button onClick={onEndLesson} style={{ width: "18rem" }}>
                    <PhoneHangUpIcon />
                    <span>إنهاء الدرس</span>
                  </button>
                )}
              </section>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <Heading
                text="الدرس الحالي"
                style={{ fontSize: "2rem", marginTop: "0", marginBottom: "0" }}
              />
              <section className={attendance_box}>
                <div
                  style={{
                    display: "flex",
                    gap: "1.2rem",
                    alignItems: "center",
                  }}
                >
                  <VideoCallIcon />
                  <Heading
                    text="حضور الدرس"
                    style={{ fontSize: "2rem", fontWeight: "400", margin: "0" }}
                  />
                </div>
                {lessonData?.status && (
                  <span className={lesson_status}>
                    {STATUS_TEXT[lessonData.status]}
                  </span>
                )}
              </section>
              <section className={student_classes} style={{marginTop: '2rem'}}>
                <div className={heading_button_container}>
                  <Heading
                    text="حصص الطالب"
                    style={{ fontSize: "2rem", fontWeight: "400", margin: "0" }}
                  />
                  <section className={lesson_actions}>
                    {((isTeacher && lessonData?.can_join) ||
                      (!isTeacher && lessonData?.participants[0].can_join)) && (
                      <button
                        onClick={() => lessonHandler("start")}
                        style={{
                          backgroundColor:
                            lessonData?.can_join === false
                              ? "var(--gray-color)"
                              : "var(--main-color)",
                        }}
                      >
                        <VideoCamIcon />
                        <span>بدأ الدرس</span>
                      </button>
                    )}

                    {(!lessonData?.can_join && lessonData?.end_time_employee === null) && (
                      <button onClick={onEndLesson}>
                        <PhoneHangUpIcon />
                        <span >إنهاء الدرس</span>
                      </button>
                    )}
                  </section>
                </div>
                <div className={lesson_indicator}>
                  <div style={{ width: "90%" }}>
                    <ProgressBar
                      style={{ marginTop: "0rem" }}
                      width={`${
                        lessonData?.participants[0]
                          .remaining_classes_percentage ?? 0
                      }%`}
                    />
                  </div>
                  <p
                    style={{
                      textAlign: "left",
                      color: "var(--main-color)",
                    }}
                  >
                    أتم{" "}
                    {`${
                      lessonData?.participants[0]
                        .remaining_classes_percentage ?? 0
                    }%`}
                  </p>
                </div>
              </section>
            </Card>
          </>
        )}
      </FlexWrapper>
      <Heading
        text="تفاصيل الحصة"
        style={{ fontSize: "3.2rem", marginTop: "4.8rem" }}
      />
      <Tabs tabs={generateTabs({ lessonData, classId, isTeacher })} />
    </>
  );
};

export default JoinClass;
