import { Launch } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useServiceProvider } from "../../services/ServiceProvider";

export default function ManageSubscriptionButton() {
  const { showSnackbar, snackbarProps } = useSnackbar();
  const { accountStore, paymentStore, } = useServiceProvider();
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = async () => {
    try {
      setLoading(true);
      const sessionUrl = await paymentStore.createBillingPortalSession();
      window.open(sessionUrl, "_blank");
    } catch (error) {
      console.error("Error creating billing portal session:", error);
      showSnackbar("An error occurred while opening the billing portal.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!accountStore.isSubscribed) return null;

  return (
    <>
      <Snackbar {...snackbarProps} />
      <LoadingButton variant="contained" onClick={handleManageSubscription} loading={loading} endIcon={<Launch />}>
        Manage Subscription
      </LoadingButton>
    </>
  );
}