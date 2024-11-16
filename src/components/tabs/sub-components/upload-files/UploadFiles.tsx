import UploadIcon from '@/assets/uploadFile.svg?react';
import AddIcon from '@/assets/add.svg?react';
import DeleteIcon from '@/assets/delete.svg?react'
import EditIcon from '@/assets/edit.svg?react';
import WatchIcon from '@/assets/watch.svg?react';
import styles from './uploadFiles.module.css'
import {BasicModal} from "@/components";
import {useEffect, useRef, useState} from "react";
import {TModalRef} from "@/types/shared.ts";
import UploadEduFilesForm from "@/components/tabs/sub-components/upload-files/upload-form/UploadEduFilesForm.tsx";
import {useParams} from "react-router-dom";
import {actDeleteLessonFile, actGetLessonFiles} from "@/services/lessons.ts";
import {TLessonFile} from "@/schemas/LessonSchema.ts";
import {useAppSelector} from "@/store/hooks.ts";
import {useFeedback} from "@/store/context";

const {action_box, modal_header, modal_desc, files_container, uploaded_by, file_action_box} = styles;

const UPLOADED_BY_CASES = {
  Admin: 'الادمن',
  Family: "ولي الامر",
  Student: "الطالب",
  Teacher: "المعلم"
}

const UploadFiles = () => {

  const uploadFileRef = useRef<TModalRef>(null);

  const {classId} = useParams();

  const {openFeedbackModal} = useFeedback();

  const [files, setFiles] = useState<TLessonFile[]>()

  const {credintials} = useAppSelector(state => state.auth);

  useEffect(() => {
      if (classId) {
        actGetLessonFiles(classId).then((res) => {
          setFiles(res);
        })
      }
    },
    [classId]);

  const removeFileHandler = (classId: string, fileId: number) => {
    openFeedbackModal('confirm',
      "هل تريد مسح الملف ؟",
      "هل أنت متأكد أنك تريد مسح الملف المرفوق يرجي العلم عند مسح الملف لا يمكن استرجاعه مرة أخري",
      10000,
      undefined,
      () => {
        actDeleteLessonFile(classId,
          fileId).then(() => {
            openFeedbackModal('succeeded', "تم الحذف بنجاح.", '', 500)
        });
      })
  }
  
  const afterUploadNewFile = (uploaded_files: TLessonFile[]) => {
    setFiles(prevFiles => [...(uploaded_files || []), ...(prevFiles || [])]);
  }

  return (
    <>
      <BasicModal ref={uploadFileRef} header={
        <h3 className={modal_header}>رفع ملف جديد</h3>
      } borderBottom={false}>
        <p className={modal_desc}>قم بتحميل مواد الدراسة أو الملاحظات الخاصة بك هنا</p>
        <UploadEduFilesForm afterUploadNewFile={afterUploadNewFile} />
      </BasicModal>

      <section>

        <div className={action_box}>
          <p className="tab_description">الوصول إلى مواد الدراسة والواجبات المنزلية وإدارتها لهذا الطالب</p>
          <button onClick={() => uploadFileRef?.current?.open()}>
            <AddIcon/>
            <span>رفع ملف</span>
          </button>

        </div>

        <menu className={files_container}>
          {files?.map(file => {
            return (
              <li key={file.id}>
                <div>
                  {file.title}
                </div>

                <div style={{display: "flex", alignItems: "center", gap: "1.2rem"}}>

                  <div className={`${uploaded_by} ${file_action_box}`}>
                    <UploadIcon/>
                    <span>{file.uploaded_by === credintials?.role ? 'بواسطتك' : `بواسطة ${UPLOADED_BY_CASES[file.uploaded_by as keyof typeof UPLOADED_BY_CASES]}}`}</span>
                  </div>

                  <button className={file_action_box} style={{backgroundColor: "#DDEEE3"}}>
                    <WatchIcon/>
                    <span style={{color: "#1C8A44"}}>مشاهدة</span>
                  </button>

                  <button className={file_action_box} style={{backgroundColor: "#E8F0FA"}}>
                    <EditIcon/>
                    <span style={{color: "#0650A7"}}>تعديل</span>
                  </button>

                  <button className={file_action_box} style={{backgroundColor: "#FFE2E5"}}
                          onClick={() => removeFileHandler(classId as string,
                            file.id)}>
                    <DeleteIcon/>
                    <span style={{color: "#F64E60"}}>حذف</span>
                  </button>

                </div>
              </li>
            )
          })}
        </menu>

      </section>
    </>
  )
}

export default UploadFiles;