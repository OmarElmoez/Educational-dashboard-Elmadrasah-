import { FeedbackAlert } from "@/components";
import React, { createContext, useRef, useState } from "react";

type FeedbackContextType = {
  openFeedbackModal: (
    status: "succeeded" | "failed" | "warning",
    title: string,
    desc?: string,
    timeout?: number
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
    status: "succeeded" | "failed" | "warning";
    title: string;
    desc: string;
    timeout?: number;
  }>({
    status: "succeeded",
    title: "",
    desc: "",
    timeout: 0,
  });

  const openFeedbackModal = (
    status: "succeeded" | "failed" | "warning",
    title: string,
    desc?: string
  ) => {
    setFeedbackData({ status, title, desc: desc || "" });
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
      />
    </FeedbackContext.Provider>
  );
};
