import { CheckCircleOutline, ChevronLeft, ChevronRight, Lock } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Snackbar, Stack, styled, ToggleButton, ToggleButtonGroup, toggleButtonGroupClasses, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { features, PlanLookupKey, plans } from "../models/Payment";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: grey[100],
  borderRadius: "999px",
  textTransform: "none",
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: "999px",
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
  {
    marginLeft: -1,
    borderLeft: '1px solid transparent',
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  textTransform: "none",
  fontSize: 14,
  fontWeight: 600,
  padding: "6px 16px",
  color: theme.palette.primary.main,
  backgroundColor: 'white',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

function Subscribe() {
  const { paymentStore, accountStore: { isSubscribed, isLoading } } = useServiceProvider();
  const [loading, setLoading] = useState(false);
  const [selectedPlanLookupKey, setSelectedPlanLookupKey] = useState<PlanLookupKey>(PlanLookupKey.ANNUAL);

  const { showSnackbar, snackbarProps } = useSnackbar();

  async function handlePayment() {
    try {
      setLoading(true);
      const endorselyReferral = (window as any).endorsely_referral;
      const checkoutSessionUrl = await paymentStore.createCheckoutSession(selectedPlanLookupKey, endorselyReferral);
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

  const plan = plans.find(p => p.lookupKey === selectedPlanLookupKey);

  if (!isLoading && isSubscribed) return <Navigate to="/" />;

  return (
    <Page sx={{ height: "100%" }}>
      <Snackbar {...snackbarProps} />
      <Stack height="100%" gap={3} pt={2} pb={2}>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={2}>
          <LinkButton to="/" sx={{ width: "max-content", flexShrink: 0 }} startIcon={<ChevronLeft />}>
            Study Portal
          </LinkButton>
          <Typography fontSize={28} fontWeight={500} sx={primaryGradientText} textAlign="center">
            Purchase Subscription
          </Typography>
          <LinkButton to="/" sx={{ width: "max-content", flexShrink: 0, visibility: "hidden", display: { xs: "none", md: "block" } }} startIcon={<ChevronLeft />} >
            Study Portal
          </LinkButton>
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'white', borderRadius: 2, p: { xs: 3, md: 5 }, pb: { xs: 8, md: 0 } }}>
          <Box mb={3}>
            <StyledToggleButtonGroup
              value={selectedPlanLookupKey}
              exclusive
              onChange={(e, newValue) => setSelectedPlanLookupKey(newValue)}
            >
              <StyledToggleButton value={PlanLookupKey.MONTHLY}>Monthly</StyledToggleButton>
              <StyledToggleButton value={PlanLookupKey.ANNUAL}>Yearly</StyledToggleButton>
            </StyledToggleButtonGroup>
          </Box>

          <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center">
            {/* Pricing Box */}
            <Box sx={{ p: 4, borderRadius: 1.5, maxWidth: { xs: 'none', md: 280 }, textAlign: 'center', bgcolor: grey[50], flexShrink: 0 }}>
              <Typography variant="body1" fontWeight={600} color="primary">🔒 Limited Launch Offer: Save 50% on Annual Plans</Typography>
              <Typography variant="h1" fontWeight={600} fontSize={36} color="primary" mt={3} mb={2}>
                £{plan?.price ?? "0.00"} <Typography variant="body1" component="span">/ {selectedPlanLookupKey === PlanLookupKey.ANNUAL ? "year" : "month"}</Typography>
              </Typography>
            </Box>

            <Grid container sx={{ flexGrow: 1 }} spacing={1}>
              {features.map((feature, idx) => (
                <Grid item xs={12} lg={6} key={idx}>
                  <Stack direction="row" spacing={1} alignItems="center" key={idx}>
                    <CheckCircleOutline fontSize="medium" color="primary" />
                    <Stack>
                      <Typography fontWeight={500} fontSize={16}>{feature.title}</Typography>
                      <Typography fontSize={14} color={grey[700]}>{feature.description}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>

          <Stack alignItems={{ xs: "center", md: "end" }} width="100%" mt={{ xs: 2, md: 6 }}>
            <LoadingButton
              variant="contained"
              size="large"
              onClick={handlePayment}
              loading={loading}
              endIcon={<ChevronRight />}
              sx={{
                py: 1.5,
                px: 4,
                width: { xs: "90%", md: "max-content" },
                position: { xs: "fixed", md: "static" },
                bottom: { xs: 16, md: "auto" },

              }}
            >
              Proceed to Payment
            </LoadingButton>
          </Stack>
        </Box>
      </Stack>
    </Page>
  );
}

export default observer(Subscribe);
