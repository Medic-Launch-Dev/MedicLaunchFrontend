import { ChevronLeft } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import QuestionView from "../components/practiceSession/QuestionView";
import LinkButton from "../components/util/LinkButton";
import { useServiceProvider } from "../services/ServiceProvider";
import { QuestionModelUI } from "../stores/questionsStore";
import { primaryGradient } from "../theme";

function QuestionPreview() {
  let [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const { questionsStore } = useServiceProvider();

  function hasMinimumProperties(question: QuestionModelUI) {
    if (!question) return false;
    if (!question.questionText) return false;
    if (!question.options) return false;
    if (!question.correctAnswerLetter) return false;
    return true;
  }

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
        <LinkButton variant="text" color="secondary" to={from === "create" ? "/create-question" : "/edit-question"} startIcon={<ChevronLeft />}>
          Back to edit
        </LinkButton>
        <Typography variant="h3" color="secondary">Preview</Typography>
        <Button startIcon={<ChevronLeft />} sx={{ visibility: "hidden" }}>Back to edit</Button>
      </Stack>
      {
        hasMinimumProperties(questionsStore.previewQuestion) ?
          <QuestionView question={questionsStore.previewQuestion} inPreview />
          :
          <Typography textAlign="center">Add required fields to question in order to preview</Typography>
      }
    </Container>
  )
}

export default observer(QuestionPreview);