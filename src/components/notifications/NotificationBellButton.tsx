import { Notifications } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useServiceProvider } from "../../services/ServiceProvider";

function NotificationBellButton() {
  const { notificationsStore } = useServiceProvider();

  useEffect(() => {
    notificationsStore.getUserNotifications();
  }, []);

  const unreadNotifications = notificationsStore.notifications.filter(notification => !notification.isRead);

  return (
    unreadNotifications.length > 0 ? (
      <Badge badgeContent={unreadNotifications.length} color="primary"
        sx={{
          '& .MuiBadge-badge': {
            right: 5,
            top: 5,
          }
        }}
      >
        <IconButton color="primary">
          <Notifications />
        </IconButton>
      </Badge>
    ) : (
      <IconButton>
        <Notifications />
      </IconButton>
    )
  );
}

export default observer(NotificationBellButton);