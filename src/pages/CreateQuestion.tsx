import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { RichQuestionTextEditor } from "../components/tiptap/RichQuestionTextEditor";
import TextSelect from "../components/util/TextSelect";
import { MedicalQuestion, QuestionType } from "../models/Question";
import questionsStore from "../stores/questionsStore";
import { primaryGradient, primaryGradientText } from "../theme";

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [clinicalTips, setClinicalTips] = useState("");
  const [learningPoints, setLearnings] = useState("");
  const [explanation, setExplanation] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [options, setOptions] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
  });

  const handleOptionChange = (letter, text) => {
    setOptions((prevOptions) => ({ ...prevOptions, [letter]: text }));
  };

  const handleSubmit = () => {
    const question: MedicalQuestion = {
      specialityId: "e9093faf-afc7-4a3e-bdc6-a5d66b273257",
      questionText: questionText,
      clinicalTips: clinicalTips,
      learningPoints: learningPoints,
      explanation: explanation,
      options: Object.entries(options).map(([letter, text]) => ({
        letter,
        text,
      })),
      correctAnswerLetter: correctAnswer,
      questionType: QuestionType.General,
    };

    console.log(question);
    questionsStore.addQuestion(question);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h2" style={primaryGradientText}>
          Write new question
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined">Preview</Button>
          {/* <Button variant="outlined">Save</Button> */}
          <Button variant="contained">Submit</Button>
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
                    setSelected={() => { }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextSelect
                    label="Speciality"
                    options={["Cardioligy", "Dermatology", "Cancer"]}
                    setSelected={() => { }}
                  />
                </Grid>
              </Grid>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>Question text</Typography>
                <RichQuestionTextEditor
                  placeholderText="Write new question here..."
                  onSaveEditorContent={(text) => setQuestionText(text)}
                />
              </Stack>

              <Stack spacing={1}>
                {Object.entries(options).map(([letter, text]) => (
                  <Stack direction="row" key={letter} spacing={1}>
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
                      {letter}
                    </Box>
                    <TextField
                      size="small"
                      fullWidth
                      rows={2}
                      value={text}
                      placeholder="Write answer here..."
                      onChange={(e) => handleOptionChange(letter, e.target.value)}
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
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                />
              </Stack>


              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>Explanation</Typography>
                <RichQuestionTextEditor
                  placeholderText="Write explanation here..."
                  onSaveEditorContent={(text) => setExplanation(text)}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>Learning points</Typography>
                <RichQuestionTextEditor
                  placeholderText="Write learning points here..."
                  onSaveEditorContent={(text) => setLearnings(text)}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h6" sx={primaryGradientText}>Clinical tips</Typography>
                <RichQuestionTextEditor
                  placeholderText="Write clinical tips here..."
                  onSaveEditorContent={(text) => setClinicalTips(text)}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={4}>

          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateQuestion;
