import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

interface RevisionNoteModalProps {
  open: boolean;
  onClose: () => void;
  defaultValue?: string;
}

export default function RevisionNoteModal({ open, onClose, defaultValue }: RevisionNoteModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontSize: 20 }}>Note</DialogTitle>
      <DialogContent sx={{ height: 500 }}>
        <TextField
          placeholder="Add note..."
          defaultValue={defaultValue}
          fullWidth
          multiline
          sx={{ height: '100%' }}
          inputProps={{
            style: {
              height: "100%",
            },
          }}
          InputProps={{
            sx: { height: '100%' }
          }}
        />
      </DialogContent>
      <DialogActions sx={{ m: 2 }}>
        <Button variant="contained" onClick={onClose}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}