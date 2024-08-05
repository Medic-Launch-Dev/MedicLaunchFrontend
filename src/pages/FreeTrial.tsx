import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import Page from "../components/nav/Page";
import QuestionView from "../components/practiceSession/QuestionView";
import LinkButton from "../components/util/LinkButton";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

function PracticeSession() {
  const { questionsStore } = useServiceProvider();

  function calculateProgress() {
    if (!questionsStore.questions) return 0;
    const totalAnswered = questionsStore.correctAnswers + questionsStore.incorrectAnswers;
    return Math.ceil((totalAnswered / questionsStore.questions.length) * 100);
  }

  if (!questionsStore.questions.length) return <Navigate to="/" />;

  const progressBarMarkup = (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
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
        <LinkButton to="/subscribe" sx={{ whiteSpace: 'nowrap' }}>
          Subscribe
        </LinkButton>
      </Box>
    </Stack>
  );

  return (
    <Page>
      <Box mb={3}>
        {progressBarMarkup}
      </Box>
      <QuestionView question={questionsStore.currentQuestion} isFreeTrial />
    </Page>
  )
}

export default observer(PracticeSession);