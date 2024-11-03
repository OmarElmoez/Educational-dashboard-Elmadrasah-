import {lazy} from "react";

import LoginLayout from "./login/LoginLayout";
const MainLayout = lazy(() => import("./MainLayout"));

export { LoginLayout, MainLayout };
