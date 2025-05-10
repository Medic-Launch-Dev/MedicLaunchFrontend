import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextbookLesson } from "../../models/TextbookLesson";
import { useServiceProvider } from "../../services/ServiceProvider";

interface AddTextbookLessonModalProps {
  open: boolean;
  onClose: () => void;
  specialityId: string;
}

export default function AddTextbookLessonModal({ open, onClose, specialityId }: AddTextbookLessonModalProps) {
  const navigate = useNavigate();
  const { textbookLessonStore } = useServiceProvider();

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    const newLesson: TextbookLesson = {
      title: title,
      specialityId: specialityId,
      contents: []
    }

    setLoading(true);
    const newLessonId = await textbookLessonStore.createTextbookLesson(newLesson);
    if (newLessonId) navigate(`/edit-clinical-companion-lesson/${newLessonId}`);
    setLoading(false);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Clinical Companion Lesson</DialogTitle>
      <DialogContent>
        <TextField label="Title" variant="outlined" value={title} onChange={e => setTitle(e.target.value)} sx={{ my: 1, minWidth: 300 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton onClick={handleAdd} variant="contained" loading={loading}>Create</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}