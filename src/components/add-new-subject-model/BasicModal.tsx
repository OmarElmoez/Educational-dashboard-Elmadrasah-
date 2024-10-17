import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { TModalRef } from "@/types/shared";
import CloseButton from "@/assets/close-modal-icon.svg?react";

import styles from "./addNewSubjectModal.module.css";

const { modal, headerModal } = styles;

const BasicModal = forwardRef<
  TModalRef,
  { children: React.ReactNode; header?: React.ReactNode }
>(({ children, header = null }, ref) => {
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
      {header && (
        <div className={headerModal}>
          {header}
          <button type="button" onClick={onCloseHandler}>
            <CloseButton />
          </button>
        </div>
      )}
      {/* {header ? (
        <div className={headerModal}>
          {header}
          <button type="button" onClick={onCloseHandler}>
            <CloseButton />
          </button>
        </div>
      ) : (
        <button type="button" onClick={onCloseHandler}>
          <CloseButton />
        </button>
      )} */}
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
});

BasicModal.displayName = "BasicModal";

export default BasicModal;
