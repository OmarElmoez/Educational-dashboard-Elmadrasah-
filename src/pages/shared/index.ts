import {lazy} from "react";

const HelpPage = lazy(() => import("./Help"));
const SettingsPage = lazy(() => import('./settings/Settings'));
const CalendarPage = lazy(() => import('./Calendar'));
const Profile = lazy(() => import('./settings/pages/profile/Profile'));
const Security = lazy(() => import('./settings/pages/security/Security'));
const Roles = lazy(() => import('./settings/pages/roles/Roles'));
const NotificationsPage = lazy(() => import("./notifications/NotificationsPage"));
const Error = lazy(() => import('./Error.tsx'))

export { HelpPage, SettingsPage, CalendarPage, Profile, Security, Roles, NotificationsPage, Error };