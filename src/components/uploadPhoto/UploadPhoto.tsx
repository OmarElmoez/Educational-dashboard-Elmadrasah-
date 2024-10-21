import UserPhoto from "@/assets/profilePlaceholder.svg?react";
import PressedIcon from "@/assets/Pressed.svg?react";
import styles from "./uploadPhoto.module.css";
import { ChangeEvent, useRef, useState } from "react";
// import { updateUserImg } from "@/store/profile/ProfileSlice";
// import { useAppDispatch } from "@/store/hooks";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";
import { useAppSelector } from "@/store/hooks";

const { container, uploadBox, hiddenInput, previewBox } = styles;
const UploadPhoto = <T extends FieldValues>({
  register,
  name,
  setValue,
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
  setValue: (name: Path<T>, value: File) => void;
}) => {
  const { img_url } = useAppSelector((state) => state.profile);

  const [preview, setPreview] = useState<string | undefined>(img_url);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setValue(name, file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className={container}>
      <input
        type="file"
        accept="image/*"
        {...register(name)}
        onChange={handleFileChange}
        ref={fileInputRef}
        className={hiddenInput}
      />
      <div className={uploadBox}>
        <div className={previewBox}>
          {preview ? (
            <img src={preview as string} alt="Preview" />
          ) : (
            <UserPhoto />
          )}
        </div>
        <button onClick={handleButtonClick} type="button">
          <PressedIcon />
        </button>
      </div>
      <span>صورة الملف الشخصي</span>
    </section>
  );
};

export default UploadPhoto;
