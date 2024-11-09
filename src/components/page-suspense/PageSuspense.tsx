import { Suspense, ReactNode } from "react";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator.tsx";


const PageSuspense = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={<div className="loadingBox">
        <LoadingIndicator/>
      </div>}
    >
      {children}
    </Suspense>
  );
};

export default PageSuspense;
