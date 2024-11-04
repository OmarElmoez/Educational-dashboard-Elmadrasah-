import {Outlet} from "react-router-dom";
import { Header, MainSidebar } from "@/components";
import { TPath } from "@/types/shared";
import { SidebarContextProvider, FeedbackProvider } from "@/store/context/";
import { useEffect } from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {actGetUserProfile} from "@/store/profile/ProfileSlice.ts";
const MainLayout = ({ sideBarData }: { sideBarData: TPath[] }) => {

  const { user } = useAppSelector((state) => state.profile);
  const { loading } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch();
  
  useEffect(() => {

  if (user === null && loading === 'succeeded') {
    dispatch(actGetUserProfile())
  }
    
  }, [dispatch, loading, user]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Service worker is supported
      navigator.serviceWorker
        .register("firebase-messaging-sw.js")
        .then(() => {
          // Service worker registration successful
          console.log(" Service worker registration successful");
        })
        .catch((error) => {
          // Service worker registration failed
          console.error("Service worker registration failed:", error);
        });
    } else {
      // Service worker is not supported
      console.log("Service worker is not supported in this browser.");
    }
  }, []);

  return (
    <SidebarContextProvider>
      <FeedbackProvider>
        <main className="container mainContainer">
          <MainSidebar data={sideBarData} />
          <div className="contentBox">
            <Header />
            <section className="content">
              <Outlet />
            </section>
          </div>
        </main>
      </FeedbackProvider>
    </SidebarContextProvider>
  );
};

export default MainLayout;
