import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Grid, Stack, styled, ToggleButton, ToggleButtonGroup, toggleButtonGroupClasses, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import { observer } from "mobx-react-lite";
import { features, PlanLookupKey, plans } from "../../models/Payment";

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

const checkIcon = (
  <svg width="22" height="22" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clipRule="evenodd" d="M9.36966 18.2286C14.2909 18.2286 18.2803 14.2391 18.2803 9.31791C18.2803 4.39667 14.2909 0.407227 9.36966 0.407227C4.44843 0.407227 0.458984 4.39667 0.458984 9.31791C0.458984 14.2391 4.44843 18.2286 9.36966 18.2286ZM9.25679 11.5768L12.713 8.01253L11.7289 7.0582L8.74541 10.1349L6.99074 8.46461L6.04554 9.45754L8.29212 11.5961L8.78401 12.0644L9.25679 11.5768Z" fill="url(#paint0_linear_2098_2574)" />
    <defs>
      <linearGradient id="paint0_linear_2098_2574" x1="0.458984" y1="0.933967" x2="21.701" y2="11.0349" gradientUnits="userSpaceOnUse">
        <stop offset="0.0532222" stopColor="#2496C7" />
        <stop offset="1" stopColor="#046E9B" />
      </linearGradient>
    </defs>
  </svg>
)

interface PlanSelectionProps {
  selectedPlanLookupKey: PlanLookupKey;
  setSelectedPlanLookupKey: (planLookupKey: PlanLookupKey) => void;
}

export const PlanSelection = observer(({ selectedPlanLookupKey, setSelectedPlanLookupKey }: PlanSelectionProps) => {

  const plan = plans.find(p => p.lookupKey === selectedPlanLookupKey);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'white', borderRadius: 2, p: { xs: 3, md: 6 } }}>

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
    </Box>
  );
});