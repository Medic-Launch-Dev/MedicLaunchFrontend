import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { useMatch } from "react-router-dom";
import { useServiceProvider } from "../../services/ServiceProvider";
import LinkButton from "../util/LinkButton";

const Container = styled('div')(() => ({
  backgroundColor: "#a30000",
  padding: "4px 8px 4px 12px",
  borderRadius: 12,
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
}));

function FreeTrialBanner() {
  const { accountStore } = useServiceProvider();
  const { myProfile, loadingProfile, isSubscribed, hasAuthorAccess } = accountStore;
  const { freeTrialDaysRemaining } = myProfile || {};
  const matchSubscribe = useMatch("/subscribe/*");

  if (loadingProfile || hasAuthorAccess || isSubscribed || matchSubscribe) return null;

  return (
    <Container>
      {
        (freeTrialDaysRemaining === 0 || freeTrialDaysRemaining === null) ?
          <div>🚨 <b>Your free trial has ended.</b> Don’t fall behind: unlock full access and smash the UKMLA!</div> :
          <div>⏳ <b>{freeTrialDaysRemaining} trial days left!</b> Don’t fall behind: unlock full access and smash the UKMLA!</div>
      }
      <LinkButton
        variant="contained"
        color="secondary"
        to="/subscribe"
        size="small"
      >
        Subscribe
      </LinkButton>
    </Container>
  )
}

export default observer(FreeTrialBanner);