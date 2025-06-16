import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useServiceProvider } from "../../services/ServiceProvider";
import { DeleteOutline } from "@mui/icons-material";

interface DeleteClinicalCaseButtonProps {
  caseId: string;
  onDeleted?: () => void;
}

export default function DeleteClinicalCaseButton({ caseId, onDeleted }: DeleteClinicalCaseButtonProps) {
  const { clinicalCaseCaptureStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await clinicalCaseCaptureStore.deleteClinicalCase(caseId);
      showSnackbar("Clinical case deleted", "success");
      setOpen(false);
      if (onDeleted) onDeleted();
    } catch (e) {
      showSnackbar("Failed to delete clinical case", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Snackbar {...snackbarProps} />
      <IconButton onClick={() => setOpen(true)}>
        <DeleteOutline />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle color="error">Delete Clinical Case</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this clinical case?</Typography>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={() => setOpen(false)} variant="text" disabled={loading}>
            Cancel
          </LoadingButton>
          <LoadingButton onClick={handleDelete} color="error" variant="contained" loading={loading}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
