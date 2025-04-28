import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { useNavigate } from "react-router-dom";
import actGetLessonsByMonth from "@/store/lessons/act/actGetLessonsByMonth.ts";

const CheckAuth = ({children}: { children: ReactNode }) => {
  const {credintials} = useAppSelector(state => state.auth);
  const {Month_lessons} = useAppSelector(state => state.lessons);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const activatedPath = localStorage.getItem('activatedPath');
    if (credintials?.role) {
      activatedPath === `/${credintials?.role?.toLowerCase()}` ? navigate(
        `/${credintials?.role?.toLowerCase()}`) : navigate(`/${credintials?.role?.toLowerCase()}/${activatedPath}`)

      if (credintials?.role !== 'Admin' && Month_lessons.length !== 0) {
        dispatch(actGetLessonsByMonth({date: `${new Date().getMonth() + 1}-${new Date().getFullYear()}`}))
      }
    }
  }, [Month_lessons.length, credintials?.role, dispatch, navigate]);

  if (!credintials?.role) {
    return children;
  }
}

export default CheckAuth;