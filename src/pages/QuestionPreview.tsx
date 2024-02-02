import { ChevronLeft } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import QuestionView from "../components/practiceSession/QuestionView";
import LinkButton from "../components/util/LinkButton";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradient } from "../theme";

function QuestionPreview() {
  const { questionsStore } = useServiceProvider();

  return (
    <Container maxWidth="lg">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          background: primaryGradient,
          px: 3,
          py: 1,
          borderRadius: 1,
          mb: 4
        }}>
        <LinkButton variant="text" color="secondary" to="/create-question" startIcon={<ChevronLeft />}>
          Back to edit
        </LinkButton>
        <Typography variant="h3" color="secondary">Preview</Typography>
        <Button startIcon={<ChevronLeft />} sx={{ visibility: "hidden" }}>Back to edit</Button>
      </Stack>
      {
        questionsStore.previewQuestion ?
          <QuestionView question={questionsStore.previewQuestion} inPreview />
          :
          <div>Nothing to preview</div>
      }
    </Container>
  )
}

export default observer(QuestionPreview);