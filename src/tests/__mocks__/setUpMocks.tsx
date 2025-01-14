// import {vi} from 'vitest'
// import {Provider} from 'react-redux'
// import {BrowserRouter} from 'react-router-dom'
//
// import {PersistGate} from "redux-persist/integration/react";
// import {createMockStore} from "@/tests/__utils__/testUtils.ts";
//
// import {JSX} from "react";
//
// // Mock the Firebase config
// vi.mock('../../../firebase-config', () => ({
//   app: null,
//   messaging: null,
// }))
//
// // Test wrapper component
// export const TestWrapper = ({children}: { children: JSX.Element }): JSX.Element => {
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