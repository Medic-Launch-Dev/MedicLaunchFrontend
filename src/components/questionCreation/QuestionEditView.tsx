import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import AnswerOptionsInput from "../../components/questionCreation/AnswerOptionsInput";
import { RichQuestionTextEditor } from "../../components/tiptap/RichQuestionTextEditor";
import TextSelect from "../../components/util/TextSelect";
import { Option, Question, QuestionType } from "../../models/Question";
import Speciality from "../../models/Speciality";
import { useServiceProvider } from "../../services/ServiceProvider";
import { primaryGradient, primaryGradientText } from "../../theme";
import { getInnerTextFromHTML } from "../../utils/RichTextUtils";

const emptyOptions = [
  { letter: "A", text: '' },
  { letter: "B", text: '' },
  { letter: "C", text: '' },
  { letter: "D", text: '' },
  { letter: "E", text: '' },
]

interface QuestionEditViewProps {
  question?: Question;
  setQuestion: (question: Question) => void;
  setCanSubmit?: (newValue: boolean) => void;
}

export default function QuestionEditView({ question, setQuestion, setCanSubmit }: QuestionEditViewProps) {
  const { questionsStore } = useServiceProvider();
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

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

  const [selectedSpeciality, setSelectedSpeciality] = useState(question?.specialityId || '');
  const [selectedQuestionBank, setSelectedQuestionBank] = useState<QuestionType>(question?.questionType || QuestionType.General);

  const [questionText, setQuestionText] = useState(question?.questionText || '');
  const [explanation, setExlpanation] = useState(question?.explanation || '');
  const [learningPoints, setLearningPoints] = useState(question?.learningPoints || '');
  const [clinicalTips, setClinicalTips] = useState(question?.clinicalTips || '');
  const [options, setOptions] = useState<Option[]>(question?.options || emptyOptions);
  const [answer, setAnswer] = useState(question?.correctAnswerLetter || '');
  const [videoUrl, setVideoUrl] = useState(question?.videoUrl || '');

  useEffect(() => {
    questionsStore.getSpecialities().then((data) => {
      setSpecialities(data);
    });
  }, []);

  useEffect(() => {
    setQuestion({
      ...question,
      specialityId: selectedSpeciality,
      questionText,
      clinicalTips,
      learningPoints,
      explanation,
      options,
      correctAnswerLetter: answer,
      questionType: selectedQuestionBank,
      videoUrl
    });
  }, [selectedSpeciality, selectedQuestionBank, questionText, options, answer, explanation, learningPoints, clinicalTips, videoUrl]);

  useEffect(() => {
    if (
      selectedSpeciality &&
      selectedQuestionBank &&
      getInnerTextFromHTML(questionText) &&
      options.every(option => option.text) &&
      answer &&
      getInnerTextFromHTML(explanation) &&
      getInnerTextFromHTML(learningPoints) &&
      getInnerTextFromHTML(clinicalTips)
    ) setCanSubmit?.(true);
    else setCanSubmit?.(false);
  }, [question]);

  return (
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
              initialValue={question?.questionText || ''}
              setValue={setQuestionText}
            />
          </Stack>

          <AnswerOptionsInput
            options={options}
            setOptions={setOptions}
            answer={answer}
            setAnswer={setAnswer}
          />

          <Stack spacing={1}>
            <Typography variant="h6" sx={primaryGradientText}>
              Explanation
            </Typography>
            <RichQuestionTextEditor
              placeholderText="Write new question here..."
              initialValue={question?.explanation || ''}
              setValue={setExlpanation}
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h6" sx={primaryGradientText}>
              Learning points
            </Typography>
            <RichQuestionTextEditor
              placeholderText="Write new question here..."
              initialValue={question?.learningPoints || ''}
              setValue={setLearningPoints}
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h6" sx={primaryGradientText}>
              Clinical tips
            </Typography>
            <RichQuestionTextEditor
              placeholderText="Write clinical tips here..."
              initialValue={question?.clinicalTips || ''}
              setValue={setClinicalTips}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={4}>
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
              flexShrink: 0
            }}
          >
            Video URL
          </Box>
          <TextField
            sx={{ flexGrow: 1 }}
            size="small"
            onBlur={(e) => setVideoUrl(e.target.value)}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}