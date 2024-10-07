import { FeedbackAlert } from "@/components";
import React, { createContext, useRef, useState } from "react";

type FeedbackContextType = {
  openFeedbackModal: (
    status: "succeeded" | "failed" | "warning" | "confirm",
    title: string,
    desc?: string,
    timeout?: number,
    onComplete?: () => void,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => void;
};

export const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export const FeedbackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const feedbackAlertRef = useRef<any>(null);

  const [feedbackData, setFeedbackData] = useState<{
    status: "succeeded" | "failed" | "warning" | "confirm";
    title: string;
    desc: string;
    timeout?: number;
    onComplete?: () => void ;
    onConfirm?: () => void;
    onCancel?: () => void;
  }>({
    status: "succeeded",
    title: "",
    desc: "",
    timeout: 3000,
  });

  const openFeedbackModal = (
    status: "succeeded" | "failed" | "warning" | "confirm",
    title: string,
    desc?: string,
    timeout?: number,
    onComplete?: () => void ,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => {
    setFeedbackData({
      status,
      title,
      desc: desc || "",
      timeout: timeout || 3000,
      onComplete,
      onConfirm,
      onCancel,
    });
    feedbackAlertRef.current?.open();
  };

  return (
    <FeedbackContext.Provider value={{ openFeedbackModal }}>
      {children}

      <FeedbackAlert
        status={feedbackData.status}
        title={feedbackData.title}
        desc={feedbackData.desc}
        timeout={feedbackData.timeout}
        ref={feedbackAlertRef}
        onComplete={feedbackData.onComplete}
        onConfirm={feedbackData.onConfirm}
        onCancel={feedbackData.onCancel}
      />
    </FeedbackContext.Provider>
  );
};
