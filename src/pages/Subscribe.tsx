import { ChevronLeft, Lock } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Snackbar, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Page from "../components/nav/Page";
import { PlanSelection } from "../components/subscribe/PlanSelection";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { PlanLookupKey } from "../models/Payment";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

function Subscribe() {
  const { paymentStore, accountStore: { isSubscribed, loadingProfile } } = useServiceProvider();
  const [loading, setLoading] = useState(false);
  const [selectedPlanLookupKey, setSelectedPlanLookupKey] = useState<PlanLookupKey>(PlanLookupKey.ANNUAL);

  const { showSnackbar, snackbarProps } = useSnackbar();

  async function handlePayment() {
    try {
      setLoading(true);
      const checkoutSessionUrl = await paymentStore.createCheckoutSession(selectedPlanLookupKey);
      window.location.href = checkoutSessionUrl;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showSnackbar(
        "An error occurred while processing your payment. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  if (!loadingProfile && isSubscribed) return <Navigate to="/" />;

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
          <PlanSelection selectedPlanLookupKey={selectedPlanLookupKey} setSelectedPlanLookupKey={setSelectedPlanLookupKey} />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
          pt={1}
          pb={6}
        >
          <LinkButton
            to="/"
            variant="outlined"
            sx={{ width: "max-content", flexShrink: 0 }}
            size="large"
            startIcon={<ChevronLeft />}
          >
            Back
          </LinkButton>
          <LoadingButton
            variant="contained"
            sx={{ width: "max-content", flexShrink: 0, py: 1 }}
            size="large"
            startIcon={<Lock />}
            onClick={handlePayment}
            loading={loading}
          >
            Secure Checkout
          </LoadingButton>
        </Stack>
      </Stack>
    </Page>
  );
}

export default observer(Subscribe);
