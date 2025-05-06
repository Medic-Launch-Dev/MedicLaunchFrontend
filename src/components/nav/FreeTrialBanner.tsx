import styled from "@emotion/styled";
import { useMatch } from "react-router-dom";
import { useServiceProvider } from "../../services/ServiceProvider";
import LinkButton from "../util/LinkButton";

const Container = styled('div')(() => ({
  backgroundColor: "#e6f0f5",
  padding: "4px 4px 4px 12px",
  borderRadius: 12,
  border: "1px solid #8cc1d7",
  color: "#16698d",
  display: "flex",
  alignItems: "center",
  gap: 16,
}));

export default function FreeTrialBanner() {
  const { accountStore } = useServiceProvider();
  const { myProfile, hasAuthorAccess } = accountStore;
  const { freeTrialDaysRemaining, hasActiveSubscription } = myProfile || {};
  const matchSubscribe = useMatch("/subscribe/*");

  if (hasAuthorAccess || hasActiveSubscription || matchSubscribe) return null;

  return (
    <Container>
      {
        (freeTrialDaysRemaining === 0 || freeTrialDaysRemaining === null) ?
          <div>🚨 <b>Your free trial has ended.</b> Don’t fall behind: unlock full access and smash the UKMLA!</div> :
          <div>⏳ <b>{freeTrialDaysRemaining} days left!</b> Don’t fall behind: unlock full access and smash the UKMLA!</div>
      }
      <LinkButton
        variant="contained"
        color="primary"
        to="/subscribe"
        size="small"
      >
        Subscribe
      </LinkButton>
    </Container>
  )
}