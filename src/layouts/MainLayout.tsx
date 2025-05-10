import { Outlet } from "react-router-dom";
import { Header, MainSidebar } from "@/components";
import { TPath } from "@/types/shared";
import { CalendarProvider } from "@/store/context/";
import { useEffect } from "react";
import { loadUxCam } from "@/utils/loadUXCam";
const MainLayout = ({ sideBarData }: { sideBarData: TPath[] }) => {
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
  // const UXCAM_KEY = "uhzcv7ycmitvbo4";
  const UXCAM_KEY = "gqnevw23bexz0l1";

  useEffect(() => {
    loadUxCam(UXCAM_KEY);
  }, []);

  return (
    <main className="container mainContainer">
      <CalendarProvider>
        <MainSidebar data={sideBarData} />
        <div className="contentBox">
          <Header />
          <section className="content">
            <Outlet />
          </section>
        </div>
      </CalendarProvider>
    </main>
  );
};

export default MainLayout;
