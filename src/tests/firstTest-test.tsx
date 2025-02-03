// import { render, screen } from '@testing-library/react';
// // import { renderWithProviders } from './__utils__/testUtils.tsx'
// // import userEvent from '@testing-library/user-event';
// import { Login } from '@/pages/login';
// import { BrowserRouter, useNavigate } from 'react-router-dom';
// import { FeedbackProvider, useFeedback } from '@/store/context';
// import { afterEach, beforeEach, describe, test, vi, expect } from 'vitest';
// // import { actAuthLogin } from "@/store/auth/authSlice.ts";
// import { useFirebaseMessaging } from "@/hooks";
// // import { FeedbackProvider } from "@/store/context/FeedbackProvider.tsx";
// import { CalendarProvider } from "@/store/context/";
// import { Provider } from "react-redux";
// import store, { persistor } from "@/store";
// import { PersistGate } from "redux-persist/integration/react";
// import { ThemeProvider } from "@mui/material";
// import theme from "@/theme.ts";
// // import Routes from "@/routes/Routes.tsx";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { ReactNode } from "react";
// import { renderWithProviders } from "@/tests/__utils__/testUtils.tsx";
// import MainSidebar from "../components/main-sidebar/MainSidebar.tsx";
// // import theme from "@/theme.ts";
// // import { ThemeProvider } from "@mui/material";
// // import store from "@/store";
//
// // vi.mock('react-redux', () => ({
// //   useSelector: vi.fn(),
// //   useDispatch: vi.fn(),
// // }));
//
// // Mock dependencies
// // vi.mock('@/store/hooks');
// // vi.mock('react-router-dom');
// // vi.mock('@/store/context');
// // vi.mock('@react-oauth/google');
// // vi.mock('@/hooks/useFirebaseMessaging');
//
// // Your mocks
// vi.mock('@/store/auth/authSlice', () => ({
//   default: (state = {user: null, loading: 'idle', error: null}) => state,
//   actAuthLogin: vi.fn(),
//   actGoogleLogin: vi.fn(),
//   actSetPassword: vi.fn(),
//   logout: vi.fn(),
// }));
//
// vi.mock('@/store/lessons/LessonsSlice', () => ({
//   default: (state = {
//     Month_lessons: [],
//     Today_lessons: [],
//     attendance_link: "",
//     end_attendance_link: "",
//     count: 0,
//     next: null,
//     previous: null,
//     loading: "idle",
//     error: null,
//     subjects: {},
//     completion_percentage: 0,
//     students: [],
//     missed_stats: {missed_participants: 0, missed_teachers: 0},
//     scheduled_stats: {scheduled_participants: 0, scheduled_teachers: 0},
//     progressing_lessons: 0,
//     ended_lessons: 0,
//   }) => state,
// }));
//
// vi.mock('@/store/profile/ProfileSlice', () => ({
//   default: (state = {
//     Month_lessons: [],
//     Today_lessons: [],
//     attendance_link: "",
//     end_attendance_link: "",
//     count: 0,
//     next: null,
//     previous: null,
//     loading: "idle",
//     error: null,
//     subjects: {},
//     completion_percentage: 0,
//     students: [],
//     missed_stats: {missed_participants: 0, missed_teachers: 0},
//     scheduled_stats: {scheduled_participants: 0, scheduled_teachers: 0},
//     progressing_lessons: 0,
//     ended_lessons: 0,
//   }) => state,
// }));
//
// vi.mock('@/store/review-questions/reviewSlice', () => ({
//   default: (state = {
//     records: [],
//     loading: "idle",
//     error: null,
//   }) => state,
// }));
//
// vi.mock('@/store/notifications/NotificationsSlice', () => ({
//   default: (state = {
//     records: [],
//     next: '',
//     previous: '',
//     loading: "idle",
//     error: null,
//   }) => state,
// }));
//
// vi.mock('@/store/location/LocationSlice', () => ({
//   default: (state = {
//     countries: [],
//     cities: [],
//     states: [],
//     chosenState: "",
//     chosenRegion: "",
//     loading: "idle",
//     error: null,
//   }) => state,
// }));
//
// vi.mock('@/store/form-subjects/FormSubjectsSlice', () => ({
//   default: (state = {
//     subjects: [],
//     loading: "idle",
//     error: null,
//   }) => state,
// }));
//
// vi.mock('@/store/table/TableSlice', () => ({
//   default: (state = {
//     students: {
//       data: [],
//       next: null,
//       previous: null,
//     },
//     invoices: {
//       data: [],
//       page: 1,
//       next: null,
//       previous: null,
//     },
//     loading: "idle",
//     error: null,
//   }) => state,
// }));
//
// // Mock Firebase
// vi.mock('firebase/app', () => ({
//   initializeApp: vi.fn(() => ({})),
// }));
//
// vi.mock('firebase/messaging', () => ({
//   getMessaging: vi.fn(() => ({
//     onMessage: vi.fn(),
//     onBackgroundMessage: vi.fn(),
//   })),
// }));
//
//
// vi.mock('react-redux', () => ({
//   Provider: vi.fn(),
//   useSelector: vi.fn(),
//   useDispatch: vi.fn(),
// }));
//
// vi.mock('redux-persist', async () => {
//   const actual = await vi.importActual('redux-persist');
//   return {
//     ...actual,
//     persistReducer: vi.fn().mockImplementation((_, reducer) => reducer),
//     persistStore: vi.fn(),
//   };
// });
//
// // const mockNavigate = vi.fn();
// // const mockOpenFeedbackModal = vi.fn();
// // const mockFcmToken = 'mock-fcm-token';
//
// beforeEach(() => {
//
//   // Mock Router
//   // (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
//   //
//   // // Mock Feedback Modal
//   // (useFeedback as vi.Mock).mockReturnValue({openFeedbackModal: mockOpenFeedbackModal});
//   //
//   // // Mock Firebase Messaging
//   // (useFirebaseMessaging as vi.Mock).mockReturnValue({fcmToken: mockFcmToken});
//
//   // Mock GoogleLogin
//   // (GoogleLogin as vi.Mock).mockImplementation(({ onSuccess, onError }) => (
//   //   <button onClick={() => onSuccess({ credential: 'mock-google-credential' })}>
//   //     Google Login
//   //   </button>
//   // ));
// });
//
// afterEach(() => {
//   vi.clearAllMocks();
// });
//
// // const render = (component: ReactNode) => rtlRender(
// // <Provider store={store}>
// //     {component}
// //   </Provider>
// // )
//
//
// // vi.mock('./LoginImg', () => ({
// //   default: vi.fn(() => <div data-testid="login-img" />),
// // }));
// import Logo from "@/assets/logo.png";
// import LoginLayout from "../layouts/login/LoginLayout.tsx";
// describe('Login Component', () => {
//   test('renders login form and Google login button', () => {
//     // const preloadedState = {
//     //   auth: {
//     //     Loading: 'idle',
//     //     error: null,
//     //     user: null,
//     //     credintials: undefined,
//     //   },
//     // };
//     // renderWithProviders(<CalendarProvider>
//     //   <FeedbackProvider>
//     //     <ThemeProvider theme={theme}>
//     //       <LoginLayout/>
//     //     </ThemeProvider>
//     //   </FeedbackProvider>
//     // </CalendarProvider>);
//     // render(<CalendarProvider>
//     //       <FeedbackProvider>
//     //         <ThemeProvider theme={theme}>
//     //           <Login/>
//     //         </ThemeProvider>
//     //       </FeedbackProvider>
//     //     </CalendarProvider>);
//     // render(
//     //   <GoogleOAuthProvider clientId="381013725217-ud8vf0e6va9i9mjvko45popltcu43efn.apps.googleusercontent.com">
//     //     <Provider store={store}>
//     //       <PersistGate loading={null} persistor={persistor}>
//     //         <FeedbackProvider>
//     //           <ThemeProvider theme={theme}>
//     //             <Login/>
//     //           </ThemeProvider>
//     //         </FeedbackProvider>
//     //       </PersistGate>
//     //     </Provider>
//     //   </GoogleOAuthProvider>
//     // );
//     render(<LoginLayout/>);
//     screen.debug();
//
//     // expect(screen.getByPlaceholderText("البريد الالكتروني")).toBeInTheDocument();
//     // expect(screen.getByRole('AltText', {name: /email/i})).toBeInTheDocument();
//     // expect(screen.getByPlaceholderText(/كلمة المرور/i)).toBeInTheDocument();
//     // expect(screen.getByRole('button', { name: /تسجيل الدخول/i })).toBeInTheDocument();
//     // expect(screen.getByRole('button', { name: /google login/i })).toBeInTheDocument();
//   });
//
//   test('renders without crashing', () => {
//     render(<LoginLayout />);
//     expect(screen.getByTestId('outlet')).toBeInTheDocument();
//     // expect(screen.getByTestId('login-img')).toBeInTheDocument();
//   });
//
//   test('renders the correct layout structure', () => {
//     render(<LoginLayout />);
//
//     // Check if the main container is rendered
//     const mainContainer = screen.getByRole('main');
//     expect(mainContainer).toBeInTheDocument();
//     expect(mainContainer).toHaveClass('container');
//
//     // Check if the left and right sections are rendered
//     const leftBox = screen.getByTestId('left-box');
//     const rightBox = screen.getByTestId('right-box');
//     expect(leftBox).toBeInTheDocument();
//     expect(rightBox).toBeInTheDocument();
//
//     // Check if the LoginImg is inside the left box
//     // const loginImg = screen.getByTestId('login-img');
//     // expect(leftBox).toContainElement(loginImg);
//
//     // Check if the Outlet is inside the right box
//     const outlet = screen.getByTestId('outlet');
//     expect(rightBox).toContainElement(outlet);
//   });
//
//   // test('submits form and dispatches login action', async () => {
//   //   renderWithProviders(<Login />);
//   //
//   //   await userEvent.type(screen.getByPlaceholderText(/البريد الالكتروني/i), 'test@example.com');
//   //   await userEvent.type(screen.getByPlaceholderText(/كلمة المرور/i), 'password123');
//   //   await userEvent.click(screen.getByRole('button', { name: /تسجيل الدخول/i }));
//   //
//   //   expect(mockDispatch).toHaveBeenCalledWith(
//   //     actAuthLogin({ email: 'test@example.com', password: 'password123' })
//   //   );
//   // });
// });