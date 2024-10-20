import { useAppSelector } from "@/store/hooks";
import { TUserRole } from "@/types/shared";
import React from "react";
import { Navigate} from "react-router-dom";

const ProtectedRoute = ({
  allowedTypes,
  children,
}: {
  allowedTypes: TUserRole[];
  children: React.ReactNode;
}) => {

  const { credintials } = useAppSelector((state) => state.auth);

  if (allowedTypes.includes(credintials?.role)) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
