import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RichQuestionTextEditor } from "../components/tiptap/RichQuestionTextEditor";
import TextSelect from "../components/util/TextSelect";
import { useSnackbar } from "../hooks/useSnackbar";
import { Question, QuestionType } from "../models/Question";
import Speciality from "../models/Speciality";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradient, primaryGradientText } from "../theme";

const CreateQuestion = () => {
  const { questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const navigate = useNavigate();

  const questionBankOptions = [
    {
      value: QuestionType.General,
      displayText: "General"
    },
    {
      value: QuestionType.PaperOneMockExam,
      displayText: "Mock Paper 1"
    },
    {
      value: QuestionType.PaperTwoMockExam,
      displayText: "Mock Paper 2"
    }
  ];

  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedQuestionBank, setSelectedQuestionBank] = useState<QuestionType>(QuestionType.General);

  const [questionText, setQuestionText] = useState('');
  const [explanation, setExlpanation] = useState('');
  const [learningPoints, setLearningPoints] = useState('');
  const [clinicalTips, setClinicalTips] = useState('');

  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [optionE, setOptionE] = useState('');
  const [answer, setAnswer] = useState('');

  const options = [
    {
      letter: "A",
      value: optionA,
      setValue: setOptionA
    },
    {
      letter: "B",
      value: optionB,
      setValue: setOptionB
    },
    {
      letter: "C",
      value: optionC,
      setValue: setOptionC
    },
    {
      letter: "D",
      value: optionD,
      setValue: setOptionD
    },
    {
      letter: "E",
      value: optionE,
      setValue: setOptionE
    },
  ]

  const handleSortOptions = () => {
    const sortedOptions = [optionA, optionB, optionC, optionD, optionE].sort();
    setOptionA(sortedOptions[0]);
    setOptionB(sortedOptions[1]);
    setOptionC(sortedOptions[2]);
    setOptionD(sortedOptions[3]);
    setOptionE(sortedOptions[4]);
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const question: Question = {
        specialityId: selectedSpeciality,
        questionText,
        clinicalTips,
        learningPoints,
        explanation,
        options: options.map(option => ({
          letter: option.letter,
          text: option.value,
        })),
        correctAnswerLetter: answer,
        questionType: selectedQuestionBank,
        isSubmitted: true,
      };

      console.log(question);

      // await questionsStore.addQuestion(question);

      // navigate("/edit-questions");
    } catch (e) {
      console.error(e);
      showSnackbar("Failed to submit", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClickPreview = () => {

  };

  useEffect(() => {
    questionsStore.getSpecialities().then((data) => {
      setSpecialities(data);
    });
  }, []);

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
          <LoadingButton variant="contained" onClick={handleSubmit} loading={loading} disabled={!selectedQuestionBank || !selectedSpeciality}>
            Submit
          </LoadingButton>
        </Stack>
      </Stack>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={1}>
                <TextSelect
                  label="Question bank"
                  options={questionBankOptions}
                  value={selectedQuestionBank}
                  setSelected={setSelectedQuestionBank}
                />
                <TextSelect
                  label="Speciality"
                  options={specialities.map(speciality => ({
                    value: speciality.id,
                    displayText: speciality.name
                  }))}
                  value={selectedSpeciality}
                  setSelected={setSelectedSpeciality}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>
                  Question text
                </Typography>
                <RichQuestionTextEditor
                  placeholderText="Write new question here..."
                  initialValue={''}
                  setValue={setQuestionText}
                />
              </Stack>

              <Stack spacing={1}>
                {options.map(option => (
                  <Stack direction="row" key={option.letter} spacing={1}>
                    <Box
                      sx={{
                        background: primaryGradient,
                        color: "#fff",
                        width: 40,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 500,
                        borderRadius: 1,
                      }}
                    >
                      {option.letter}
                    </Box>
                    <TextField
                      size="small"
                      fullWidth
                      rows={2}
                      placeholder="Write answer here..."
                      value={option.value}
                      onChange={e => option.setValue(e.target.value)}
                    />
                  </Stack>
                ))}
              </Stack>
              <Stack direction="row" spacing={1}>
                <Box
                  sx={{
                    background: primaryGradient,
                    color: "#fff",
                    px: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 500,
                    borderRadius: 1,
                  }}
                >
                  Answer
                </Box>
                <TextSelect
                  size="small"
                  options={options.map(option => ({ value: option.letter }))}
                  value={answer}
                  setSelected={setAnswer}
                />
                <Button
                  onClick={handleSortOptions}
                  sx={{ minWidth: 'max-content' }}
                  disabled={options.some(option => !option.value || option.value === '')}
                >
                  Sort Options {'A-->Z'}
                </Button>
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>
                  Explanation
                </Typography>
                <RichQuestionTextEditor
                  placeholderText="Write new question here..."
                  initialValue={''}
                  setValue={setExlpanation}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>
                  Learning points
                </Typography>
                <RichQuestionTextEditor
                  placeholderText="Write new question here..."
                  initialValue={''}
                  setValue={setLearningPoints}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>
                  Clinical tips
                </Typography>
                <RichQuestionTextEditor
                  placeholderText="Write clinical tips here..."
                  initialValue={''}
                  setValue={setClinicalTips}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default observer(CreateQuestion);
