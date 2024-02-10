import { Box, Stack, Typography } from "@mui/material";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function Payment() {
  const stripePromise = loadStripe("pk_test_51HZ948JUITqc1TPfw9cgfD1S0DZdrHoIgGTcDYuGtkRjBDg0giuikEK6tlUQV7JdC4IJQRF6bct8K8tT525tASxV00Rxj75OBt");
  const clientSecret = "pi_3OiO5nJUITqc1TPf1hurneaT_secret_viWiTco8FeHE1mx86hvKgXa1M";

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: 'white', borderRadius: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        <Stack sx={{ width: 400, borderRadius: 1, border: '1px solid #CFCFCF', height: 'max-content' }} p={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" borderBottom="1px solid #CFCFCF" pb={1.5}>
            <Typography>Question Bank</Typography>
            <Typography>Price</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" pt={3}>
            <Typography>UKMLA (3 Months)</Typography>
            <Typography fontWeight={600}>£20.00</Typography>
          </Stack>
        </Stack>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentElement />
        </Elements>
      </Box>
    </Box>
  )
}