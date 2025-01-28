import {lazy} from "react";

const TeacherClassesPage = lazy(() => import('./classes/Classes.tsx'))
// const TeacherHomePage = lazy(() => import('./HomePage.tsx'))
// const TeacherReportsPage = lazy(() => import('./Reports'));
const TeacherStudentsPage = lazy(() => import('./Students'));


export { TeacherClassesPage, TeacherStudentsPage }