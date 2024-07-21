import { Box, Dialog, DialogContent, DialogTitle, Paper, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Notification } from "../../models/Notification";
import { useServiceProvider } from "../../services/ServiceProvider";
import { primaryGradient } from "../../theme";
import { formatDate } from "../../utils/DateTimeUtils";

interface NotificationCardProps {
  notification: Notification;
}

function NotificationCard({ notification }: NotificationCardProps) {
  const { notificationsStore } = useServiceProvider();
  const [open, setOpen] = useState(false);

  async function handleClick() {
    setOpen(true);
    notificationsStore.markNotificationAsRead(notification.id!);
  }

  async function handleClose() {
    setOpen(false);
    notificationsStore.getUserNotifications();
  }

  return (
    <Box position="relative" display="inline-block">
      {!notification.isRead && (
        <Box
          sx={{
            background: primaryGradient,
            position: "absolute",
            top: -4,
            left: -4,
            width: 12,
            height: 12,
            zIndex: 1,
            borderRadius: "50%",
          }}
        />
      )}
      <Paper sx={{ cursor: "pointer" }} onClick={handleClick} >
        <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
          <Typography fontWeight={500}>{notification.title}</Typography>
          <Typography color="grey" fontWeight={500}>{formatDate(notification.createdOn)}</Typography>
        </Stack>
      </Paper>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{notification.title}</DialogTitle>
        <DialogContent>{notification.message}</DialogContent>
      </Dialog>
    </Box>
  );
}

export default observer(NotificationCard);