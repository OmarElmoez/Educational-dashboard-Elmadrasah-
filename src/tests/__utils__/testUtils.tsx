import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import auth from "../../store/auth/authSlice";
import lessons from "../../store/lessons/LessonsSlice.ts";
import profile from "../../store/profile/ProfileSlice.ts";
import reviewQuestions from "../../store/review-questions/reviewSlice.ts";
import notifications from "../../store/notifications/NotificationsSlice.ts";
import location from "../../store/location/LocationSlice.ts";
import formSubjects from "../../store/form-subjects/FormSubjectsSlice.ts";
import table from "../../store/table/TableSlice.ts";

// Mock reducers
// const mockAuthReducer = (state = { user: null, loading: 'idle', error: null }) => state;
// const mockLessonsReducer = (state = {
//   Month_lessons: [],
//   Today_lessons: [],
//   attendance_link: "",
//   end_attendance_link: "",
//   count: 0,
//   next: null,
//   previous: null,
//   loading: "idle",
//   error: null,
//   subjects: {},
//   completion_percentage: 0,
//   students: [],
//   missed_stats: { missed_participants: 0, missed_teachers: 0 },
//   scheduled_stats: { scheduled_participants: 0, scheduled_teachers: 0 },
//   progressing_lessons: 0,
//   ended_lessons: 0,
// }) => state;
// const mockProfileReducer = (state = {  user: null,
//   statistics: [],
//   loading: "idle",
//   error: null,
//   img_url: ""}) => state;
//
// const mockReviewQuestionsReducer = (state = { records: [],
//   loading: "idle",
//   error: null, }) => state;
//
// const mockNotificationReducer = (state = {
//   records: [],
//   next: '',
//   previous: '',
//   loading: "idle",
//   error: null,
// }) => state
//
// const mockLocationReducer = (state = {
//   countries: [],
//   cities: [],
//   states: [],
//   chosenState: "",
//   chosenRegion: "",
//   loading: "idle",
//   error: null,
// }) => state;
//
// const mockFormSubjectReducer = (state = {
//   subjects: [],
//   loading: "idle",
//   error: null,
// }) => state;
//
// const mockTableReducer = (state = {
//   students: {
//     data: [],
//     next: null,
//     previous: null,
//   },
//   invoices: {
//     data: [],
//     page: 1,
//     next: null,
//     previous: null,
//   },
//   loading: "idle",
//   error: null,
// }) => state;

export const setupStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      auth,
      lessons,
      profile,
      reviewQuestions,
      notifications,
      location,
      formSubjects,
      table,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable for testing
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState).store,
    persistor = setupStore(preloadedState).persistor,
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }: {children: ReactNode}) => {
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {children}
      </PersistGate>
      </Provider>
  );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};