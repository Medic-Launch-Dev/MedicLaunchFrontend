import { AutoAwesome } from "@mui/icons-material";
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useServiceProvider } from "../../services/ServiceProvider";
import { useState } from "react";
import { RichTextReadOnly } from "mui-tiptap";
import { QuestionTextAndExplanation, Option } from "../../models/Question";
import useExtensions from "../tiptap/useExtensions";
import AnswerOption from "../practiceSession/AnswerOption";

interface GenerateTextAndExplanationButtonProps {
  setQuestionText: (questionText: string) => void;
  setExplanation: (explanation: string) => void;
  setOptions: (options: Option[]) => void;
  setAnswer: (answer: string) => void;
}

export default function GenerateTextAndExplanationButton({ setQuestionText, setExplanation, setOptions, setAnswer }: GenerateTextAndExplanationButtonProps) {
  const { questionsStore } = useServiceProvider();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState<QuestionTextAndExplanation>();

  const extensions = useExtensions({
    placeholder: ""
  });

  async function handleGenerateTextAndExplanation() {
    try {
      setLoading(true);
      const generation = await questionsStore.generateQuestionTextAndExplanation(prompt);
      setGeneratedQuestion(generation);
    } catch (error) {
      console.error('Error generating question:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApply() {
    if (!generatedQuestion) return;

    setQuestionText(generatedQuestion.questionText);
    setExplanation(generatedQuestion.explanation);
    setOptions(generatedQuestion.options);
    setAnswer(generatedQuestion.correctAnswerLetter);
    setOpen(false);
  }

  function handleDiscard() {
    setGeneratedQuestion(undefined);
    setOpen(false);
  }

  return (
    <>
      <Button size="small" startIcon={<AutoAwesome />} onClick={() => setOpen(true)}>
        Generate
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Question Text And Explanation</DialogTitle>
        <DialogContent>
          <Stack spacing={1} alignItems="end" sx={{ pt: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Prompt"
              value={prompt}
              placeholder="Sepsis - cystic fibrosis patient with fever, tachycardia, hypotension, altered mental status. Management?"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={handleGenerateTextAndExplanation}
              startIcon={<AutoAwesome />}
              disabled={loading || !prompt}
              sx={{ flexShrink: 0 }}
            >
              Generate
            </Button>
          </Stack>

          {
            generatedQuestion && !loading &&
            <Box mt={2}>
              <RichTextReadOnly content={generatedQuestion.questionText} extensions={extensions} />
              <Stack spacing={1} my={3}>
                {
                  generatedQuestion.options
                    ?.slice()
                    ?.sort((a, b) => a.letter.localeCompare(b.letter))
                    ?.map((option, index) => (
                      <AnswerOption
                        key={index}
                        option={option}
                        style={option.letter === generatedQuestion.correctAnswerLetter ? "correct" : "base"}
                        setSelectedOption={() => { }}
                        disabled
                      />
                    ))
                }
              </Stack>
              <div>
                <Typography variant="h6" color="primary">Explanation</Typography>
                <Typography fontSize={13} fontWeight={500} mt={1}>
                  <RichTextReadOnly content={generatedQuestion.explanation} extensions={extensions} />
                </Typography>
              </div>
              <Stack direction="row" spacing={1} mt={3} justifyContent="right">
                <Button variant="outlined" onClick={handleDiscard}>Discard</Button>
                <Button variant="contained" onClick={handleApply}>
                  Apply
                </Button>
              </Stack>
            </Box>
          }

          {
            loading &&
            <Stack alignItems="center" justifyContent="center" my={5}>
              <CircularProgress />
            </Stack>
          }
        </DialogContent>
      </Dialog>
    </>
  );
}