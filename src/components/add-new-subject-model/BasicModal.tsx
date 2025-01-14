import {CSSProperties, forwardRef, ReactNode, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";
import {TModalRef} from "@/types/shared";
import CloseButton from "@/assets/close-modal-icon.svg?react";

import styles from "./addNewSubjectModal.module.css";

const {modal, headerModal, text_box} = styles;

const BasicModal = forwardRef<
  TModalRef,
  { children: ReactNode; borderBottom?: boolean; headerIcon?: ReactNode; headerText: string; headerTextStyle?: CSSProperties }
>(({children, borderBottom = true, headerText, headerIcon, headerTextStyle}, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current?.showModal();
    },
    close() {
      dialogRef.current?.close();
    },
  }));

  const onCloseHandler = () => {
    dialogRef.current?.close();
  };

  return createPortal(
    <dialog ref={dialogRef} className={modal}>
      <header className={headerModal} style={{borderBottom: borderBottom ? "1px dashed #E4E4E4" : 'none'}}>
        <div className={text_box}>
          {headerIcon}
          <span style={headerTextStyle}>{headerText}</span>
        </div>
        <button type="button" onClick={onCloseHandler}>
          <CloseButton/>
        </button>
      </header>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
});

BasicModal.displayName = "BasicModal";

export default BasicModal;
