import { TModalRef } from "@/types/shared";
import React from "react";

const displayFeedbackModal = ({ ref }: { ref: React.RefObject<TModalRef> }) => {
  ref.current?.open();
  setTimeout(() => {
    
    ref.current?.close()}, 2645);
}

export default displayFeedbackModal