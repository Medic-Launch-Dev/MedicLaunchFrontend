import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import EditNote, { EditNoteProps } from "./EditNote";

interface EditNoteDialogProps extends EditNoteProps {
  open: boolean;
  onClose: () => void;
}

export default function EditNoteDialog({ open, onClose, ...rest }: EditNoteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontSize: 20 }}>Note</DialogTitle>
      <DialogContent>
        <EditNote
          height={600}
          alignItems="end"
          {...rest}
          onSave={onClose}
          closeButton={<Button variant="text" onClick={onClose}>Cancel</Button>}
        />
      </DialogContent>
    </Dialog>
  )
}