import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import SuccessFeedback from "@/assets/successFeedback.svg?react";
import FailedFeedback from "@/assets/failedFeedback.svg?react";
import WarningFeedback from "@/assets/warningFeedback.svg?react";

import styles from "../review-status/reviewFeedback.module.css";

const {reviewModal, btn_container, caption} = styles;

type TContentForStatus = {
  [key in "succeeded" | "failed" | "warning" | "confirm"]: {
    icon: ReactNode;
    title: string;
    desc?: string | ReactNode;
  };
};

const FeedbackAlert = forwardRef(
  (
    {
      status,
      title,
      desc,
      timeout = 3000,
      onComplete,
      onConfirm,
      onCancel,
    }: {
      status: "succeeded" | "failed" | "warning" | "confirm";
      title: string;
      desc?: string | ReactNode;
      timeout?: number;
      onComplete?: () => void | null;
      onConfirm?: () => void;
      onCancel?: () => void;
    },
    ref
  ) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref,
      () => ({
        open() {
          dialog.current?.showModal();

          if (status === 'confirm') return;
          setTimeout(() => {
              dialog.current?.close();
              handleComplete();
            },
            timeout);
        },


        close() {
          dialog.current?.close();
        },
      }));

    const contentForStatus: TContentForStatus = {
      succeeded: {
        icon: <SuccessFeedback/>,
        title: title,
        desc: desc,
      },
      failed: {
        icon: <FailedFeedback/>,
        title: title,
        desc: desc,
      },
      warning: {
        icon: <WarningFeedback/>,
        title: title,
        desc: desc,
      },
      confirm: {
        icon: <WarningFeedback/>,
        title: title,
        desc: desc,
      },
    };

    const handleConfirm = () => {
      onConfirm?.();
      dialog.current?.close();

    };

    const handleComplete = () => {
      onComplete?.();
      dialog.current?.close();

    };

    const handleCancel = () => {
      onCancel?.();
      dialog.current?.close();
    };

    if (status === "confirm") {
      return createPortal(
        <dialog ref={dialog} className={`modal ${reviewModal}`}>
          {contentForStatus[status].icon}
          <h3>{contentForStatus[status].title} </h3>
          {contentForStatus[status].desc && (
            <p className={caption}>{contentForStatus[status].desc}</p>
          )}
          <div className={btn_container}>
            <button onClick={handleConfirm} className="btn error-btn">
              نعم , مسح
            </button>
            <button onClick={handleCancel} className="btn confirm-btn">
              إلغاء
            </button>
          </div>
        </dialog>,
        document.getElementById("modal")!
      );
    } else {
      return createPortal(
        <dialog ref={dialog} className={`modal ${reviewModal}`}>
          {contentForStatus[status].icon}
          <h3>{contentForStatus[status].title}</h3>
          {contentForStatus[status].desc && (

            typeof contentForStatus[status].desc === "object" ? contentForStatus[status].desc :
              <p className="error">{contentForStatus[status].desc}</p>

          )}
        </dialog>,
        document.getElementById("modal")!
      );
    }
  }
);

FeedbackAlert.displayName = "FeedbackAlert";

export default FeedbackAlert;
