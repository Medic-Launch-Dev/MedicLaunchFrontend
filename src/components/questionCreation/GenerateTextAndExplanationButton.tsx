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

const DUMMY_GENERATED_QUESTION: QuestionTextAndExplanation = {
  "questionText": "<p>A 25-year-old woman with cystic fibrosis presents to the Emergency Department with a fever of 39.0&#8451;, heart rate of 130&nbsp;beats per minute, blood pressure of 85/55&nbsp;mmHg, and she is confused and lethargic. On examination, she has a productive cough, and coarse crackles are heard throughout both lung fields.</p><p></p><p><strong>What is the most appropriate immediate management?</strong></p>",
  "options": [
      {
          "letter": "A",
          "text": "Administer intravenous fluids and start broad-spectrum antibiotics within the first hour"
      },
      {
          "letter": "B",
          "text": "Obtain blood cultures and wait for results before starting antibiotics"
      },
      {
          "letter": "C",
          "text": "Provide oxygen therapy and obtain a chest X-ray before initiating any treatment"
      },
      {
          "letter": "D",
          "text": "Administer nebulized antibiotics specific for Pseudomonas aeruginosa"
      },
      {
          "letter": "E",
          "text": "Start high-dose corticosteroids to reduce inflammation"
      }
  ],
  "correctAnswerLetter": "A",
  "explanation": "<p>The most appropriate immediate management is to administer intravenous fluids and start broad-spectrum antibiotics within the first hour. This patient is exhibiting signs of sepsis—fever, tachycardia, hypotension, and altered mental status—which require prompt treatment. According to NICE guidelines and the UK Sepsis Trust recommendations, early recognition and initiation of the 'Sepsis Six' protocol are crucial. This includes administering intravenous fluids to address hypotension and starting empirical broad-spectrum antibiotics as soon as possible to reduce mortality.</p><p></p><p>Option B is incorrect because delaying antibiotics until blood culture results are available can worsen outcomes; antibiotics should be started promptly after obtaining cultures. Option C involves necessary assessments but should not delay immediate resuscitative measures and antibiotic therapy. Option D is inappropriate as nebulized antibiotics are not sufficient in sepsis management; systemic antibiotics are required. Option E is not indicated unless there is a specific reason to suspect adrenal insufficiency; corticosteroids are not part of the immediate management of sepsis.</p>"
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