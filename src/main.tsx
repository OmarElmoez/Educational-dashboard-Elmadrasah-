import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import Routes from "./routes/Routes";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { FeedbackProvider } from "./store/context";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="381013725217-ud8vf0e6va9i9mjvko45popltcu43efn.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <FeedbackProvider>
        <Routes />
        </FeedbackProvider>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
