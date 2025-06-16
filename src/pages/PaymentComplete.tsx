import { Stack, Typography } from "@mui/material";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { observer } from "mobx-react-lite";

function PaymentComplete() {
  return (
    <Page maxWidth="sm" sx={{ height: '100%' }}>
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Typography variant="h2" align="center" color="primary" sx={{ mt: 1, mb: 2 }}>Welcome Aboard!</Typography>
        <Typography variant="body1" align="center" color="primary" fontWeight={500} sx={{ mb: 2 }}>
          Dive into a comprehensive medical education experience with access to courses, webinars, podcasts, and question banks.
        </Typography>
        <Typography variant="body1" align="center" color="primary" fontWeight={500}>
          Your learning companion for medical excellence!
        </Typography>
        <LinkButton to="/" sx={{ mt: 10 }}>
          Go to Study Portal
        </LinkButton>
      </Stack>
    </Page>
  );
}

export default observer(PaymentComplete);