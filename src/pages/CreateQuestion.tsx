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
import { RichTextEditorRef } from "mui-tiptap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import QuestionPreview from "../components/questionCreation/QuestionPreview";
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
  const [showPreview, setShowPreview] = useState(false);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [previewQuestion, setPreviewQuestion] = useState<Question>();
  const navigate = useNavigate();

  const optionARef = useRef<HTMLInputElement>(null);
  const optionBRef = useRef<HTMLInputElement>(null);
  const optionCRef = useRef<HTMLInputElement>(null);
  const optionDRef = useRef<HTMLInputElement>(null);
  const optionERef = useRef<HTMLInputElement>(null);

  const optionsRef = [
    optionARef,
    optionBRef,
    optionCRef,
    optionDRef,
    optionERef,
  ];

  const answerRef = useRef<HTMLInputElement>(null);
  const questionTextEditorRef = useRef<RichTextEditorRef>(null);
  const explanationEditorRef = useRef<RichTextEditorRef>(null);
  const learningPointsEditorRef = useRef<RichTextEditorRef>(null);
  const clinicalTipsEditorRef = useRef<RichTextEditorRef>(null);

  const selectedSpecialtyRef = useRef<HTMLInputElement>(null);

  const indexToLetter = (index) => {
    return {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
      4: "E",
    }[index];
  };

  const questionBankOptions = ["Practice questions", "Mock 1", "Mock 2"];

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const options = optionsRef.map((option) => option.current!.value);

      const question: Question = {
        specialityId: selectedSpecialtyRef.current!.value,
        questionText: questionTextEditorRef.current!.editor!.getHTML() ?? "",
        clinicalTips: clinicalTipsEditorRef.current!.editor!.getHTML() ?? "",
        learningPoints: learningPointsEditorRef.current!.editor!.getHTML() ?? "",
        explanation: explanationEditorRef.current!.editor!.getHTML() ?? "",
        options: options.map((option, index) => ({
          letter: indexToLetter(index),
          text: option,
        })),
        correctAnswerLetter: answerRef.current!.value,
        questionType: QuestionType.General,
        isSubmitted: true,
      };

      await questionsStore.addQuestion(question);

      navigate("/edit-questions");
    } catch (e) {
      console.error(e);
      showSnackbar("Failed to submit", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClickPreview = () => {
    const options = optionsRef.map((option) => option.current!.value);

    const question: Question = {
      specialityId: selectedSpecialtyRef.current!.value ?? "",
      questionText: questionTextEditorRef.current!.editor!.getHTML() ?? "",
      clinicalTips: clinicalTipsEditorRef.current!.editor!.getHTML() ?? "",
      learningPoints: learningPointsEditorRef.current!.editor!.getHTML() ?? "",
      explanation: explanationEditorRef.current!.editor!.getHTML() ?? "",
      options: options.map((option, index) => ({
        letter: indexToLetter(index),
        text: option || "",
      })),
      correctAnswerLetter: answerRef.current!.value ?? "",
      questionType: QuestionType.General,
      isSubmitted: true,
    };

    setPreviewQuestion(question);
    setShowPreview(true);
  };

  useEffect(() => {
    questionsStore.getSpecialities().then((data) => {
      setSpecialities(data);
    });
  }, []);

  if (showPreview) return <QuestionPreview question={previewQuestion!} setShow={setShowPreview} />

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
          <LoadingButton variant="contained" onClick={handleSubmit} loading={loading}>
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
                  options={questionBankOptions.map(option => ({ value: option }))}
                  setSelected={() => { }}
                />
                <TextSelect
                  label="Speciality"
                  value={selectedSpecialtyRef.current?.value}
                  inputRef={selectedSpecialtyRef}
                  options={specialities.map(speciality => ({
                    value: speciality.id,
                    displayText: speciality.name
                  }))}
                  setSelected={() => { }}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>
                  Question text
                </Typography>
                <RichQuestionTextEditor
                  placeholderText="Write new question here..."
                  editorRef={questionTextEditorRef}
                />
              </Stack>

              <Stack spacing={1}>
                {optionsRef.map((option, index) => (
                  <Stack direction="row" key={index} spacing={1}>
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
                      {indexToLetter(index)}
                    </Box>
                    <TextField
                      size="small"
                      fullWidth
                      rows={2}
                      placeholder="Write answer here..."
                      inputRef={option}
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
                <TextField
                  size="small"
                  placeholder="Write correct answer here"
                  fullWidth
                  inputRef={answerRef}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>
                  Explanation
                </Typography>
                <RichQuestionTextEditor
                  placeholderText="Write explanation here..."
                  editorRef={explanationEditorRef}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>
                  Learning points
                </Typography>
                <RichQuestionTextEditor
                  placeholderText="Write learning points here..."
                  editorRef={learningPointsEditorRef}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>
                  Clinical tips
                </Typography>
                <RichQuestionTextEditor
                  placeholderText="Write clinical tips here..."
                  editorRef={clinicalTipsEditorRef}
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
