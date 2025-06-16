import '@fontsource-variable/dm-sans';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavigationHandler from "./components/nav/NavigationHandler";
import CreateQuestion from "./pages/CreateQuestion";
import EditQuestions from './pages/EditQuestions';
import Login from "./pages/Login";
import PracticeSession from "./pages/PracticeSession";
import Register from "./pages/RegisterSimple";
import ReviewSession from "./pages/ReviewSession";
import Root from "./pages/Root";
// import reportWebVitals from "./reportWebVitals";
import AuthorPortal from "./pages/AuthorPortal";
import ClinicalCaseCapture from './pages/ClinicalCaseCapture';
import ConfirmEmail from './pages/ConfirmEmail';
import CreateFlashCard from "./pages/CreateFlashCard";
import CreateSession from "./pages/CreateSession";
import EditFlashCards from "./pages/EditFlashCards";
import EditFlascard from "./pages/EditFlashcard";
import EditQuestion from "./pages/EditQuestion";
import EditTextbookLesson from "./pages/EditTextbookLesson";
import EditTextbookLessons from "./pages/EditTextbookLessons";
import EditTrialQuestions from "./pages/EditTrialQuestions";
import EmailConfirmed from './pages/EmailConfirmed';
import FlashCards from "./pages/FlashCards";
import ForgotPassword from './pages/ForgotPassword';
import FreeTrial from "./pages/FreeTrial";
import MyProfile from "./pages/MyProfile";
import Notifications from "./pages/Notifications";
import PaymentComplete from "./pages/PaymentComplete";
import QuestionPreview from "./pages/QuestionPreview";
import ResetPassword from './pages/ResetPassword';
import RevisionNotes from "./pages/RevisionNotes";
import SelectFlashCards from "./pages/SelectFlashCards";
import SelectMock from "./pages/SelectMock";
import SpecialityAnalyser from "./pages/SpecialityAnalyser";
import Subscribe from "./pages/Subscribe";
import TextbookLesson from "./pages/TextbookLesson";
import TextbookLessons from "./pages/TextbookLessons";
import TrialExpired from './pages/TrialExpired';
import UserManagement from "./pages/UserManagement";
import { AuthGuard } from "./services/AuthGuard";
import { AuthProvider } from "./services/AuthProvider";
import {
  ServiceProvider,
  ServiceProviderConsumer,
} from "./services/ServiceProvider";
import theme from "./theme";
import ClinicalCases from './pages/ClinicalCases';
import ClinicalCaseView from './pages/ClinicalCaseView';
import WhiteboardMedicine from './pages/WhiteboardMedicine';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthGuard><NavigationHandler /></AuthGuard>,
      children: [
        { index: true, element: <Root /> },
        { path: "create-session", element: <CreateSession /> },
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
          path: "edit-trial-questions",
          element: <EditTrialQuestions />
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
          path: "subscribe",
          element: <Subscribe />
        },
        {
          path: "my-profile",
          element: <MyProfile />
        },
        {
          path: "flash-cards",
          element: <SelectFlashCards />
        },
        {
          path: "flash-cards/:specialityId",
          element: <FlashCards />
        },
        {
          path: "create-flash-card",
          element: <CreateFlashCard />
        },
        {
          path: "edit-flash-cards",
          element: <EditFlashCards />
        },
        {
          path: "edit-flashcard/:id",
          element: <EditFlascard />
        },
        {
          path: "clinical-companion",
          element: <TextbookLessons />
        },
        {
          path: "clinical-companion/:specialityId",
          element: <TextbookLesson />
        },
        {
          path: "edit-clinical-companion-lesson",
          element: <EditTextbookLessons />
        },
        {
          path: "edit-clinical-companion-lesson/:id",
          element: <EditTextbookLesson />
        },
        {
          path: "clinical-cases",
          element: <ClinicalCases />
        },
        {
          path: "clinical-cases/generate",
          element: <ClinicalCaseCapture />
        },
        {
          path: "clinical-cases/:id",
          element: <ClinicalCaseView />
        },
        {
          path: "revision-notes",
          element: <RevisionNotes />
        },
        {
          path: "notifications",
          element: <Notifications />
        },
        {
          path: "speciality-analyser",
          element: <SpecialityAnalyser />
        },
        {
          path: "select-mock",
          element: <SelectMock />
        },
        {
          path: "whiteboard-medicine",
          element: <WhiteboardMedicine />
        },
        {
          path: "payment-complete",
          element: <PaymentComplete />
        },
        {
          path: "free-trial",
          element: <FreeTrial />
        },
        {
          path: "trial-expired",
          element: <TrialExpired />
        }
      ],
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    },
    {
      path: "confirm-email",
      element: <ConfirmEmail />
    },
    {
      path: "email-confirmed",
      element: <EmailConfirmed />
    },
    {
      path: "reset-password",
      element: <ResetPassword />
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />
    }
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