import { LoadingButton } from "@mui/lab";
import { Container, Snackbar, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import FlashcardEditView from "../components/flashCards/FlashcardEditView";
import { useSnackbar } from "../hooks/useSnackbar";
import { Flashcard } from "../models/Flashcard";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

const CreateFlashCard = () => {
  const { showSnackbar, snackbarProps } = useSnackbar();

  const { questionsStore, flashCardStore } = useServiceProvider();

  const [loadingSave, setLoadingSave] = useState(false);
  const [flashcard, setFlashcard] = useState<Flashcard>({ name: '', imageUrl: '', specialityId: '' });

  console.log(flashcard);

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

  return (
    <Container maxWidth="md">
      <Snackbar {...snackbarProps} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h2" style={primaryGradientText}>
          Create new flashcard
        </Typography>
        <LoadingButton
          variant="contained"
          disabled={!flashcard.specialityId || !flashcard.name || !flashcard.imageUrl}
          onClick={handleSubmit}>
          Submit
        </LoadingButton>
      </Stack>
      <FlashcardEditView flashcard={flashcard} setFlashcard={setFlashcard} />
    </Container>
  );
}

export default observer(CreateFlashCard);