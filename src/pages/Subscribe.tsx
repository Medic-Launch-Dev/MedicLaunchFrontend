import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Snackbar, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/nav/Page";
import { Payment } from "../components/subscribe/Payment";
import { PlanSelection } from "../components/subscribe/PlanSelection";
import { QuestionBankSelection } from "../components/subscribe/QuestionBankSelection";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { primaryGradientText } from "../theme";

function Subscribe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState<number>(2);

  const { showSnackbar, snackbarProps } = useSnackbar();

  const steps = [
    {
      label: "Select Question Bank",
      onNext: () => { },
    },
    {
      label: "Select Plan",
      onNext: handlePlan,
    },
    {
      label: "Make Payment",
      onNext: handlePayment,
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

  async function handlePlan() {

  }

  async function handlePayment() {

  }

  return (
    <Page sx={{ height: "100%" }}>
      <Snackbar {...snackbarProps} />
      <Stack height="100%" gap={3} py={2}>
        <Stack direction="row" justifyContent="space-between">
          <LinkButton to="/" sx={{ width: "max-content", flexShrink: 0 }} startIcon={<ChevronLeft />}>
            Study Portal
          </LinkButton>
          <Typography fontSize={28} fontWeight={500} sx={primaryGradientText}>
            Purchase Subscription
          </Typography>
          <LinkButton to="/" sx={{ width: "max-content", flexShrink: 0, visibility: "hidden" }} startIcon={<ChevronLeft />}>
            Study Portal
          </LinkButton>
        </Stack>
        <Stepper
          activeStep={activeStep}
          sx={{
            my: 2,
            "& .MuiStepConnector-line": { borderTopWidth: 2 },
          }}
        >
          {steps.map(({ label }) => {
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
            minHeight: 550,
            overflowY: "hidden",
          }}
        >
          {activeStep === 0 && <QuestionBankSelection />}
          {activeStep === 1 && <PlanSelection selectedPlanId={selectedPlanId} setSelectedPlanId={setSelectedPlanId} />}
          {activeStep === 2 && <Payment selectedPlanId={selectedPlanId} />}
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
          {
            activeStep < steps.length - 1 ?
              <LoadingButton
                variant="contained"
                sx={{ width: "max-content", flexShrink: 0, py: 1 }}
                size="large"
                endIcon={<ChevronRight />}
                onClick={handleNext}
                loading={loading}
              >
                Next
              </LoadingButton> : <></>
          }
        </Stack>
      </Stack>
    </Page>
  );
}

export default observer(Subscribe);
