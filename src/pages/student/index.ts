import {lazy} from "react";

const StudentHomePage = lazy(() => import("./HomePage"));

const Classes = lazy(() => import("./classes/Classes"));

const JoinLesson = lazy(() => import("./join/JoinLesson"))

export { StudentHomePage, Classes, JoinLesson }