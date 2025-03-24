import { Card, Heading, ImgBox } from "@/components/UI";
import ImgPlaceholder from "@/assets/person-placeholder.svg?react";
import GraduationIcon from "@/assets/Graduation_ hat.svg?react";
import LanguageIcon from "@/assets/Language.svg?react";
import EgyptFlag from "@/assets/big-flag-egypt.svg?react";
import EmiratesFlag from "@/assets/flag-united-arab-emirates.svg?react";
import OnlineClassIcon from "@/assets/onlineClass.svg?react";
import Stars from "@/assets/stars.svg?react";
import styles from "./personalCard.module.css";
import { TPersonInfo } from "@/pages/shared/join-class/JoinClass.tsx";

const {
  personal_info,
  text_box,
  rate_box,
  goalsAndSubjects,
  cardContainer,
  teacher_details,
  stu_goals,
} = styles;

type TPersonalCardProps = {
  cardFor: "Admin" | "Student" | "Teacher" | "Family" | undefined;
  person: TPersonInfo;
};

const PersonalCard = ({ cardFor, person }: TPersonalCardProps) => {
  const isTeacher = cardFor === "Teacher";
  const isStudent = cardFor === "Student" || cardFor === "Family";
  const isAdmin = cardFor === "Admin";
  if (isAdmin) {
    return (
      <Card>
        <Heading
          text="تفاصيل الطالب والمعلم"
          style={{ fontSize: "2rem", margin: "0", fontWeight: "500" }}
        />
        <div className={cardContainer}>
          <div>
          <section className={personal_info}>
           <ImgBox size="56px">
              {person.employee_image ? (
                <img
                src={person.employee_image}
                alt="employee image"
                style={{ minWidth: "56px" }}
                />
              ) : (
                <ImgPlaceholder style={{ minWidth: "56px" }} />
              )}
            </ImgBox>
            <div className={text_box}>
              <h4 title={person?.employee_name}> المعلم : {person?.employee_name}</h4>
              <p>{`أستاذ مادة : ${person.subject || "لا يوجد"}`}</p>
            </div>
          </section>
          <div>
          <h4> المواد : {person.subject}</h4>
          </div>
          <menu>
          <li>
            {person.employee_country === "Egypt" ? <EgyptFlag /> : <EmiratesFlag />}
            <span>دولة المُعلم : {person.employee_country || "لا يوجد"}</span>
          </li>
          <li>
            <LanguageIcon />
            <span>
             لغة المُعلم : 
               {person.employee_language
                ? person.employee_language === "ar"
                  ? " العربية"
                  : " الانجليزية"
                : "غير محددة"}
            </span>
          </li>
        </menu>
              </div>
          <div>
          <section className={personal_info}>
           <ImgBox size="56px">
              {person.image ? (
                <img
                src={person.image}
                alt="employee image"
                style={{ minWidth: "56px" }}
                />
              ) : (
                <ImgPlaceholder style={{ minWidth: "56px" }} />
              )}
            </ImgBox>
            <div className={text_box}>
              <h4 title={person?.name}> الطالب : {person?.name}</h4>
              <p>{` طالب بالصف : ${person.grade || "لا يوجد"}`}</p>
            </div>
          </section>
          <div>
          <h4 title={person?.student_goal}> هدف الطالب : {person.student_goal || "لا يوجد"}</h4>
          </div>
          <menu>
          <li>
            {person.country === "Egypt" ? <EgyptFlag /> : <EmiratesFlag />}
            <span>دولة الطالب : {person.country || "لا يوجد"}</span>
          </li>
          <li>
          <OnlineClassIcon style={{ minWidth: "24px" }} />
            <span>رصيد حصص الطالب : {person.number_of_lessons || "لا يوجد"}</span>
          </li>
        </menu>
              </div>

        </div>
      </Card>
    );
  }
  return (
    <Card>
      <Heading
        text={isTeacher ? "تفاصيل المعلم" : "تفاصيل الطالب"}
        style={{ fontSize: "2rem", margin: "0", fontWeight: "500" }}
      />
      <div className={cardContainer}>
        <div>
          <section className={personal_info}>
            <ImgBox size="56px">
              {person.image ? (
                <img
                  src={person.image}
                  alt="user image"
                  style={{ minWidth: "56px" }}
                />
              ) : (
                <ImgPlaceholder style={{ minWidth: "56px" }} />
              )}
            </ImgBox>

            <div className={text_box}>
              <h4 title={person?.name}>{person?.name}</h4>
              <p>
                {isTeacher
                  ? `أستاذ مادة : ${person.subject || "لا يوجد"}`
                  : `طالب بالصف ${person.grade ? person.grade : "لا يوجد"}`}
              </p>
            </div>
          </section>
          {isTeacher && (
            <section className={rate_box}>
              <span>التقييم</span>
              <Stars />
            </section>
          )}
          {isStudent && (
            <section className={goalsAndSubjects}>
              <div>
                <Heading
                  text="المواد :"
                  style={{ fontSize: "1.6rem", margin: "0" }}
                />
                {person.subject ? (
                  <span style={{ color: "#616161" }}>{person.subject}</span>
                ) : (
                  <span style={{ color: "#616161" }}>لا يوجد</span>
                )}
              </div>

              <div>
                <Heading
                  text="هدف الطالب :"
                  style={{ fontSize: "1.6rem", margin: "0" }}
                />
                {person.student_goal ? (
                  <span className={stu_goals} title={person.student_goal}>
                    {person.student_goal}
                  </span>
                ) : (
                  <span className={stu_goals}>لا يوجد</span>
                )}
              </div>
            </section>
          )}
        </div>
        <menu>
          {isTeacher && (
            <li>
              <GraduationIcon style={{ minWidth: "24px" }} />
              <span className={teacher_details} title={person.teacher_bio}>
                {person.teacher_bio || "لا يوجد"}
              </span>
            </li>
          )}
          {isStudent && (
            <li>
              <OnlineClassIcon style={{ minWidth: "24px" }} />
              <span>عدد الحصص: لا يوجد</span>
            </li>
          )}
          <li>
            <LanguageIcon />
            <span>
              اللغة :
              {person.language
                ? person.language === "ar"
                  ? "العربية"
                  : "الانجليزية"
                : "غير محددة"}
            </span>
          </li>
          <li>
            {person.country === "Egypt" ? <EgyptFlag /> : <EmiratesFlag />}
            <span>الدولة: {person.country || "لا يوجد"}</span>
          </li>
        </menu>
      </div>
    </Card>
  );
};

export default PersonalCard;
