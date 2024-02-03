import {
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AnswerOptionsInput from "../../components/questionCreation/AnswerOptionsInput";
import { RichQuestionTextEditor } from "../../components/tiptap/RichQuestionTextEditor";
import TextSelect from "../../components/util/TextSelect";
import { useSnackbar } from "../../hooks/useSnackbar";
import { Option, Question, QuestionType } from "../../models/Question";
import Speciality from "../../models/Speciality";
import { useServiceProvider } from "../../services/ServiceProvider";
import { primaryGradientText } from "../../theme";

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
}

export default function QuestionEditView({ question, setQuestion }: QuestionEditViewProps) {
  const { questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
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

  const [selectedSpeciality, setSelectedSpeciality] = useState(question?.specialityId || '');
  const [selectedQuestionBank, setSelectedQuestionBank] = useState<QuestionType>(question?.questionType || QuestionType.General);

  const [questionText, setQuestionText] = useState(question?.questionText || '');
  const [explanation, setExlpanation] = useState(question?.explanation || '');
  const [learningPoints, setLearningPoints] = useState(question?.learningPoints || '');
  const [clinicalTips, setClinicalTips] = useState(question?.clinicalTips || '');
  const [options, setOptions] = useState<Option[]>(question?.options || emptyOptions);
  const [answer, setAnswer] = useState(question?.correctAnswerLetter || '');

  useEffect(() => {
    questionsStore.getSpecialities().then((data) => {
      setSpecialities(data);
    });
  }, []);

  useEffect(() => {
    setQuestion({
      specialityId: selectedSpeciality,
      questionText,
      clinicalTips,
      learningPoints,
      explanation,
      options,
      correctAnswerLetter: answer,
      questionType: selectedQuestionBank,
      isSubmitted: true,
    });

    console.log(options);
  }, [selectedSpeciality, selectedQuestionBank, questionText, options, answer, explanation, learningPoints, clinicalTips])

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
              initialValue={''}
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
    </Grid>
  )
}