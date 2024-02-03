import { ChevronLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Container,
  Snackbar,
  Stack,
  Typography
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionEditView from "../components/questionCreation/QuestionEditView";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { Question } from "../models/Question";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

const EditQuestion = () => {
  const { questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<Question>(questionsStore.previewQuestion);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!question) return;
      setLoading(true);

      const updatedQuestion: Question = { ...question, previousSpecialityId: question.specialityId }

      await questionsStore.updateQuestion(updatedQuestion);

      showSnackbar("Question updated", "success");
    } catch (e) {
      console.error(e);
      showSnackbar("Failed to update", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClickPreview = () => {
    questionsStore.setPreviewQuestion(question);
    navigate("/question-preview");
  };

  return (
    <Container>
      <Snackbar {...snackbarProps} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <LinkButton variant="text" to="/edit-questions" startIcon={<ChevronLeft />}>
            Back
          </LinkButton>
          <Typography variant="h2" style={primaryGradientText}>
            Edit question
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={handleClickPreview}>Preview</Button>
          <LoadingButton variant="contained" onClick={handleSubmit} loading={loading} disabled={!question?.questionType || !question.specialityId}>
            Update
          </LoadingButton>
        </Stack>
      </Stack>
      <QuestionEditView
        question={question}
        setQuestion={setQuestion}
      />
    </Container>
  );
};

export default observer(EditQuestion);
