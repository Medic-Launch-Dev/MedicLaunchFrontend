import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import UserProfileForm from "./UserProfileForm";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ open, onClose }: EditProfileModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <UserProfileForm />
        <div style={{ height: 150 }} />
      </DialogContent>
      <DialogActions sx={{ pb: 2 }}>
        <Button variant="contained">Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}