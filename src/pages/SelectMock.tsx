import { ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Snackbar, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/nav/Page";
import MockSelector from "../components/practiceSession/MockSelector";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { Question, QuestionType } from "../models/Question";
import { useServiceProvider } from "../services/ServiceProvider";

const sampleQuestions: Question[] = [
  {
    specialityId: '1',
    questionType: QuestionType.General,
    questionText: 'What is the capital of France?',
    options: [
      { letter: 'A', text: 'London' },
      { letter: 'B', text: 'Paris' },
      { letter: 'C', text: 'Berlin' },
      { letter: 'D', text: 'Rome' },
    ],
    correctAnswerLetter: 'B',
    explanation: 'Paris is the capital of France.',
    clinicalTips: 'None',
    learningPoints: 'Remember key capitals around the world.',
    isSubmitted: false,
  },
  {
    specialityId: '2',
    questionType: QuestionType.General,
    questionText: 'Is the Earth flat?',
    options: [
      { letter: 'A', text: 'True' },
      { letter: 'B', text: 'False' },
    ],
    correctAnswerLetter: 'B',
    explanation: 'No, the Earth is an oblate spheroid.',
    clinicalTips: 'None',
    learningPoints: 'Understand basic geography facts.',
    isSubmitted: false,
  },
  {
    specialityId: '3',
    questionType: QuestionType.General,
    questionText: 'What is the powerhouse of the cell?',
    options: [
      { letter: 'A', text: 'Nucleus' },
      { letter: 'B', text: 'Mitochondria' },
      { letter: 'C', text: 'Ribosome' },
      { letter: 'D', text: 'Endoplasmic reticulum' },
    ],
    correctAnswerLetter: 'B',
    explanation: 'Mitochondria are often called the powerhouse of the cell due to their role in energy production.',
    clinicalTips: 'None',
    learningPoints: 'Learn about cellular structures and functions.',
    isSubmitted: false,
  },
  {
    specialityId: '4',
    questionType: QuestionType.General,
    questionText: 'What is the chemical symbol for water?',
    options: [
      { letter: 'A', text: 'W' },
      { letter: 'B', text: 'H2O' },
      { letter: 'C', text: 'H2' },
      { letter: 'D', text: 'HO' },
    ],
    correctAnswerLetter: 'B',
    explanation: 'H2O is the chemical formula for water.',
    clinicalTips: 'None',
    learningPoints: 'Understand chemical symbols and formulas.',
    isSubmitted: false,
  },
];

export default function SelectMock() {
  const { practiceStore, questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [selectedMock, setSelectedMock] = useState<QuestionType.PaperOneMockExam | QuestionType.PaperTwoMockExam>(QuestionType.PaperOneMockExam);
  const navigate = useNavigate();

  async function handleStartMock() {
    try {
      // practiceStore.setAllSpecialitiesSelected(true);
      await questionsStore.startMock(selectedMock);
      navigate(`/practice-session?isMock=true`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Page sx={{ height: "100%" }}>
      <Snackbar {...snackbarProps} />
      <Stack height="100%" gap={3} py={2}>
        <LinkButton to="/" sx={{ width: "max-content", flexShrink: 0 }}>
          Study Portal
        </LinkButton>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container height="100%" spacing={4}>
            <Grid item xs={12} md={6}>
              <MockSelector
                name="Paper 1"
                selected={selectedMock === QuestionType.PaperOneMockExam}
                setSelected={() => setSelectedMock(QuestionType.PaperOneMockExam)}
                specialities={[
                  "Acute medicine",
                  "Cardiovascular",
                  "Dermatology",
                  "Endocrine & metabolic",
                  "Gastrointestinal",
                  "Infection",
                  "Medicine of older adult",
                  "Neurosciences",
                  "Ophthalmology",
                  "Primary care",
                  "Renal & Urology",
                  "Respiratory",
                  "Surgery & clinical imaging",
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MockSelector
                name="Paper 2"
                selected={selectedMock === QuestionType.PaperTwoMockExam}
                setSelected={() => setSelectedMock(QuestionType.PaperTwoMockExam)}
                specialities={[
                  "Acute medicine",
                  "Breast",
                  "Cancer",
                  "Child health",
                  "Ear, nose & throat",
                  "Emergency medicine & intensive care",
                  "Haematology",
                  "Medical ethics & law",
                  "Mental health",
                  "Musculoskeletal",
                  "Obstetrics & gynaecology",
                  "Palliative & End of Life care",
                  "Peri-op medicine & anaesthesia",
                  "Primary care",
                  "Sexual health",
                  "Social/population health & research methods",
                  "Surgery & clinical imaging",
                ]}
              />
            </Grid>
          </Grid>
        </Box>
        <Stack direction="row" justifyContent="center">
          <LoadingButton
            variant="contained"
            sx={{ width: "max-content", flexShrink: 0, py: 1 }}
            size="large"
            endIcon={<ChevronRight />}
            onClick={handleStartMock}
          >
            Next
          </LoadingButton>
        </Stack>
      </Stack>
    </Page>
  )
}