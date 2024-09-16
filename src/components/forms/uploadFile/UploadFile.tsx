import UploadIcon from "@/assets/upload.svg?react";
import styles from "./uploadFile.module.css";
import { ChangeEvent, useRef, useState } from "react";
import { FieldValues, UseFormRegister, Path, Control } from "react-hook-form";
import PdfIcon from "@/assets/pdf.svg?react";
import WordIcon from "@/assets/word.svg?react";
import XCircle from "@/assets/x-circle.svg?react";

const { uploadContainer, hiddenInput, uploadBtn, previewContainer } = styles;

interface FilePreview {
  url: string;
  name: string;
  type: string;
}

type FileType = "images" | "pdfs" | "word";

const UploadFile = <T extends FieldValues>({
  register,
  name,
  setValue,
  control,
  fileTypes,
  maxFiles = 2,
  label,
  error,
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
  setValue: (name: Path<T>, value: File[]) => void;
  control: Control<T>;
  fileTypes: FileType[];
  maxFiles?: number;
  label: string;
  error?: string;
}) => {
  const [previewUrls, setPreviewUrls] = useState<FilePreview[]>([]); // Multiple previews
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const acceptedFiles = event.target.files;

    if (acceptedFiles && acceptedFiles.length > 0) {
      const filesArray = Array.from(acceptedFiles); // Convert FileList to array
      console.log(filesArray);
      const newPreviews = filesArray.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
      }));
      setPreviewUrls((prevPreviews) => [...prevPreviews, ...newPreviews]);
      setValue(name, [
        ...((control._getWatch(name) as File[]) || []),
        ...filesArray,
      ]);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the input value
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const renderPreview = (preview: FilePreview, index: number) => {
    if (preview.type === "application/pdf") {
      return (
        <div key={`preview-${index + 1}`} className="preview">
          <PdfIcon />
          <span>{preview.name}</span>
          <button
            type="button"
            style={{ display: "block" }}
            onClick={() => removeFileHandler(index)}
            className="closeIcon"
          >
            <XCircle />
          </button>
        </div>
      );
    } else if (preview.type.startsWith("image/")) {
      return (
        <div key={`preview-${index + 1}`} className="preview">
          <img
            src={preview.url}
            alt={`Preview ${index + 1}`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <button
            type="button"
            style={{ display: "block" }}
            onClick={() => removeFileHandler(index)}
            className="closeIcon"
          >
            <XCircle />
          </button>
        </div>
      );
    } else {
      return (
        <div key={`preview-${index + 1}`} className="preview">
          <WordIcon />
          <span>{preview.name}</span>
          <button
            type="button"
            style={{ display: "block" }}
            onClick={() => removeFileHandler(index)}
            className="closeIcon"
          >
            <XCircle />
          </button>
        </div>
      );
    }
  };
  const removeFileHandler = (index: number) => {
    const updatedPreviews = [...previewUrls];
    updatedPreviews.splice(index, 1);
    setPreviewUrls(updatedPreviews);
    const updatedFiles = [
      ...((control._getWatch(name) as File[]) || []),
    ].filter((file) => file.name !== [...previewUrls][index].name);
    setValue(name, updatedFiles);
  };

  const getAcceptString = (types: FileType[]): string => {
    const typeMap: Record<FileType, string> = {
      images: ".jpg,.jpeg,.png",
      pdfs: "application/pdf",
      word: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    return types.map((type) => typeMap[type]).join(",");
  };

  return (
    <article className="group">
      <label htmlFor={name} className="adminFormLabel">
        {label}
      </label>
      <section className={uploadContainer}>
        <input
          type="file"
          accept={getAcceptString(fileTypes)}
          multiple // Allow multiple files
          {...register(name)}
          onChange={handleFileChange}
          ref={fileInputRef}
          className={hiddenInput}
          disabled={previewUrls.length >= maxFiles}
        />
        {previewUrls.length > 0 && (
          <div className={previewContainer}>
            {/* Display all preview images */}
            {previewUrls.map((url, index) => renderPreview(url, index))}
          </div>
        )}
        <button
          onClick={handleButtonClick}
          type="button"
          disabled={previewUrls.length >= maxFiles}
          style={{
            cursor: previewUrls.length >= maxFiles ? "not-allowed" : "pointer",
          }}
          className={uploadBtn}
        >
          <UploadIcon />
          <span>قم بإسقاط الملفات هنا</span>
        </button>
      </section>
      <p className="error" style={{ position: "absolute", bottom: "0" }}>
        {error}
      </p>
    </article>
  );
};

export default UploadFile;
