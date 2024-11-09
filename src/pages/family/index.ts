import {lazy} from "react";

const FamilyHomePage = lazy(() => import('./HomePage'))
const FamilyNotesPage = lazy(() => import('./Notes'))
const Classes = lazy(() => import('./classes/Classes.tsx'))

export { FamilyHomePage, FamilyNotesPage, Classes }