import {ReactNode, useEffect} from "react";
import {useAppSelector} from "@/store/hooks.ts";
import {useNavigate} from "react-router-dom";

const CheckAuth = ({children}: { children: ReactNode }) => {
  const {credintials} = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (credintials?.role) {
      navigate(`/${credintials?.role?.toLowerCase()}`);
    }
  }, [credintials?.role, navigate]);

  if (!credintials?.role) {
    return children;
  }
}

export default CheckAuth;