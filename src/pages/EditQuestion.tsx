import { ChevronLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Chip,
  CircularProgress,
  Snackbar,
  Stack,
  Typography
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/nav/Page";
import QuestionEditView from "../components/questionCreation/QuestionEditView";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { Question } from "../models/Question";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

const EditQuestion = () => {
  const { questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [question, setQuestion] = useState<Question>(questionsStore.previewQuestion);
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (submitDraft?: boolean) => {
    try {
      if (!question) return;
      submitDraft ? setLoadingSubmit(true) : setLoadingSave(true);

      const updatedQuestion: Question = { ...question, previousSpecialityId: question.specialityId }
      if (submitDraft) updatedQuestion.isSubmitted = true;

      await questionsStore.updateQuestion(updatedQuestion);

      if(submitDraft) navigate(`/edit-questions?speciality=${question.specialityId}`);

      showSnackbar(submitDraft ? "Question submitted" : "Question updated", "success");
    } catch (e) {
      console.error(e);
      showSnackbar("Failed to update", "error");
    } finally {
      setLoadingSave(false);
      setLoadingSubmit(false);
    }
  };

  const handleClickPreview = () => {
    questionsStore.setPreviewQuestion(question);
    navigate("/question-preview");
  };

  useEffect(() => {
    if (!questionsStore.previewQuestion) 
      navigate("/edit-questions");
  }, [questionsStore.previewQuestion]);

  return (
    <Page>
      <Snackbar {...snackbarProps} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <LinkButton variant="text" to={`/edit-questions?speciality=${question?.specialityId}`} startIcon={<ChevronLeft />}>
            Back
          </LinkButton>
          <Typography variant="h2" style={primaryGradientText}>
            Edit question
          </Typography>
          {!question?.isSubmitted && <Chip label="Draft" />}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={handleClickPreview}>Preview</Button>
          <LoadingButton variant="contained" onClick={() => handleSubmit()} loading={loadingSave} disabled={!canSubmit}>
            Save
          </LoadingButton>
          {
            !question?.isSubmitted &&
            <LoadingButton variant="contained" onClick={() => handleSubmit(true)} loading={loadingSubmit} disabled={!canSubmit}>
              Submit question
            </LoadingButton>   
          }
        </Stack>
      </Stack>
      {
        question ? 
        <QuestionEditView question={question} setQuestion={setQuestion} setCanSubmit={setCanSubmit} /> :
        <Stack alignItems="center" my={5}>
          <CircularProgress />
        </Stack>
      }
    </Page>
  );
};

export default observer(EditQuestion);
