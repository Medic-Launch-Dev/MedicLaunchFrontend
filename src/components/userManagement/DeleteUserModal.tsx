import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useServiceProvider } from "../../services/ServiceProvider";

interface DeleteUserModalProps {
  userId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function DeleteUserModal({ userId, open, setOpen }: DeleteUserModalProps) {
  const { userStore } = useServiceProvider();

  async function handleDelete() {
    await userStore.deleteUser(userId);
    await userStore.getUserList();
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this user?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleDelete} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default observer(DeleteUserModal);