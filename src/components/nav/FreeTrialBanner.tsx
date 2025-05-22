import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMatch } from "react-router-dom";
import { useServiceProvider } from "../../services/ServiceProvider";
import LinkButton from "../util/LinkButton";

function FreeTrialBanner() {
  const { accountStore } = useServiceProvider();
  const { myProfile, isLoading, isSubscribed, hasAuthorAccess } = accountStore;
  const { freeTrialDaysRemaining } = myProfile || {};
  const matchSubscribe = useMatch("/subscribe/*");

  if (isLoading || hasAuthorAccess || isSubscribed || matchSubscribe) return null;

  return (
    <Box sx={{
      backgroundColor: "#a30000",
      px: { xs: 2, md: 1 },
      py: { xs: 2, md: 1 },
      borderRadius: 1,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      gap: 2
    }}>
      <div style={{ flexGrow: 1 }}>
        {
          (freeTrialDaysRemaining === 0 || freeTrialDaysRemaining === null) ?
            <>🚨 <b>Your free trial has ended.</b> Don’t fall behind: unlock full access and smash the UKMLA!</> :
            <>⏳ <b>{freeTrialDaysRemaining} trial days left!</b> Don’t fall behind: unlock full access and smash the UKMLA!</>
        }
      </div>
      <LinkButton
        sx={{ flexShrink: 0, py: 0.5, px: 1.5 }}
        variant="contained"
        color="secondary"
        to="/subscribe"
        size="small"
      >
        Subscribe
      </LinkButton>
    </Box>
  )
}

export default observer(FreeTrialBanner);