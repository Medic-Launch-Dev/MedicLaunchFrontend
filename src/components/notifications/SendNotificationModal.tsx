import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Stack, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useServiceProvider } from "../../services/ServiceProvider";

interface SendNotificationModalProps {
  userIds: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

function SendNotificationModal({ userIds, open, setOpen }: SendNotificationModalProps) {
  const { notificationsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  async function handleSend() {
    console.log(userIds, title, message);
    try {
      await notificationsStore.createNotification({ userIds, title, message });
      showSnackbar('Notification sent', 'success');
      setTitle('');
      setMessage('');
      setOpen(false);
    } catch (error) {
      showSnackbar('Failed to send notification', 'error');
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <Snackbar {...snackbarProps} />
      <DialogTitle>Send Notification</DialogTitle>
      <DialogContent>
        <Stack spacing={2} py={1}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Message"
            multiline
            fullWidth
            minRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={!title || !message}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default observer(SendNotificationModal);