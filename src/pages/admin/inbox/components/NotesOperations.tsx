import { ImgBox } from "@/components/UI";
import ImgPlaceholder from "@/assets/person-placeholder.svg?react";
import { TNoteData } from "@/services/inbox";
import formatFullArabicDate from "@/utils/formatFullArabicDate.ts";
import { useNavigate } from "react-router-dom";

type TNotesOperationsProps = {
  noteData: TNoteData;
};

const NotesOperations = ({ noteData }: TNotesOperationsProps) => {
  const navigate = useNavigate();

  return (
    <article className="pb-[1.6rem] border-b-1 border-[#E4E4E4] border-dashed flex justify-between items-center">
      <section className="flex items-center gap-[1.4rem]">
        <ImgBox size="63px">
          {noteData?.teacher_image ? (
            noteData.teacher_image ? (
              <img
                src={noteData.teacher_image}
                alt="employee image"
                style={{ minWidth: "56px" }}
              />
            ) : (
              <ImgPlaceholder style={{ minWidth: "56px" }} />
            )
          ) : noteData?.student_image ? (
            noteData.student_image ? (
              <img
                src={noteData.student_image}
                alt="employee image"
                style={{ minWidth: "56px" }}
              />
            ) : (
              <ImgPlaceholder style={{ minWidth: "56px" }} />
            )
          ) : (
            <ImgPlaceholder style={{ minWidth: "56px" }} />
          )}
        </ImgBox>
        <div
          className="grid gap-[1.4rem]"
          onClick={() =>
            navigate(`/admin/calendar/join-class/${noteData.lesson}`)
          }
          style={{ cursor: "pointer" }}
        >
          <div className="flex gap-[0.8rem] items-center">
            <h2 className="text-black text-[1.5rem]">
              {noteData?.status === "Admin" ? (
                <>
                  {noteData?.sent_by === "Teacher"
                    ? `قام المعلم ${noteData?.teacher_name} بإرسال ملاحظة إلى الإدارة خاصة بالطالب ${noteData?.student_name}`
                    : `قامت عائلة ${noteData?.student_name} بإرسال ملاحظة إلى الإدارة خاصة بالمعلم ${noteData?.teacher_name}`}
                </>
              ) : (
                <>
                  {noteData?.sent_by === "Teacher"
                    ? `قام المعلم ${noteData?.teacher_name} بإرسال شكوى إلى الإدارة خاصة بالطالب ${noteData?.student_name}`
                    : `قامت عائلة ${noteData?.student_name} بإرسال شكوى إلى الإدارة خاصة بالمعلم ${noteData?.teacher_name}`}
                </>
              )}
            </h2>
            {noteData?.status === "Admin" ? (
              <span className="w-[7rem] h-[2.2rem] flex items-center justify-center bg-[#1C8A44] text-white text-[0.8rem] rounded-sm">
                ملاحظة
              </span>
            ) : (
              <span className="w-[7rem] h-[2.2rem] flex items-center justify-center bg-[#C92516] text-white text-[0.8rem] rounded-sm">
                إبلاغ عن مشكلة
              </span>
            )}
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <p className="text-[#969292] text-[1.4rem]">
              {noteData?.description}
            </p>
          </div>
          <p className="text-[#969292] text-[1.4rem]">
            {formatFullArabicDate(noteData?.created_at)}
          </p>
        </div>
      </section>
    </article>
  );
};

export default NotesOperations;
