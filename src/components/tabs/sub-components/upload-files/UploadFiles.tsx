import AddIcon from "@/assets/add.svg?react";
import DeleteIcon from "@/assets/delete.svg?react";
import EditIcon from "@/assets/edit.svg?react";
import WatchIcon from "@/assets/watch.svg?react";
import styles from "./uploadFiles.module.css";
import { BasicModal } from "@/components";
import { useEffect, useRef, useState } from "react";
import { TModalRef } from "@/types/shared.ts";
import UploadEduFilesForm from "@/components/tabs/sub-components/upload-files/upload-form/UploadEduFilesForm.tsx";
import { actDeleteLessonFile, actGetLessonFiles } from "@/services/lessons.ts";
import { TLessonFile } from "@/schemas/LessonSchema.ts";
import { useAppSelector } from "@/store/hooks.ts";
import { useFeedback } from "@/store/context";
import formatFullArabicDate from "@/utils/formatFullArabicDate.ts";
import getFileIcon from "@/utils/getFileIcon.tsx";

const { action_box, files_container, file_action_box, file_dateInfo } = styles;

const UPLOADED_BY_CASES = {
  Admin: "الادمن",
  Family: "ولي الامر",
  Student: "الطالب",
  Teacher: "المعلم",
};

const UploadFiles = ({ classId }: { classId: string }) => {
  const uploadFileRef = useRef<TModalRef>(null);

  const { openFeedbackModal } = useFeedback();

  const [files, setFiles] = useState<TLessonFile[]>();

  const [editFile, setEditFile] = useState({
    isEdit: false,
    fileId: 0,
  });

  const { credintials } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (classId) {
      actGetLessonFiles(classId).then((res) => {
        setFiles(res);
      });
    }
  }, [classId]);

  const removeFileHandler = (classId: string, fileId: number) => {
    openFeedbackModal(
      "confirm",
      "هل تريد مسح الملف ؟",
      "هل أنت متأكد أنك تريد مسح الملف المرفوق يرجي العلم عند مسح الملف لا يمكن استرجاعه مرة أخري",
      10000,
      undefined,
      () => {
        actDeleteLessonFile(classId, fileId).then(() => {
          setFiles((prevFiles) =>
            prevFiles?.filter((prevFile) => prevFile.id !== fileId)
          );
          openFeedbackModal("succeeded", "تم الحذف بنجاح.", "", 500);
        });
      }
    );
  };

  const watchFileHandler = (url: string) => {
    window.open(url, "_blank");
  };

  const editFileHandler = (id: number) => {
    setEditFile({
      isEdit: true,
      fileId: id,
    });
    uploadFileRef.current?.open();
  };

  const afterUploadNewFile = (uploaded_files: TLessonFile[]) => {
    setFiles((prevFiles) => [...(uploaded_files || []), ...(prevFiles || [])]);
  };

  const afterEditFile = (file: TLessonFile) => {
    setFiles((prevFiles) =>
      prevFiles?.map((prevFile) => {
        if (prevFile.id === file.id) {
          return file;
        }
        return prevFile;
      })
    );
  };

  return (
    <>
      <BasicModal
        ref={uploadFileRef}
        headerText={editFile.isEdit ? "تعديل عنوان الملف" : "رفع ملف جديد"}
        headerTextStyle={{ fontWeight: "500", fontSize: "2rem" }}
        borderBottom={false}
      >
        {!editFile.isEdit && (
          <p className="modal_desc">
            قم بتحميل مواد الدراسة أو الملاحظات الخاصة بك هنا
          </p>
        )}
        <UploadEduFilesForm
          afterUploadNewFile={afterUploadNewFile}
          isEdit={editFile.isEdit}
          editFileId={editFile.fileId}
          onClose={() => uploadFileRef.current?.close()}
          afterEditFile={afterEditFile}
        />
      </BasicModal>

      <section>
        <div className={action_box}>
          <p className="tab_description">
            الوصول إلى مواد الدراسة والواجبات المنزلية وإدارتها لهذا الطالب
          </p>
          <button
            onClick={() => {
              setEditFile({
                isEdit: false,
                fileId: 0,
              });
              uploadFileRef.current?.open();
            }}
          >
            <AddIcon />
            <span>رفع ملف</span>
          </button>
        </div>

        <menu className={files_container}>
          {files &&
            files?.map((file) => {
              const FileIcon = getFileIcon(file.file);
              return (
                <li key={file.id}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.8rem",
                    }}
                  >
                    <p
                      style={{
                        minWidth: "1.6rem",
                        display: "flex",
                        gap: "0.8rem",
                        alignItems: "center",
                      }}
                    >
                      {FileIcon}{" "}
                      <span style={{ color: "#000" }}>{file.title}</span>
                      {file.is_exam && (
                        <span className="w-[56px] h-[15px] bg-[#D51919] text-white text-[0.8rem] rounded-[3px] flex justify-center items-center mr-[0.2rem]">
                          ملف اختبار
                        </span>
                      )}
                    </p>
                    <p style={{ display: "grid", gap: "0.4rem" }}>
                      <span className={file_dateInfo}>
                        {formatFullArabicDate(file.uploaded_at)}{" "}
                        {file.uploaded_by === credintials?.role
                          ? "بواسطتك"
                          : `بواسطة ${
                              UPLOADED_BY_CASES[
                                file.uploaded_by as keyof typeof UPLOADED_BY_CASES
                              ]
                            }`}
                      </span>
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.2rem",
                    }}
                  >
                    <button
                      className={file_action_box}
                      style={{ backgroundColor: "#DDEEE3" }}
                      onClick={() => watchFileHandler(file.file)}
                    >
                      <WatchIcon />
                      <span style={{ color: "#1C8A44" }}>مشاهدة</span>
                    </button>

                    {credintials?.role === file.uploaded_by && (
                      <>
                        <button
                          className={file_action_box}
                          style={{ backgroundColor: "#E8F0FA" }}
                          onClick={() => editFileHandler(file.id)}
                        >
                          <EditIcon />
                          <span style={{ color: "#0650A7" }}>تعديل</span>
                        </button>

                        <button
                          className={file_action_box}
                          style={{ backgroundColor: "#FFE2E5" }}
                          onClick={() =>
                            removeFileHandler(classId as string, file.id)
                          }
                        >
                          <DeleteIcon />
                          <span style={{ color: "#F64E60" }}>حذف</span>
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
        </menu>
      </section>
    </>
  );
};

export default UploadFiles;
