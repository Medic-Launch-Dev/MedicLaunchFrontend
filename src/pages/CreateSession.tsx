import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Button, Container, Stack, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import SpecialitySelection from "../components/createSession/SpecialitySelection";
import LinkButton from "../components/util/LinkButton";

export default function CreateSession() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps = ['Areas of study', 'Familiarity level', 'Order and Quantity',];


  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100%' }}>
      <Stack height="100%" gap={3} py={2}>

        <LinkButton to="/" sx={{ width: "max-content", flexShrink: 0 }}>Study Portal</LinkButton>
        <Stepper
          activeStep={activeStep}
          sx={{
            my: 1,
            '& .MuiStepConnector-line': { borderTopWidth: 2 },
          }}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step
                key={label}
                {...stepProps}
                sx={{
                  '& .MuiStepLabel-label': { fontSize: '1rem', px: 0.5 },
                  '& .MuiStepIcon-text': { fontSize: '1rem', },
                }}>
                <StepLabel sx={{ fontSize: '1.5rem' }}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box sx={{ bgcolor: "white", p: 4, borderRadius: 2, flexGrow: 1, maxHeight: '100%', overflowY: 'scroll' }}>
          <SpecialitySelection />
        </Box>
        <Stack direction="row" alignItems="center" justifyContent="center" gap={1} pt={1} pb={6}>
          <Button
            variant="outlined"
            sx={{ width: "max-content", flexShrink: 0 }}
            size="large"
            startIcon={<ChevronLeft />}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{ width: "max-content", flexShrink: 0, py: 1 }}
            size="large"
            endIcon={<ChevronRight />}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}