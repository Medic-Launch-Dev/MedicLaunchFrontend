import { LoadingButton } from "@mui/lab";
import { CircularProgress, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlashcardEditView from "../components/flashCards/FlashcardEditView";
import Page from "../components/nav/Page";
import { useSnackbar } from "../hooks/useSnackbar";
import { Flashcard } from "../models/Flashcard";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

export default function EditFlascard() {
  const { id = "" } = useParams();
  const { showSnackbar, snackbarProps } = useSnackbar();

  const { questionsStore, flashCardStore } = useServiceProvider();

  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
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

  return (
    <Page maxWidth="md">
      <Snackbar {...snackbarProps} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h2" style={primaryGradientText}>
          Edit flash card
        </Typography>
        <LoadingButton
          variant="contained"
          disabled={!flashcard.specialityId || !flashcard.name || !flashcard.imageUrl}
          onClick={handleSubmit}>
          Save
        </LoadingButton>
      </Stack>
      {
        loading ?
          <Stack alignItems="center" my={5}>
            <CircularProgress />
          </Stack>
          :
          <FlashcardEditView flashcard={flashcard} setFlashcard={setFlashcard} />
      }
    </Page>
  )
}