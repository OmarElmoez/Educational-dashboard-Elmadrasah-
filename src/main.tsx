import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import theme from "@/theme.ts";
import Routes from "./routes/Routes";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FeedbackProvider } from "./store/context";
import { ThemeProvider } from "@mui/material";
import "./global.css";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="381013725217-ud8vf0e6va9i9mjvko45popltcu43efn.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <FeedbackProvider>
            <ThemeProvider theme={theme}>
              <Routes/>
            </ThemeProvider>
          </FeedbackProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
