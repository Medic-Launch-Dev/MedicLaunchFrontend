import { Box, Container, LinearProgress, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import QuestionView from "../components/practiceSession/QuestionView";
import LinkButton from "../components/util/LinkButton";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

function PracticeSession() {
  const { questionsStore } = useServiceProvider();
  const currentAnswerStatus = questionsStore.answers[questionsStore.currentQuestionIdx].result;

  function calculateProgress() {
    const totalAnswered = questionsStore.getAnswerTotal("incorrect") + questionsStore.getAnswerTotal("correct");

    return Math.ceil((totalAnswered / questionsStore.answers.length) * 100);
  }

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
          <LinkButton to="/review-session" sx={{ whiteSpace: 'nowrap' }}>
            End Session
          </LinkButton>
        </Box>
      </Stack>
      <QuestionView question={questionsStore.currentQuestion} answerStatus={currentAnswerStatus} />
    </Container>
  )
}

export default observer(PracticeSession);