import '@fontsource-variable/dm-sans';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./services/AuthProvider";
import {
  ServiceProvider,
  ServiceProviderConsumer,
} from "./services/ServiceProvider";
import theme from "./theme";
import router from './routes/router';
import { PostHogProvider } from 'posthog-js/react'

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
}

const App = () => {
  console.log("PostHog API Key:", process.env.REACT_APP_PUBLIC_POSTHOG_KEY);
  console.log("PostHog API Host:", process.env.REACT_APP_PUBLIC_POSTHOG_HOST);
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ServiceProvider>
          <ServiceProviderConsumer>
            {(providers) => (
              <AuthProvider>
                <RouterProvider router={router} />
              </AuthProvider>
            )}
          </ServiceProviderConsumer>
        </ServiceProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <PostHogProvider apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY || ""} options={options} >
    <App />
  </PostHogProvider>,
  document.getElementById("root")
);