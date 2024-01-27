import { ChevronLeft } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Question, QuestionType } from "../../models/Question";
import { primaryGradient } from "../../theme";
import QuestionView from "../practiceSession/QuestionView";

const question = {
  specialityId: "spec_id_1",
  questionType: QuestionType.General,
  questionText: "A 6-month-old infant is brought to the clinic by their parents due to recurrent infections and delayed growth milestones. On examination, the infant has dysmorphic facial features and a noticeable cleft palate. A chest X-ray reveals an absent thymic shadow. \n What is the MOST LIKELY diagnosis based on these findings?",
  options: [
    { letter: "A", text: "Down syndrome" },
    { letter: "B", text: "Fragile X syndrome" },
    { letter: "C", text: "DiGeorge syndrome" },
    { letter: "D", text: "Marfan syndrome" },
    { letter: "E", text: "Edwards syndrome" },
  ],
  correctAnswerLetter: "C",
  explanation: "DiGeorge syndrome, also known as 22q11.2 deletion syndrome, is characterised by a range of congenital anomalies including cardiac defects, cleft palate, facial dysmorphisms, hypocalcemia, and absent thymic shadow on imaging due to thymic hypoplasia or aplasia, predisposing individuals to recurrent infections.",
  clinicalTips: "",
  learningPoints: "",
  isSubmitted: false,
}

interface QuestionPreviewProps {
  question: Question;
  setShow: (newValue: boolean) => void;
}

export default function QuestionPreview({ question, setShow }: QuestionPreviewProps) {
  return (
    <Container maxWidth="lg">
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
        <Button color="secondary" onClick={() => setShow(false)} startIcon={<ChevronLeft />}>
          Back to edit
        </Button>
        <Typography variant="h3" color="secondary">Preview</Typography>
        <Button startIcon={<ChevronLeft />} sx={{ visibility: "hidden" }}>Back to edit</Button>
      </Stack>
      <QuestionView question={question} inPreview />
    </Container>
  )
}