import { Button, Snackbar, Stack, StackProps, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import { Note } from "../../models/Note";
import { useServiceProvider } from "../../services/ServiceProvider";

export interface EditNoteProps extends StackProps {
  note?: Note;
  specialityId?: string;
  flashcardId?: string;
  questionId?: string;
  onSave?: () => void;
}

export default function EditNote({ note, specialityId, flashcardId, questionId, onSave, ...rest }: EditNoteProps) {
  const { notesStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    setContent(note?.content || "");
    console.log("Note changed");
  }, [note, flashcardId, questionId, specialityId]);

  async function saveNote() {
    if (!note) {
      const newNote = new Note();
      newNote.specialityId = specialityId;
      newNote.flashcardId = flashcardId;
      newNote.questionId = questionId;
      newNote.content = content;
      const success = await notesStore.createNote(newNote);
      if (success) {
        await notesStore.getAllNotes();
        showSnackbar('Saved', 'success');
        if (onSave) onSave();
      }
    } else {
      note.content = content;
      const success = await notesStore.updateNote(note);
      if (success) {
        await notesStore.getAllNotes();
        showSnackbar('Saved', 'success');
      }
    }
  }

  return (
    <Stack {...rest}>
      <Snackbar {...snackbarProps} />

      <TextField
        multiline
        sx={{ flexGrow: 1 }}
        inputProps={{ style: { height: "100%" } }}
        InputProps={{ sx: { height: '100%' } }}
        fullWidth
        placeholder="Add a note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        variant="contained"
        sx={{ width: 'max-content', height: 'max-content', mt: 2 }}
        onClick={saveNote}
        disabled={!content || content === note?.content}
      >
        Save
      </Button>
    </Stack>
  )
}