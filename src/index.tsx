import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppShell from "./components/nav/AppShell";
import CreateQuestion from "./pages/CreateQuestion";
import EditQuestions from "./pages/EditQuestions";
import Login from "./pages/Login";
import PracticeSession from "./pages/PracticeSession";
import Register from "./pages/Register";
import ReviewSession from "./pages/ReviewSession";
import Root from "./pages/Root";
// import reportWebVitals from "./reportWebVitals";
import CreateSession from "./pages/CreateSession";
import { AuthProvider } from "./services/AuthProvider";
import { ProtectedRoute } from "./services/ProtectedRoute";
import theme from "./theme";
import {
  ServiceProvider,
  ServiceProviderConsumer,
} from "./services/ServiceProvider";

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ServiceProvider>
          <ServiceProviderConsumer>
            {(providers) => (
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<AppShell />}>
                    <Route index element={<Root />} />
                    <Route
                      path="create-session"
                      element={
                        <ProtectedRoute>
                          <CreateSession />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="practice-session"
                      element={
                        <ProtectedRoute>
                          <PracticeSession />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="review-session"
                      element={
                        <ProtectedRoute>
                          <ReviewSession />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="create-question"
                      element={
                        <ProtectedRoute>
                          <CreateQuestion />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="edit-questions"
                      element={
                        <ProtectedRoute>
                          <EditQuestions />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </AuthProvider>
            )}
          </ServiceProviderConsumer>
        </ServiceProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
