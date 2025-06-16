import { Stack } from "@mui/material";
import AuthLayout from "../components/auth/AuthLayout";
import LinkButton from "../components/util/LinkButton";
import { observer } from "mobx-react-lite";

function EmailConfirmed() {
  return (
    <AuthLayout title="Email confirmed" subtitle="Thanks for confirming your email, you may now log in.">
      <Stack spacing={4} alignItems="center">
        <img style={{ maxWidth: 180 }} src="/email-confirmed.webp" />
        <LinkButton
          variant="contained"
          fullWidth
          sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
          style={{ width: "100%" }}
          to="/login"
        >
          Go to Login
        </LinkButton>
      </Stack>
    </AuthLayout>
  );
}

export default observer(EmailConfirmed);