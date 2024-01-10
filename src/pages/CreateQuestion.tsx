import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Select,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { RichQuestionTextEditor } from "../components/tiptap/RichQuestionTextEditor";
import TextSelect from "../components/util/TextSelect";
import { MedicalQuestion, QuestionType } from "../models/Question";
import questionsStore from "../stores/questionsStore";
import { primaryGradient, primaryGradientText } from "../theme";
import Speciality from "../models/Speciality";
import { RichTextEditorRef } from "mui-tiptap";

const CreateQuestion = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

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

  const handleSubmit = () => {
    const options = optionsRef.map((option) => option.current!.value);

    const question: MedicalQuestion = {
      specialityId: selectedSpecialtyRef.current!.value, //"e9093faf-afc7-4a3e-bdc6-a5d66b273257",
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
      isSubmitted: false,
    };

    console.log(question);
    questionsStore.addQuestion(question);
  };

  useEffect(() => {
    questionsStore.getSpecialities().then((data) => {
      setSpecialities(data);
    });
  }, []);

  return (
    <Container>
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
          <Button variant="outlined">Preview</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Stack>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Stack spacing={3}>
              <Grid container columnSpacing={2}>
                <Grid item xs={6}>
                  <TextSelect
                    label="Question bank"
                    options={["Practice questions", "Mock 1", "Mock 2"]}
                    setSelected={() => {}}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    label="Speciality"
                    defaultValue={selectedSpecialtyRef.current?.value}
                    value={selectedSpecialtyRef.current?.value}
                    inputRef={selectedSpecialtyRef}
                  >
                    {specialities.map((speciality) => (
                      <MenuItem key={speciality.id} value={speciality.id}>
                        {speciality.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

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

export default CreateQuestion;
