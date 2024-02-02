import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppShell from "./components/nav/AppShell";
import CreateQuestion from "./pages/CreateQuestion";
import EditQuestions from './pages/EditQuestions';
import Login from "./pages/Login";
import PracticeSession from "./pages/PracticeSession";
import Register from "./pages/Register";
import ReviewSession from "./pages/ReviewSession";
import Root from "./pages/Root";
// import reportWebVitals from "./reportWebVitals";
import "./index.css";
import CreateSession from "./pages/CreateSession";
import QuestionPreview from "./pages/QuestionPreview";
import UserManagement from "./pages/UserManagement";
import { AuthGuard } from "./services/AuthGuard";
import { AuthProvider } from "./services/AuthProvider";
import {
  ServiceProvider,
  ServiceProviderConsumer,
} from "./services/ServiceProvider";
import theme from "./theme";

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
                  <Route path="/" element={<AuthGuard><AppShell /></AuthGuard>}>
                    <Route index element={<Root />} />
                    <Route
                      path="create-session"
                      element={<CreateSession />}
                    />
                    <Route
                      path="practice-session"
                      element={<PracticeSession />}
                    />
                    <Route
                      path="review-session"
                      element={<ReviewSession />}
                    />
                    <Route
                      path="create-question"
                      element={<CreateQuestion />}
                    />
                    <Route
                      path="question-preview"
                      element={<QuestionPreview />}
                    />
                    <Route
                      path="edit-questions"
                      element={<EditQuestions />}
                    />
                    <Route
                      path="user-management"
                      element={<UserManagement />}
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