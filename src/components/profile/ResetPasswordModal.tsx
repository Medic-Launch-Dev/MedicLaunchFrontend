import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResetPasswordModal({ open, onClose }: EditProfileModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 1 }} spacing={2}>
          <TextField
            fullWidth
            size="small"
            label="Current Password"
          />
          <TextField
            fullWidth
            size="small"
            label="New Password"
          />
          <TextField
            fullWidth
            size="small"
            label="Confirm New Password"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ pb: 2 }}>
        <Button variant="contained">Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}