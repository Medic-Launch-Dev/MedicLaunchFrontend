import { ChevronLeft } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import QuestionView from "../../components/practiceSession/QuestionView";
import { QuestionModelUI } from "../../stores/questionsStore";
import { primaryGradient } from "../../theme";

interface QuestionPreviewProps {
  previewQuestion: QuestionModelUI;
  setShow: (show: boolean) => void;
}

function QuestionPreview({ previewQuestion, setShow }: QuestionPreviewProps) {
  function hasMinimumProperties(question: QuestionModelUI) {
    if (!question) return false;
    if (!question.questionText) return false;
    if (!question.options) return false;
    if (!question.correctAnswerLetter) return false;
    return true;
  }

  return (
    <>
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
        <Button variant="text" color="secondary" onClick={() => setShow(false)} startIcon={<ChevronLeft />}>
          Back to edit
        </Button>
        <Typography variant="h3" color="secondary">Preview</Typography>
        <Button startIcon={<ChevronLeft />} sx={{ visibility: "hidden" }}>Back to edit</Button>
      </Stack>
      {
        hasMinimumProperties(previewQuestion) ?
          <QuestionView question={previewQuestion} inPreview />
          :
          <Typography textAlign="center">Add required fields to question in order to preview</Typography>
      }
    </>
  )
}

export default observer(QuestionPreview);