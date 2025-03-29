import {ChangeEvent, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import UploadIcon from '@/assets/upload.svg?react'
import PdfIcon from "@/assets/pdf.svg?react";
import WordIcon from "@/assets/word.svg?react";
import styles from './uploadEduFilesForm.module.css'
import PreviewBox from "@/components/tabs/sub-components/upload-files/preview-box/PreviewBox.tsx";
import {useAppDispatch} from "@/store/hooks.ts";
import actSendEduUploadedFiles from "@/store/single-actions/actSendEduUploadedFiles.ts";
import {useParams} from "react-router-dom";
import {useFeedback} from "@/store/context";
import {LoadingIndicator} from "@/components";
import {TLessonFile} from "@/schemas/LessonSchema.ts";
import {actEditLessonFileName} from "@/services/lessons.ts";

const {title_box, upload_box, upload_box_holds_files, submit_btn, preview_wrapper, preview_icon, preview_img} = styles;

type TFilePreview = {
  url: string,
  name: string,
  type: string,
}

export type TSubmittedData = {
  title: string,
  files: File[],
}

type TUploadedEduFilesFormProps = {
  afterUploadNewFile: (val: TLessonFile[]) => void,
  isEdit: boolean,
  editFileId: number,
  onClose: () => void,
  afterEditFile: (file: TLessonFile) => void
}

const UploadEduFilesForm = ({
                              afterUploadNewFile,
                              isEdit,
                              editFileId,
                              onClose,
                              afterEditFile
                            }: TUploadedEduFilesFormProps) => {

  const {classId} = useParams();

  const {openFeedbackModal} = useFeedback();

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const [previewFiles, setPreviewFiles] = useState<TFilePreview[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {register, handleSubmit, setValue, control, reset} = useForm<TSubmittedData>();

  const removeFileHandler = (index: number) => {
    const updatedPreviews = [...previewFiles];
    updatedPreviews.splice(index,
      1);
    setPreviewFiles(updatedPreviews);
    const updatedFiles = [
      ...((control._getWatch('files') as File[]) || []),
    ].filter((file) => file.name !== [...previewFiles][index].name);
    setValue('files',
      updatedFiles);
  };

  const renderPreview = () => {
    return (
      <>
        {previewFiles.map((file, index) => {

          if (file.type.startsWith("image/")) {
            return (
              <PreviewBox key={file.url} removeFileHandler={removeFileHandler} index={index}>
                <section className={preview_wrapper}>
                  <div className={preview_img}>
                    <img src={file.url} alt={file.name}/>
                  </div>
                  <span>{file.name}</span>
                </section>
              </PreviewBox>
            )
          }

          switch (file.type) {
            case "application/pdf":
              return (
                <PreviewBox key={file.url} removeFileHandler={removeFileHandler} index={index}>
                  <section className={preview_wrapper}>
                    <PdfIcon className={preview_icon}/>
                    <span>{file.name}</span>
                  </section>
                </PreviewBox>
              )

            default:
              return (
                <PreviewBox key={file.url} removeFileHandler={removeFileHandler} index={index}>
                  <section className={preview_wrapper}>
                    <WordIcon className={preview_icon}/>
                    <span>{file.name}</span>
                  </section>
                </PreviewBox>
              )
          }
        })}
      </>
    )
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setValue('files',
        [...((control._getWatch('files') as File[]) || []), ...files]);

      const newPreviews = files.map(file => ({
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
      }))

      setPreviewFiles(prev => [...prev, ...newPreviews]);
    }
  }

  const onSubmit = (data: TSubmittedData) => {

    if (isEdit && classId) {
      setLoading(true)
      actEditLessonFileName(classId, editFileId, data.title).then((res) => {
        openFeedbackModal('succeeded', 'تم التعديل بنجاح');
        reset();
        onClose();
        afterEditFile(res)
        setLoading(false)
      })
      return;
    }

    if (classId) {
      setLoading(true)
      dispatch(actSendEduUploadedFiles({classId, data})).unwrap().then((res) => {
        if (res.message === "Files uploaded successfully") {
          setLoading(false);
          openFeedbackModal("succeeded", "تم إضافة الملفات بنجاح");
          reset();
          setPreviewFiles([]);
          afterUploadNewFile(res.uploaded_files)
        } else {
          setLoading(false);
          openFeedbackModal("failed", "حدثت مشكلة اثناء اضافة الملفات .. الرجاء المحاولة ثانية");
        }
      })
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <input type="file" multiple style={{display: 'none'}} {...register('files')} ref={fileInputRef}
             onChange={(e) => handleFileChange(e)}/>

      <div className={title_box}>
        <span>عنوان</span>
        <input type="text" {...register("title")} className="inputField" disabled={loading}/>
      </div>

      {loading ?
        <div style={{display: "flex", alignItems: 'center', justifyContent: "center"}}><LoadingIndicator/></div> :
        isEdit ? "" :
          <div className={ previewFiles.length > 0 ? upload_box_holds_files : upload_box} onClick={() => fileInputRef.current?.click()}>
            {previewFiles.length === 0 ?
              <>
                <UploadIcon/>

                <h5>قم بتحميل <span>الملف</span></h5>

                <p>قم بتحميل ملف PDF أو صورة مربعة بصيغة .jpg أو .png.</p>
              </> : renderPreview()
            }
          </div>}

      <button className={submit_btn} disabled={loading}>
        {isEdit ? "تعديل" : "رفع الملف"}
      </button>
    </form>
  )
}

export default UploadEduFilesForm;