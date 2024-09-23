import { FeedbackAlert } from "@/components";
import React, { createContext, useContext, useRef, useState } from "react";

type FeedbackContextType = {
    openFeedbackModal: (
      status: "succeeded" | "failed" | "warning",
      title: string,
      desc?: string
    ) => void;
  };
  
const FeedbackContext = createContext<FeedbackContextType | undefined>(
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
  }>({
    status: "succeeded",
    title: "",
    desc: "",
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
        ref={feedbackAlertRef}
        status={feedbackData.status}
        title={feedbackData.title}
        desc={feedbackData.desc}
      />
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }

  return context;
};
