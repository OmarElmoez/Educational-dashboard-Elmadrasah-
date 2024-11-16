import {ReactNode} from "react";
import XCircle from "@/assets/x-circle.svg?react";

import styles from './previewBox.module.css'

const {preview_box} = styles;

type TPreviewBoxProps = {
  children: ReactNode;
  removeFileHandler: (val: number) => void;
  index: number;
}

const PreviewBox = ({children, removeFileHandler, index}: TPreviewBoxProps) => {
  return (
    <article className={preview_box}>
      {children}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          removeFileHandler(index)
        }}
      >
        <XCircle/>
      </button>
    </article>
  )
}

export default PreviewBox;