import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FlashcardEditor from "../components/flashCards/FlashcardEditor";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { Flashcard } from "../models/Flashcard";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

export default function EditFlascard() {
  const { id = "" } = useParams();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const navigate = useNavigate();
  const { flashCardStore } = useServiceProvider();

  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [flashcard, setFlashcard] = useState<Flashcard>({ name: '', imageUrl: '', specialityId: '' });

  useEffect(() => {
    getFlashcard();
  }, []);

  const handleSubmit = async () => {
    if (!flashcard) return;

    try {
      setLoadingSave(true);
      await flashCardStore.createFlashCard(flashcard);
      showSnackbar('Flashcard created successfully', 'success');
    } catch (e) {
      console.error(e);
      showSnackbar('Failed to create flashcard', 'error');
    } finally {
      setLoadingSave(false);
    }
  }

  const getFlashcard = async () => {
    try {
      const flashcard = await flashCardStore.getFlashcardById(id);
      if (flashcard) setFlashcard(flashcard);
    } catch (e) {
      console.error(e);
      showSnackbar('Failed to get flash card', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      if (!flashcard || !flashcard.id) return;

      setLoadingDelete(true);
      const res = await flashCardStore.deleteFlashCard(flashcard.id);

      if (res) navigate(`/edit-flash-cards`);
    } catch (e) {
      console.error(e);
      showSnackbar("Failed to delete", "error");
    } finally {
      setLoadingDelete(false);
    }
  }

  return (
    <Page maxWidth="md">
      <Snackbar {...snackbarProps} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <LinkButton variant="outlined" to="/edit-flash-cards">Back</LinkButton>
          <Typography variant="h2" style={primaryGradientText}>
            Edit flash card
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button variant="outlined" color="error" onClick={() => setOpen(true)}>Delete</Button>
          <LoadingButton
            variant="contained"
            disabled={!flashcard.specialityId || !flashcard.name || !flashcard.imageUrl}
            onClick={handleSubmit}
            loading={loadingSave}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
      {
        loading ?
          <Stack alignItems="center" my={5}>
            <CircularProgress />
          </Stack>
          :
          <FlashcardEditor flashcard={flashcard} setFlashcard={setFlashcard} />
      }

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle color="error">Delete Flash card</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this flash card?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
          <LoadingButton variant="contained" color="error" onClick={handleDelete} loading={loadingDelete}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Page>
  )
}