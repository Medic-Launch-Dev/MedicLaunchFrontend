import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface NavigateConfirmationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function NavigateConfirmationModal({ open, setOpen }: NavigateConfirmationModalProps) {
  const navigate = useNavigate();

  const handleEndSession = () => {
    setOpen(false);
    navigate("/");
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Are You Sure You Want to Leave? 🛑</DialogTitle>
      <DialogContent>
        <Typography>Wait! Before you go…</Typography>
        <Typography>You have unsaved progress that might be lost if you leave this page. Are you sure you want to exit?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleEndSession}>End Session</Button>
        <Button variant="contained" onClick={() => setOpen(false)}>Stay on Page</Button>
      </DialogActions>
    </Dialog>
  )
}