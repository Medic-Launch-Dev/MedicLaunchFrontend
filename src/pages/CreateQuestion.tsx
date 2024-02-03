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
import { useSnackbar } from "../hooks/useSnackbar";
import { Question } from "../models/Question";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

const CreateQuestion = () => {
  const { questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<Question>(questionsStore.previewQuestion);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!question) return;
      setLoading(true);

      await questionsStore.addQuestion(question);

      navigate(`/edit-questions?speciality=${question.specialityId}`);
    } catch (e) {
      console.error(e);
      showSnackbar("Failed to submit", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClickPreview = () => {
    if (!question) return;
    questionsStore.setPreviewQuestion(question);
    navigate("/question-preview?from=create");
  };

  return (
    <Container>
      <Snackbar {...snackbarProps} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h2" style={primaryGradientText}>
          Write new question
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={handleClickPreview}>Preview</Button>
          <LoadingButton variant="contained" onClick={handleSubmit} loading={loading} disabled={!question?.questionType || !question.specialityId}>
            Create Draft
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

export default observer(CreateQuestion);
