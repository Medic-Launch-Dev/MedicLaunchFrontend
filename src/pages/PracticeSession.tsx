import { Box, Button, Container, LinearProgress, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import QuestionView from "../components/question/QuestionView";
import questionsStore from "../stores/questionsStore";
import { primaryGradientText } from "../theme";

function PracticeSession() {
  const currentQuestion = questionsStore.questions[questionsStore.currentQuestionIdx];
  const currentAnswerStatus = questionsStore.answers[questionsStore.currentQuestionIdx];

  function calculateProgress() {
    let totalAnswered = 0;
    questionsStore.answers.forEach(answer => {
      if (answer) totalAnswered += 1
    })

    return Math.ceil((totalAnswered / questionsStore.answers.length) * 100);
  }

  console.log(calculateProgress());

  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mb={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            py: 2,
            px: 3,
            borderRadius: 1,
            backgroundColor: "#fff",
            width: '100%',
          }}
        >
          <Typography variant="h6" sx={primaryGradientText}>Progress</Typography>
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={calculateProgress()} sx={{ height: 8, borderRadius: 2, }} />
          </Box>
          <Typography variant="h6" sx={primaryGradientText}>{calculateProgress()}%</Typography>
        </Stack>
        <Box>
          <Button variant="contained" sx={{ whiteSpace: 'nowrap' }}>End Session</Button>
        </Box>
      </Stack>
      <QuestionView question={currentQuestion} answerStatus={currentAnswerStatus} />
    </Container>
  )
}

export default observer(PracticeSession);