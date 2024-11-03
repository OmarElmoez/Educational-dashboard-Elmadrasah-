import { Suspense, ReactNode } from "react";
import LottieHandler from "@/components/lottie-handler/LottieHandler.tsx";


const PageSuspense = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={<LottieHandler type="loading" />}
    >
      {children}
    </Suspense>
  );
};

export default PageSuspense;
