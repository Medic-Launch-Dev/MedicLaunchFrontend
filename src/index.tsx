import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppShell from "./components/nav/AppShell";
import CreateQuestion from "./pages/CreateQuestion";
import Login from "./pages/Login";
import PracticeSession from "./pages/PracticeSession";
import Register from "./pages/Register";
import ReviewSession from "./pages/ReviewSession";
import Root from "./pages/Root";
import EditQuestions from './pages/EditQuestions';
// import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import { AuthProvider } from "./services/AuthProvider";
import { ProtectedRoute } from "./services/ProtectedRoute";

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AppShell />}>
              <Route index element={<Root />} />
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
