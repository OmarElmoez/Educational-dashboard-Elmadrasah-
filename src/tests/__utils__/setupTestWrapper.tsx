import auth from "@/store/auth/authSlice";
import lessons from "@/store/lessons/LessonsSlice.ts";
import profile from "@/store/profile/ProfileSlice.ts";
import reviewQuestions from "@/store/review-questions/reviewSlice.ts";
import notifications from "@/store/notifications/NotificationsSlice.ts";
import location from "@/store/location/LocationSlice.ts";
import formSubjects from "@/store/form-subjects/FormSubjectsSlice.ts";
import table from "@/store/table/TableSlice.ts";
import tabs from "@/store/tabs/TabsSlice.ts"
import families from "@/store/families/FamiliesSlice.ts"

import { RootState } from "@/store";
import { configureStore } from "@reduxjs/toolkit";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { render } from "@testing-library/react";
import {vi} from 'vitest'

export const setupTestWrapper = (
  ui: ReactElement,
  options: {
    customState?: Partial<RootState>;
    setupMocks?: boolean;
  } = {}
) => {
  const { customState = {}, setupMocks = true } = options;

  // Default persist state that was previously duplicated
  const defaultPersist = {
    _persist: {
      version: -1,
      rehydrated: true
    }
  };

  // Create initial state with all reducers
  const defaultState = {
    auth: {
      ...auth(undefined, { type: 'INIT' }),
      ...defaultPersist
    },
    lessons: {
      ...lessons(undefined, { type: 'INIT' }),
      ...defaultPersist
    },
    profile: {
      ...profile(undefined, { type: 'INIT' }),
      ...defaultPersist
    },
    reviewQuestions: {
      ...reviewQuestions(undefined, { type: 'INIT' }),
      ...defaultPersist
    },
    notifications: {
      ...notifications(undefined, { type: 'INIT' }),
      ...defaultPersist
    },
    location: {
      ...location(undefined, { type: 'INIT' }),
      ...defaultPersist
    },
    formSubjects: {
      ...formSubjects(undefined, { type: 'INIT' }),
      ...defaultPersist
    },
    table: {
      ...table(undefined, { type: 'INIT' }),
      ...defaultPersist
    },
    tabs: {
      ...tabs(undefined, { type: 'INIT' }),
      ...defaultPersist
    },
    families: {
      ...families(undefined, { type: 'INIT' }),
      ...defaultPersist
    }
  };

  // Merge default state with custom state
  const finalState = {
    ...defaultState,
    ...customState
  };

  // Configure store with merged state
  const store = configureStore({

    reducer: Object.keys(defaultState).reduce((acc, key) => ({
      ...acc,
      [key]: () => finalState[key as keyof typeof finalState]
    }), {}),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  // Setup mocks if requested
  if (setupMocks) {
    vi.mock('@/store/hooks', () => ({
      useAppSelector: (selector: (state: RootState) => unknown) => selector(finalState),
      useAppDispatch: () => vi.fn()
    }));
  }

  // Create wrapper component with all providers
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <GoogleOAuthProvider clientId="381013725217-ud8vf0e6va9i9mjvko45popltcu43efn.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  );

  return {
    component: render(ui, { wrapper: Wrapper }),
    store,
    state: finalState
  };
};