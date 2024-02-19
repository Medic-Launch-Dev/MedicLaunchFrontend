import { Box, Stack, Typography } from "@mui/material";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useServiceProvider } from "../../services/ServiceProvider";
import { useEffect, useState } from "react";

export const Payment = () => {
  // const stripePromise = loadStripe("pk_test_51HZ948JUITqc1TPfw9cgfD1S0DZdrHoIgGTcDYuGtkRjBDg0giuikEK6tlUQV7JdC4IJQRF6bct8K8tT525tASxV00Rxj75OBt");
  // const clientSecret = "pi_3OkynBJUITqc1TPf0i4uxpSV_secret_GbZCiNKpaR7hR0N2VO0MULLHf";
  const [stripe, setStripe] = useState<any>(null);  
  const [clientSecret, setClientSecret] = useState<string>("");
  const [publishableKey, setPublishableKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const { paymentStore } = useServiceProvider();

  useEffect(() => {
    // TODO: change plan id based on user selection
    const secretPromise = paymentStore.getPaymentIntent(1);

    const keyPromise = paymentStore.getPubishaableKey();

    Promise.all([secretPromise, keyPromise]).then((values) => {
      const [clientSecret, publishableKey] = values;

      setClientSecret(clientSecret);

      setPublishableKey(publishableKey);
      setStripe(loadStripe(publishableKey));

      setIsLoading(false);
    });
    
  }, [paymentStore]);

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
        <Elements stripe={stripe} options={{ clientSecret }}>
          <PaymentElement />
        </Elements>
      </Box>
    </Box>
  )
}