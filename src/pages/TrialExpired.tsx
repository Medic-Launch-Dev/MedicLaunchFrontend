import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";

export default function TrialExpired() {
  return (
    <Page withNav fullWidth>
      <Dialog open={true} fullWidth maxWidth="xs">
        <DialogTitle>🚨 Free Trial Expired</DialogTitle>
        <DialogContent>
          Your free trial has expired. Don’t fall behind: subscribe to unlock full access and smash the UKMLA!
        </DialogContent>
        <DialogActions>
          <LinkButton to="/" variant="text">
            Go to Home
          </LinkButton>
          <LinkButton to="/subscribe" variant="contained">
            Subscribe
          </LinkButton>
        </DialogActions>
      </Dialog>
    </Page>
  )
}