import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { TModalRef } from "@/types/shared";
import CloseButton from "@/assets/close-button.svg?react";

import styles from "./addNewSubjectModal.module.css";

const { modal } = styles;

const BasicModal = forwardRef<TModalRef, { children: React.ReactNode }>(
  ({ children }, ref) => {
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
      <dialog ref={dialogRef} className={`${modal}`}>
        <button type="button" onClick={onCloseHandler}>
          <CloseButton />
        </button>
        {children}
      </dialog>,
      document.getElementById("modal")!
    );
  }
);

BasicModal.displayName = "BasicModal";

export default BasicModal;
