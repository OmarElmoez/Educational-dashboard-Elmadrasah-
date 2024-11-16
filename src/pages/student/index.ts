import {lazy} from "react";

const StudentHomePage = lazy(() => import("./HomePage"));

const Classes = lazy(() => import("./classes/Classes"));

export { StudentHomePage, Classes }