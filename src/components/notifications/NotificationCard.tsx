import { Paper, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Notification } from "../../models/Notification";

interface NotificationCardProps {
  notification: Notification;
}

function NotificationCard({ notification }: NotificationCardProps) {
  return (
    <Paper>
      <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
        <Typography fontWeight={500}>{notification.title}</Typography>
        <Typography color="grey" fontWeight={500}>12-10-23</Typography>
      </Stack>
    </Paper>
  )
}

export default observer(NotificationCard);