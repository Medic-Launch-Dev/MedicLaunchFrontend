import { Box, Container, LinearProgress, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import QuestionView from "../components/practiceSession/QuestionView";
import LinkButton from "../components/util/LinkButton";
import { useServiceProvider } from "../services/ServiceProvider";
import { TimerState } from "../stores/practiceStore";
import { primaryGradientText } from "../theme";

function PracticeSession() {
  const { questionsStore, practiceStore } = useServiceProvider();

  function calculateProgress() {
    if (!questionsStore.questions) return 0;
    const totalAnswered = questionsStore.correctAnswers + questionsStore.incorrectAnswers;
    return Math.ceil((totalAnswered / questionsStore.questions.length) * 100);
  }

  useEffect(() => {
    if (practiceStore.examTimerState === TimerState.STOPPED) {
      practiceStore.startTimer();
    }
    return () => {
      practiceStore.resetTimer();
    };
  }, []);

  if (!questionsStore.questions.length) return <Navigate to="/create-session" />

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
      <QuestionView question={questionsStore.currentQuestion} withTimer={true} />
    </Container>
  )
}

export default observer(PracticeSession);