import { ChevronLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../components/nav/Page";
import TextbookLessonEditor from "../components/textbook/TextbookLessonEditor";
import LinkButton from "../components/util/LinkButton";
import Unauthorised from "../components/util/Unauthorised";
import { useSnackbar } from "../hooks/useSnackbar";
import { TextbookLesson } from "../models/TextbookLesson";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

function EditTextbookLesson() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const { textbookLessonStore, accountStore: { hasQuestionAuthorAccess } } = useServiceProvider();

  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [textbookLesson, setTextbookLesson] = useState<TextbookLesson>({ title: '', specialityId: '', contents: [] });
  const [initialTextbookLesson, setInitialTextbookLesson] = useState<TextbookLesson | null>(null);

  useEffect(() => {
    getTextbookLesson();
  }, []);

  const getTextbookLesson = async () => {
    const fetchedLesson = await textbookLessonStore.getTextbookLessonById(id);
    if (fetchedLesson) {
      setTextbookLesson(fetchedLesson);
      setInitialTextbookLesson(fetchedLesson);
    }
    setLoading(false);
  };

  const hasChanges = JSON.stringify(textbookLesson) !== JSON.stringify(initialTextbookLesson);

  useEffect(() => {
    getTextbookLesson();
  }, []);

  const handleSave = async () => {
    if (!hasChanges) return;

    setLoadingSave(true);

    const success = await textbookLessonStore.updateTextbookLesson(textbookLesson);
    if (success) showSnackbar('Changes saved', 'success');
    else showSnackbar('Failed to save changes', 'error');

    setLoadingSave(false);
  }

  const handleDelete = async () => {
    setLoadingDelete(true);
    const success = await textbookLessonStore.deleteTextbookLessonById(id);

    if (success) navigate(`/edit-clinical-companion-lesson?specialityId=${textbookLesson.specialityId}`);
  }

  if (!hasQuestionAuthorAccess) return <Unauthorised />;

  return (
    <Page maxWidth="md">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Snackbar {...snackbarProps} />
        <Stack direction="row" alignItems="center" spacing={2}>
          <LinkButton variant="outlined" to={`/edit-clinical-companion-lesson?specialityId=${textbookLesson.specialityId}`} startIcon={<ChevronLeft />}>Back</LinkButton>
          <Typography variant="h2" style={primaryGradientText}>
            Edit lesson
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button variant="outlined" color="error" onClick={() => setOpen(true)}>Delete</Button>
          <LinkButton variant="outlined" to={`/clinical-companion/${textbookLesson.specialityId}?lessonId=${textbookLesson.id}`}>
            View
          </LinkButton>
          <LoadingButton
            variant="contained"
            disabled={!hasChanges}
            onClick={handleSave}
            loading={loadingSave}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
      {
        loading ?
          <Stack alignItems="center" my={5}>
            <CircularProgress />
          </Stack>
          :
          <TextbookLessonEditor textbookLesson={textbookLesson} setTextbookLesson={setTextbookLesson} />
      }

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle color="error">Delete Textbook Lesson</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this textbook lesson?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
          <LoadingButton variant="contained" color="error" onClick={handleDelete} loading={loadingDelete}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Page>
  )
}

export default observer(EditTextbookLesson);