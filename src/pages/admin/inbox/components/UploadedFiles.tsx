import { ImgBox } from "@/components/UI";
import ImgPlaceholder from "@/assets/person-placeholder.svg?react";
import { ReactNode } from "react";
import { TFileData } from "@/services/inbox";
import formatFullArabicDate from "@/utils/formatFullArabicDate.ts";
import getFileIcon from "@/utils/getFileIcon";
import { useNavigate } from "react-router-dom";

type TInboxWrapperProps = {
  children?: ReactNode;
  uploadedFileData: TFileData;
};

const UploadedFiles = ({ children, uploadedFileData }: TInboxWrapperProps) => {

  const navigate = useNavigate();

  return (
    <article className="pb-[1.6rem] border-b-1 border-[#E4E4E4] border-dashed flex justify-between items-center">
      <section className="flex items-center gap-[1.4rem]">
        <ImgBox size="63px">
          {uploadedFileData?.teacher_image ? (
            uploadedFileData.teacher_image ? (
              <img
                src={uploadedFileData.teacher_image}
                alt="employee image"
                style={{ minWidth: "56px" }}
              />
            ) : (
              <ImgPlaceholder style={{ minWidth: "56px" }} />
            )
          ) : uploadedFileData?.student_image ? (
            uploadedFileData.student_image ? (
              <img
                src={uploadedFileData.student_image}
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
        <div className="grid gap-[1.4rem]" onClick={() => navigate(`/admin/calendar/join-class/${uploadedFileData.lesson}`)} style={{ cursor: "pointer"}}>
          <div className="flex gap-[0.8rem] items-center">
            <h2 className="text-black text-[1.5rem]">
              {uploadedFileData?.uploaded_by === "Teacher"
                ? `قام المعلم ${uploadedFileData?.teacher_name} برفع الملفات  ${uploadedFileData?.subject_name === null? "" : `الخاصة بمادة ${uploadedFileData?.subject_name}`} للطالب ${uploadedFileData?.student_name}`
                : `قام الطالب ${uploadedFileData?.student_name} برفع الملفات  ${uploadedFileData?.subject_name === null? "" : `الخاصة بمادة ${uploadedFileData?.subject_name}`} للمعلم ${uploadedFileData?.teacher_name}`}
            </h2>
            {uploadedFileData?.is_exam ? (
              <span className="w-[7rem] h-[1.8rem] flex items-center justify-center bg-[#C92516] text-white text-[0.8rem] rounded-sm">
                إختبار
              </span>
            ) : (
              <span className="w-[7rem] h-[1.8rem] flex items-center justify-center bg-[#1C8A44] text-white text-[0.8rem] rounded-sm">
                ملفات
              </span>
            )}
          </div>
          <div className="flex items-center gap-[0.8rem]">
            {getFileIcon(uploadedFileData?.file)}
            <p className="text-[#969292] text-[1.4rem]">
              {uploadedFileData?.title}
            </p>
          </div>
          <p className="text-[#969292] text-[1.4rem]">
            {formatFullArabicDate(uploadedFileData?.uploaded_at)}
          </p>
        </div>
      </section>
      {children && (
        <section className="flex  gap-[1.6rem] items-center">
          {children}
        </section>
      )}
    </article>
  );
};

export default UploadedFiles;
