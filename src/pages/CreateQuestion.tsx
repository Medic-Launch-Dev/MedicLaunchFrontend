import { LoadingButton } from "@mui/lab";
import {
  Button,
  Snackbar,
  Stack,
  Typography
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/nav/Page";
import QuestionEditView from "../components/questionCreation/QuestionEditView";
import { useSnackbar } from "../hooks/useSnackbar";
import { Question } from "../models/Question";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

const CreateQuestion = () => {
  const { questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [question, setQuestion] = useState<Question>(questionsStore.previewQuestion);
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (isSubmitted: boolean) => {
    try {
      if (!question) return;
      isSubmitted ? setLoadingSubmit(true) : setLoadingDraft(true);

      await questionsStore.addQuestion({
        ...question,
        isSubmitted
      });

      navigate(`/edit-questions?speciality=${question.specialityId}`);
    } catch (e) {
      console.error(e);
      showSnackbar("Failed to submit", "error");
    } finally {
      setLoadingDraft(false);
      setLoadingSubmit(false);
    }
  };

  const handleClickPreview = () => {
    if (!question) return;
    questionsStore.setPreviewQuestion(question);
    navigate("/question-preview?from=create");
  };

  return (
    <Page>
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
          <LoadingButton variant="contained" onClick={() => handleCreate(false)} loading={loadingDraft} disabled={!canSubmit}>
            Create Draft
          </LoadingButton>
          <LoadingButton variant="contained" onClick={() => handleCreate(true)} loading={loadingSubmit} disabled={!canSubmit}>
            Submit Question
          </LoadingButton>
        </Stack>
      </Stack>
      <QuestionEditView
        question={question}
        setQuestion={setQuestion}
        setCanSubmit={setCanSubmit}
      />
    </Page>
  );
};

export default observer(CreateQuestion);
