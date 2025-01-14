import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {TUserRole} from "@/types/shared";
import {ReactNode, useEffect} from "react";
import {Navigate} from "react-router-dom";
import {logout} from "@/store/auth/authSlice.ts";
import {actGetUserProfile} from "@/store/profile/ProfileSlice.ts";

const ProtectedRoute = ({
                          allowedTypes,
                          children,
                        }: {
  allowedTypes: TUserRole[];
  children: ReactNode;
}) => {

  const dispatch = useAppDispatch();

  const {credintials, user} = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(actGetUserProfile()).unwrap().then((res) => {
      if (res?.user?.user_type !== credintials?.role) {
        dispatch(logout())
      }
    });
  }, [credintials?.role, dispatch, user?.user_type]);

  if (allowedTypes.includes(credintials?.role)) {
    return children;
  } else {
    return <Navigate to="/" replace/>;
  }
};

export default ProtectedRoute;
