import { ChevronLeft, ChevronRight, Lock } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Page from "../components/nav/Page";
import { PlanSelection } from "../components/subscribe/PlanSelection";
import { QuestionBankSelection } from "../components/subscribe/QuestionBankSelection";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

function Subscribe() {
  const { paymentStore } = useServiceProvider();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState<number>(2);

  const { showSnackbar, snackbarProps } = useSnackbar();

  const steps = [
    {
      label: "Select Question Bank",
      onNext: () => setActiveStep(1),
    },
    {
      label: "Select Plan",
      onNext: handlePayment,
    },
  ];

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  async function handlePayment() {
    setLoading(true);
    const checkoutSessionUrl = await paymentStore.createCheckoutSession(selectedPlanId);
    window.location.href = checkoutSessionUrl;
    setLoading(false);
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
            endIcon={activeStep === steps.length - 1 ? undefined : <ChevronRight />}
            startIcon={activeStep === steps.length - 1 ? <Lock /> : undefined}
            onClick={steps[activeStep].onNext}
            loading={loading}
          >
            {activeStep === steps.length - 1 ? "Secure Checkout" : "Next"}
          </LoadingButton>
        </Stack>
      </Stack>
    </Page>
  );
}

export default observer(Subscribe);
