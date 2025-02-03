// import {  it, expect, vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import {Login} from "@/pages/login";
// import {JSX} from "react";
// import {createMockStore} from "@/tests/__utils__/testUtils.ts";
// import {Provider} from "react-redux";
// import {PersistGate} from "redux-persist/integration/react";
// import {BrowserRouter} from "react-router-dom";
//
// const TestWrapper = ({children}: { children: JSX.Element }): JSX.Element => {
//
//   const {store, persistor} = createMockStore()
//
//   console.log('from test wrapper: ', children);
//
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <BrowserRouter>
//           {children}
//         </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   );
// };
//
// it('renders login form', async () => {
//   render(<TestWrapper><Login /></TestWrapper>);
//
//   screen.debug()
//
//   // expect(screen.findByText('البريد الالكتروني', { selector: 'span' })).toBeInTheDocument();
//   // expect(screen.getByText(/تسجيل الدخول/i)).toBeInTheDocument();
//   // expect(screen.findByRole('button', { name: /تسجيل الدخول/i })).toBeInTheDocument();
// });
