import { ChevronLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import Unauthorised from "../components/util/Unauthorised";
import { useSnackbar } from "../hooks/useSnackbar";
import { Question } from "../models/Question";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

const EditQuestion = () => {
  const { questionsStore, accountStore: { hasQuestionAuthorAccess, hasAdminAccess } } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [question, setQuestion] = useState<Question>(questionsStore.previewQuestion);
  const [canSubmit, setCanSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (submitDraft?: boolean) => {
    try {
      if (!question) return;
      submitDraft ? setLoadingSubmit(true) : setLoadingSave(true);

      const updatedQuestion: Question = { ...question, previousSpecialityId: question.specialityId }
      if (submitDraft) updatedQuestion.isSubmitted = true;

      await questionsStore.updateQuestion(updatedQuestion);

      if (submitDraft) navigate(`/edit-questions?speciality=${question.specialityId}`);

      showSnackbar(submitDraft ? "Question submitted" : "Question updated", "success");
    } catch (e) {
      console.error(e);
      showSnackbar("Failed to update", "error");
    } finally {
      setLoadingSave(false);
      setLoadingSubmit(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!question || !question.id) return;

      setLoadingDelete(true);
      const res = await questionsStore.deleteQuestion(question.id, question.specialityId);

      if (res) navigate(`/edit-questions?speciality=${question.specialityId}`);
    } catch (e) {
      console.error(e);
      showSnackbar("Failed to delete", "error");
    } finally {
      setLoadingDelete(false);
    }
  }

  const handleClickPreview = () => {
    questionsStore.setPreviewQuestion(question);
    navigate("/question-preview");
  };

  useEffect(() => {
    if (!questionsStore.previewQuestion)
      navigate("/edit-questions");
  }, [questionsStore.previewQuestion]);

  if (!hasQuestionAuthorAccess) return <Unauthorised />;

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
          <Button variant="outlined" color="error" onClick={() => setOpen(true)}>Delete</Button>
          <LoadingButton variant="contained" onClick={() => handleSubmit()} loading={loadingSave} disabled={!canSubmit}>
            Save
          </LoadingButton>
          {
            !question?.isSubmitted && hasAdminAccess &&
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle color="error">Delete Question</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this question?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
          <LoadingButton variant="contained" color="error" onClick={handleDelete} loading={loadingDelete}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </Page>
  );
};

export default observer(EditQuestion);
