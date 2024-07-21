import { Card, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Page from "../components/nav/Page";
import NotificationCard from "../components/notifications/NotificationCard";
import LinkButton from "../components/util/LinkButton";
import { Notification } from "../models/Notification";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

function Notifications() {
  const { notificationsStore } = useServiceProvider();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    init();
  })

  async function init() {
    const notifications = await notificationsStore.getUserNotifications();
    setNotifications(notifications);
  }

  return (
    <Page withNav>
      <LinkButton to="/" sx={{ my: 2 }}>
        Study Portal
      </LinkButton>

      <Card>
        <Typography variant="h3" sx={primaryGradientText} mb={2}>Notifications</Typography>

        <Stack spacing={1.5}>
          {
            notifications.length > 0 ?
              notifications.map(notification => <NotificationCard key={notification.id} notification={notification} />)
              :
              <Typography align="center" py={2}>No notifications to show</Typography>
          }
        </Stack>
      </Card>
    </Page>
  );
}

export default observer(Notifications);
