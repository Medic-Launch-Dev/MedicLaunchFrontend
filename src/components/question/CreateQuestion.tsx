import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  InputLabel,
} from "@mui/material";
import { MedicalQuestion, QuestionType } from "../../models/Question";
import questionsStore from "../../stores/questionsStore";

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
      <Typography variant="h4" align="center" gutterBottom>
        Create Question
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Question Text"
              fullWidth
              multiline
              rows={4}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </Grid>
          {Object.entries(options).map(([letter, text]) => (
            <Grid item xs={12} key={letter}>
              <InputLabel>{`${letter}`}</InputLabel>
              <TextField
                fullWidth
                rows={2}
                value={text}
                onChange={(e) => handleOptionChange(letter, e.target.value)}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              label="Correct Answer"
              fullWidth
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Clinical Tips"
              fullWidth
              multiline
              rows={4}
              value={clinicalTips}
              onChange={(e) => setClinicalTips(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="learning Points"
              fullWidth
              multiline
              rows={4}
              value={learningPoints}
              onChange={(e) => setLearnings(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Explanation"
              fullWidth
              multiline
              rows={4}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateQuestion;
