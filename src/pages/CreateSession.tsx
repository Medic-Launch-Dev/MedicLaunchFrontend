import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
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
import { useServiceProvider } from "../services/ServiceProvider";

function CreateSession() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { practiceStore, questionsStore } = useServiceProvider();

  const steps = [
    {
      label: "Select speciality",
      onNext: async () => {},
    },
    {
      label: "Select familiarity",
      onNext: async () => {
        const practiceQuestion = await practiceStore.getPracticeQuestions();
        console.log("Questions in CreateSession: ", practiceQuestion);

        questionsStore.setPracticeQuestions(practiceQuestion);
      },
    },
    {
      label: "Select number of questions",
      onNext: async () => {},
    },
  ];

  const handleNext = async () => {
    await steps[activeStep].onNext();

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStartPractice = () => {
    navigate("/practice-session");
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
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
          <Button
            variant="contained"
            sx={{ width: "max-content", flexShrink: 0, py: 1 }}
            size="large"
            endIcon={<ChevronRight />}
            onClick={activeStep < 2 ? handleNext : handleStartPractice}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default observer(CreateSession);
