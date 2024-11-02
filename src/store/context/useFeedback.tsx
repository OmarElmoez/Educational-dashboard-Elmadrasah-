import { useContext } from "react";
import { FeedbackContext } from "./FeedbackProvider";
import {useLocation} from "react-router-dom";

export const useFeedback = () => {
  const loc = useLocation();
  const context = useContext(FeedbackContext);

  if (!context) {
    console.log('location', loc.pathname)
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }

  return context;
};
