import { AutoAwesome } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Tooltip
} from "@mui/material";
import { useState } from "react";
import { TextbookLesson } from "../../models/TextbookLesson";
import { useServiceProvider } from "../../services/ServiceProvider";
import TextbookLessonContent from "../textbook/TextbookLessonContent";
import useExtensions from "../tiptap/useExtensions";

interface GenerateLessonFromQuestionButtonProps {
  learningPoints: string;
  specialityId: string;
  questionId?: string;
  refetchAssociatedLesson: () => void;
}

export default function GenerateLessonFromQuestionButton({
  learningPoints,
  specialityId,
  questionId,
  refetchAssociatedLesson
}: GenerateLessonFromQuestionButtonProps) {
  const { textbookLessonStore } = useServiceProvider();
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [open, setOpen] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState<TextbookLesson>();


  const extensions = useExtensions({
    placeholder: ""
  });

  const handleGenerateLesson = async () => {
    try {
      setLoadingGenerate(true);
      const lesson = await textbookLessonStore.generateTextbookLesson(
        learningPoints,
        specialityId,
        questionId
      );
      setGeneratedLesson(lesson);
    } catch (error) {
      console.error('Error generating lesson:', error);
    } finally {
      setLoadingGenerate(false);
    }
  };

  const handleApply = async () => {
    if (!generatedLesson) return;
    try {
      setLoadingCreate(true);
      await textbookLessonStore.createTextbookLesson(generatedLesson);
      refetchAssociatedLesson();
      setOpen(false);
      setGeneratedLesson(undefined);
    } catch (error) {
      console.error('Error creating lesson:', error);
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleDiscard = () => {
    setGeneratedLesson(undefined);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={!learningPoints ? "Add learning points to enable" : ""}>
        <span>
          <Button size="small" startIcon={<AutoAwesome />} onClick={() => setOpen(true)} disabled={!learningPoints}>
            Generate
          </Button>
        </span>
      </Tooltip>

      <Dialog open={open} onClose={handleDiscard} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Lesson</DialogTitle>
        <DialogContent>
          {!generatedLesson && !loadingGenerate && (
            <Button
              variant="outlined"
              onClick={handleGenerateLesson}
              startIcon={<AutoAwesome />}
              disabled={loadingGenerate || !learningPoints}
              sx={{ flexShrink: 0 }}
            >
              Generate
            </Button>
          )}

          {loadingGenerate && (
            <Stack alignItems="center" justifyContent="center" my={5}>
              <CircularProgress />
            </Stack>
          )}

          {generatedLesson && !loadingGenerate && (
            <Box mt={2}>
              <TextbookLessonContent textbookLesson={generatedLesson} inPreview />
              <Stack
                direction="row"
                spacing={1}
                mt={3}
                justifyContent="right"
              >
                <Button variant="outlined" onClick={handleDiscard}>
                  Discard
                </Button>
                <Button variant="contained" onClick={handleApply}>
                  Apply
                </Button>
              </Stack>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}