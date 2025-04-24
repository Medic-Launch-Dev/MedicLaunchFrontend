import { LoadingButton } from "@mui/lab";
import { Snackbar, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { useSnackbar } from "../hooks/useSnackbar";
import { useServiceProvider } from "../services/ServiceProvider";

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { showSnackbar, snackbarProps } = useSnackbar();
  const { userStore } = useServiceProvider();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResendConfirmation = async () => {
    if (!email || emailSent) return;

    try {
      setLoading(true);

      const success = await userStore.resendConfirmationEmail(email);
      if (success) {
        setEmailSent(true);
        showSnackbar("Confirmation email sent", "success");
      }
    } catch (error) {
      showSnackbar("Failed to send confirmation email", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Confirm Your Email" subtitle="Before we proceed, we need to verify your email.">
      <Snackbar {...snackbarProps} />
      <Stack spacing={3} alignItems="center">
        <img style={{ maxWidth: 250 }} src="/email-sent.webp" />
        {
          emailSent ?
            <Typography fontSize={16} textAlign="center" sx={{ color: grey[700] }}>
              A confirmation email has been sent to {email}.
            </Typography>
            :
            <LoadingButton
              variant="contained"
              fullWidth
              sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
              type="submit"
              loading={loading}
              onClick={handleResendConfirmation}
            >
              Send Confirmation Email
            </LoadingButton>
        }
      </Stack>
    </AuthLayout>
  );
}