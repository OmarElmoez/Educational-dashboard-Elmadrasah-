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
  cardFor: "student" | "teacher";
  person: TPersonInfo;
};

const PersonalCard = ({ cardFor, person }: TPersonalCardProps) => {
  console.log({person})
  const forTeacher = cardFor === "teacher";
  return (
    <Card>
      <Heading
        text={forTeacher ? "تفاصيل المعلم" : "تفاصيل الطالب"}
        style={{ fontSize: "2rem", margin: "0", fontWeight:"500" }}
      />
      <div className={cardContainer}>
        <div>
          <section className={personal_info}>
            <ImgBox size="56px">
              {person.image ? (
                <img src={person.image} alt="user image"  style={{minWidth:"56px"}} />
              ) : (
                <ImgPlaceholder style={{minWidth:"56px"}} />
              )}
            </ImgBox>

            <div className={text_box}>
              <h4 title={person?.name}>{person?.name}</h4>
              <p>
                {forTeacher
                  ? `أستاذ مادة ${person.subject}`
                  : `طالب بالصف ${person.grade?person.grade:"لا يوجد"}`}
              </p>
            </div>
          </section>

          {forTeacher && (
            <section className={rate_box}>
              <span>التقييم</span>
              <Stars />
            </section>
          )}

          {!forTeacher && (
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
          {forTeacher && (
            <li>
              <GraduationIcon style={{ minWidth: "24px" }} />
              <span className={teacher_details} title={person.teacher_bio}>{person.teacher_bio}</span>
            </li>
          )}

          {!forTeacher && (
            <li>
              <OnlineClassIcon style={{ minWidth: "24px" }} />
              <span>عدد الحصص:  لا يوجد</span>
            </li>
          )}

          <li>
            <LanguageIcon />
            <span>
              اللغة :{" "}
              {person.language
                ? person.language === "ar"
                  ? "العربية"
                  : "الانجليزية"
                : "غير محددة"}
            </span>
          </li>

          <li>
            {person.country === "Egypt" ? <EgyptFlag /> : <EmiratesFlag />}
            <span>الدولة: {person.country}</span>
          </li>
        </menu>
      </div>
    </Card>
  );
};

export default PersonalCard;
