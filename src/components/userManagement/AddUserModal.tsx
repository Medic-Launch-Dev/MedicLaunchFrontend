import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import UserProfileForm from "../profile/UserProfileForm";

interface EditProfileModalProps {
	open: boolean;
	onClose: () => void;
}

export default function AddUserModal({ open, onClose }: EditProfileModalProps) {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
			<DialogTitle sx={{ fontSize: 17 }}>Add User</DialogTitle>
			<DialogContent>
				<UserProfileForm newUser />
				<div style={{ height: 150 }} />
			</DialogContent>
			<DialogActions sx={{ pb: 2 }}>
				<Button variant="contained">Add User</Button>
				<Button onClick={onClose}>Cancel</Button>
			</DialogActions>
		</Dialog>
	)
}