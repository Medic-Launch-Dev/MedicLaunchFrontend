import { LoadingButton } from "@mui/lab";
import { Container, Snackbar, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import FlashCardEditView from "../components/flashCards/FlashCardEditView";
import { useSnackbar } from "../hooks/useSnackbar";
import { primaryGradientText } from "../theme";

const CreateFlashCard = () => {
  const { showSnackbar, snackbarProps } = useSnackbar();

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
        <LoadingButton variant="contained">
          Submit
        </LoadingButton>
      </Stack>
      <FlashCardEditView />
    </Container>
  );
}

export default observer(CreateFlashCard);