import { TModalRef } from "@/types/shared";
import React from "react";

const displayFeedbackModal = ({ ref }: { ref: React.RefObject<TModalRef> }) => {
  ref.current?.open();
  setTimeout(() => {
    console.log("in displayFeedbackModal", );
    
    ref.current?.close()}, 1500);
}

export default displayFeedbackModal