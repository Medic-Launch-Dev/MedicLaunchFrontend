import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import AuthorPortal from "./pages/AuthorPortal";
import CreateSession from "./pages/CreateSession";
import EditQuestion from "./pages/EditQuestion";
import MyProfile from "./pages/MyProfile";
import QuestionPreview from "./pages/QuestionPreview";
import Subscribe from "./pages/Subscribe";
import UserManagement from "./pages/UserManagement";
import { AuthGuard } from "./services/AuthGuard";
import { AuthProvider } from "./services/AuthProvider";
import {
  ServiceProvider,
  ServiceProviderConsumer,
} from "./services/ServiceProvider";
import theme from "./theme";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthGuard><AppShell /></AuthGuard>,
      children: [
        {
          index: true,
          element: <Root />,
        },
        {
          path: "create-session",
          element: <CreateSession />
        },
        {
          path: "practice-session",
          element: <PracticeSession />
        },
        {
          path: "review-session",
          element: <ReviewSession />
        },
        {
          path: "create-question",
          element: <CreateQuestion />
        },
        {
          path: "question-preview",
          element: <QuestionPreview />
        },
        {
          path: "edit-questions",
          element: <EditQuestions />
        },
        {
          path: "edit-question",
          element: <EditQuestion />
        },
        {
          path: "user-management",
          element: <UserManagement />
        },
        {
          path: "author-portal",
          element: <AuthorPortal />
        },
        {
          path: "/subscribe",
          element: <Subscribe />
        },
        {
          path: "/my-profile",
          element: <MyProfile />
        },
      ],
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ]);


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
  <App />,
  document.getElementById("root")
);