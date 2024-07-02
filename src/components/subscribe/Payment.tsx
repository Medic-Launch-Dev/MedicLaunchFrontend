import { Box, Stack, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useServiceProvider } from "../../services/ServiceProvider";
import { LoadingWrapper } from "../util/LoadingWrapper";
import CheckoutForm from "./CheckoutForm";

export const Payment = () => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const { paymentStore } = useServiceProvider();

  useEffect(() => {
    // TODO: change plan id based on user selection
    const secretPromise = paymentStore.getPaymentIntent(1);

    const keyPromise = paymentStore.getPubishableKey();

    Promise.all([secretPromise, keyPromise]).then((values) => {
      const [clientSecret, publishableKey] = values;

      setClientSecret(clientSecret);
      setStripePromise(loadStripe(publishableKey));

      setIsLoading(false);
    });

  }, []);

  return (
    <LoadingWrapper isLoading={isLoading}>
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
            <CheckoutForm />
          </Elements>
        </Box>
      </Box>
    </LoadingWrapper>
  )
}