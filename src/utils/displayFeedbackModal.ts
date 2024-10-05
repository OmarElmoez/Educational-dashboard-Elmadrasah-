import { TModalRef } from "@/types/shared";
import React from "react";

const displayFeedbackModal = ({ ref }: { ref: React.RefObject<TModalRef> }) => {
  ref.current?.open();
  setTimeout(() => {
    
    ref.current?.close()}, 1500);
}

export default displayFeedbackModal