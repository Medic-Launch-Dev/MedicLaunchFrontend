import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppShell from './components/nav/AppShell';
import CreateQuestion from "./pages/CreateQuestion";
import Login from './pages/Login';
import PracticeSession from './pages/PracticeSession';
import Register from './pages/Register';
import ReviewSession from './pages/ReviewSession';
import Root from './pages/Root';
import reportWebVitals from './reportWebVitals';
import theme from './theme';
import EditQuestions from './pages/EditQuestions';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        path: "",
        element: <Root />
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
        element: <CreateQuestion />,
      },
      {
        path: "edit-questions",
        element: <EditQuestions/>
      },
    ]
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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
