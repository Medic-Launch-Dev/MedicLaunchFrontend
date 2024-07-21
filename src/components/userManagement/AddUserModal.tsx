import { Dialog, DialogContent, DialogTitle } from "@mui/material";
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
				<UserProfileForm newUser onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}