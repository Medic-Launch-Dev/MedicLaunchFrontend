import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FamiliaritySelection } from "../components/createSession/FamiliaritySelection";
import { OrderQuantitySelection } from "../components/createSession/OrderQuantitySelection";
import { SpecialitySelection } from "../components/createSession/SpecialitySelection";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { useServiceProvider } from "../services/ServiceProvider";

function CreateSession() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { practiceStore, questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();

  const steps = [
    {
      label: "Select speciality",
      onNext: handleSelectSpeciality,
    },
    {
      label: "Select familiarity",
      onNext: handleSelectFamiliarity,
    },
    {
      label: "Select number of questions",
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
    try {
      // add api call here
    } catch (e) {
      console.error(e);
      showSnackbar("Error", "error");
    }
  }

  async function handleSelectFamiliarity() {
    try {
      const practiceQuestion = await practiceStore.getPracticeQuestions();

      questionsStore.setPracticeQuestions(practiceQuestion);
      practiceStore.setQuestionsCount(practiceQuestion.length);
    } catch (e) {
      showSnackbar("Error", "error");
    }
  }

  function handleStartPractice() {
    // add quanitity and order logic
    questionsStore.applyOrderAndQuantity(practiceStore.practiceFilter);
    navigate("/practice-session");
  }

  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Snackbar {...snackbarProps} />
      <Stack height="100%" gap={3} py={2}>
        <LinkButton to="/" sx={{ width: "max-content", flexShrink: 0 }}>
          Study Portal
        </LinkButton>
        <Stepper
          activeStep={activeStep}
          sx={{
            my: 2,
            "& .MuiStepConnector-line": { borderTopWidth: 2 },
          }}
        >
          {steps.map(({ label, onNext }) => {
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
                <StepLabel sx={{ fontSize: "1.5rem" }}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box
          sx={{
            flexGrow: 1,
            maxHeight: "100%",
            overflowY: "hidden",
          }}
        >
          {activeStep === 0 && <SpecialitySelection />}
          {activeStep === 1 && <FamiliaritySelection />}
          {activeStep === 2 && <OrderQuantitySelection />}
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
          pt={1}
          pb={6}
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
          >
            Next
          </LoadingButton>
        </Stack>
      </Stack>
    </Container>
  );
}

export default observer(CreateSession);
