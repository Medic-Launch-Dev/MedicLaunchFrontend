import { Dialog, DialogContent, DialogTitle } from "@mui/material";
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
        <UserProfileForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}