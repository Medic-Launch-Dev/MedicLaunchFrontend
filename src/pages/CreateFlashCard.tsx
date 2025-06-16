import { LoadingButton } from "@mui/lab";
import { Snackbar, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlashcardEditor from "../components/flashCards/FlashcardEditor";
import Page from "../components/nav/Page";
import Unauthorised from "../components/util/Unauthorised";
import { useSnackbar } from "../hooks/useSnackbar";
import { Flashcard } from "../models/Flashcard";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

function CreateFlashCard() {
  const navigate = useNavigate();
  const { showSnackbar, snackbarProps } = useSnackbar();

  const { flashCardStore, accountStore: { hasFlashcardAuthorAccess } } = useServiceProvider();

  const [loadingSave, setLoadingSave] = useState(false);
  const [flashcard, setFlashcard] = useState<Flashcard>({ name: '', imageUrl: '', specialityId: '' });

  const handleSubmit = async () => {
    if (!flashcard) return;

    try {
      setLoadingSave(true);
      await flashCardStore.createFlashCard(flashcard);
      showSnackbar('Flashcard created successfully', 'success');
      navigate('/edit-flash-cards');
    } catch (e) {
      console.error(e);
      showSnackbar('Failed to create flashcard', 'error');
    } finally {
      setLoadingSave(false);
    }
  }

  if (!hasFlashcardAuthorAccess) return <Unauthorised />;

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
          Create new flashcard
        </Typography>
        <LoadingButton
          variant="contained"
          disabled={!flashcard.specialityId || !flashcard.name || !flashcard.imageUrl}
          onClick={handleSubmit}
          loading={loadingSave}
        >
          Submit
        </LoadingButton>
      </Stack>
      <FlashcardEditor flashcard={flashcard} setFlashcard={setFlashcard} />
    </Page>
  );
}

export default observer(CreateFlashCard);