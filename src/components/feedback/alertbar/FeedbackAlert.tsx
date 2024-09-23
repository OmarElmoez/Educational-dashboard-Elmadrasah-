import SuccessFeedback from "@/assets/successFeedback.svg?react";
import FailedFeedback from "@/assets/failedFeedback.svg?react";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "../review-status/reviewFeedback.module.css";

const { reviewModal } = styles;

type TContentForStatus = {
  [key in "succeeded" | "failed" | "warning"]: {
    icon: React.ReactNode;
    title: string;
    desc?: string;
  };
};

const FeedbackAlert = forwardRef(
  (
    {
      status,
      title,
      desc,
      timeout = 3000,
    }: {
      status: "succeeded" | "failed" | "warning";
      title: string;
      desc?: string;
      timeout?: number;
    },
    ref
  ) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open() {
        dialog.current?.showModal();

        setTimeout(() => {
          dialog.current?.close();
        }, timeout);
      },
      close() {
        dialog.current?.close();
      },
    }));

    const contentForStatus: TContentForStatus = {
      succeeded: {
        icon: <SuccessFeedback />,
        title: title,
        desc: desc,
      },
      failed: {
        icon: <FailedFeedback />,
        title: title,
        desc: desc,
      },
      warning: {
        icon: <FailedFeedback />,
        title: title,
        desc: desc,
      },
    };

   
    return createPortal(
      <dialog ref={dialog} className={`modal ${reviewModal}`}>
        {contentForStatus[status].icon}
        <h3>{contentForStatus[status].title}</h3>
        {contentForStatus[status].desc && (
          <p className="error">{contentForStatus[status].desc}</p>
        )}
      </dialog>,
      document.getElementById("modal")! 
    );
  }
);

FeedbackAlert.displayName = "FeedbackAlert";

export default FeedbackAlert;
