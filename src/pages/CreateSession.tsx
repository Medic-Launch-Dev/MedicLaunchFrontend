import { BarChart, ChevronLeft, ChevronRight, School, Star } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FamiliaritySelection } from "../components/createSession/FamiliaritySelection";
import { OrderQuantitySelection } from "../components/createSession/OrderQuantitySelection";
import { SpecialitySelection } from "../components/createSession/SpecialitySelection";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { useServiceProvider } from "../services/ServiceProvider";
import theme from "../theme";
import { Familiarity } from "../models/PracticeFilter";

function CreateSession() {
  const params = new URLSearchParams(window.location.search);
  const specialityId = params.get("specialityId");
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { practiceStore, questionsStore, accountStore } = useServiceProvider();
  const { hasStudentAccess, trialQuestionLimitReached, isLoading } = accountStore;
  const { showSnackbar, snackbarProps } = useSnackbar();

  useEffect(() => {
    accountStore.getMyProfile();
    if (specialityId) {
      practiceStore.setSelectedSpecialities([specialityId]);
    } else {
      practiceStore.resetPracticeFilter();
    }
  }, []);

  const steps = [
    {
      label: "Select speciality",
      icon: <School sx={{ color: "primary.main" }} />,
      onNext: handleSelectSpeciality,
    },
    {
      label: "Select familiarity",
      icon: <Star color="primary" sx={{ color: activeStep >= 1 ? "primary.main" : "#ababab" }} />,
      onNext: handleSelectFamiliarity,
    },
    {
      label: "Select quantity",
      icon: <BarChart color="primary" sx={{ color: activeStep >= 2 ? "primary.main" : "#ababab" }} />,
      onNext: handleStartPractice,
    },
  ];

  const handleNext = async () => {
    setLoading(true);
    await steps[activeStep].onNext();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setLoading(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  async function handleSelectSpeciality() {
    // Only update familiarity counts, do not fetch questions yet
    try {
      await questionsStore.setFamiliarityCounts(
        practiceStore.practiceFilter.specialityIds,
        practiceStore.practiceFilter.allSpecialitiesSelected
      );
    } catch (e) {
      console.error(e);
      showSnackbar("Error", "error");
    }
  }

  async function handleSelectFamiliarity() { }

  async function handleStartPractice() {
    try {
      const practiceQuestions = await practiceStore.getPracticeQuestions();
      questionsStore.setPracticeQuestions(practiceQuestions);
      navigate("/practice-session");
    } catch (e) {
      showSnackbar("Error fetching questions", "error");
    }
  }

  if (!isLoading && hasStudentAccess === false) return <Navigate to="/trial-expired" />;

  return (
    <Page sx={{ height: "100%", overflow: "hidden" }}>
      <Snackbar {...snackbarProps} />
      <Stack height="100%" gap={3} py={0}>
        <LinkButton to="/" sx={{ width: "max-content", flexShrink: 0 }}>
          Study Portal
        </LinkButton>
        <Stepper
          orientation={isMobile ? "vertical" : "horizontal"}
          activeStep={activeStep}
          sx={{
            my: 2,
            "& .MuiStepConnector-line": { borderTopWidth: 2 },
          }}
        >
          {steps.map(({ label, icon }) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step
                key={label}
                {...stepProps}
                sx={{
                  "& .MuiStepLabel-label": { fontSize: "1rem", px: 0.5 },
                  "& .MuiStepIcon-text": { fontSize: "1rem" },
                }}
              >
                <StepLabel sx={{ fontSize: "1.5rem" }}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <span>{label}</span>
                    {icon}
                  </Stack>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box
          sx={{
            flexGrow: 1,
            minHeight: 0,
            maxHeight: "none",
            overflow: "hidden",
            display: "flex",
          }}
        >
          <Stack
            spacing={1}
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              height: "100%",
              minHeight: 0,
            }}
          >
            {
              trialQuestionLimitReached &&
              <Alert
                sx={{ display: "flex", alignItems: "center" }}
                severity="warning"
                action={
                  <LinkButton to="/subscribe" size="small">
                    Subscribe to Continue
                  </LinkButton>
                }
              >
                You've reached the maximum number of questions you can practice while on a free trial.
              </Alert>
            }
            {activeStep === 0 && <SpecialitySelection />}
            {activeStep === 1 && <FamiliaritySelection />}
            {activeStep === 2 && <OrderQuantitySelection />}
          </Stack>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
          pt={0}
          pb={0}
          sx={{ flexShrink: 0 }}
        >
          <Button
            variant="outlined"
            sx={{ width: "max-content", flexShrink: 0 }}
            size="large"
            startIcon={<ChevronLeft />}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <LoadingButton
            variant="contained"
            sx={{ width: "max-content", flexShrink: 0, py: 1 }}
            size="large"
            endIcon={<ChevronRight />}
            onClick={handleNext}
            loading={loading}
            disabled={trialQuestionLimitReached}
          >
            Next
          </LoadingButton>
        </Stack>
      </Stack>
    </Page>
  );
}

export default observer(CreateSession);
