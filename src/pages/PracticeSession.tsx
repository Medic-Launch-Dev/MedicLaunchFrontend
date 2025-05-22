import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Page from "../components/nav/Page";
import QuestionView from "../components/practiceSession/QuestionView";
import LinkButton from "../components/util/LinkButton";
import { useServiceProvider } from "../services/ServiceProvider";
import { TimerState } from "../stores/practiceStore";
import { primaryGradientText } from "../theme";

function PracticeSession() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const isMock = searchParams.get("isMock");
  const inReview = searchParams.get("inReview");
  const { questionsStore, practiceStore, accountStore } = useServiceProvider();
  const { hasStudentAccess, isLoading } = accountStore;

  function calculateProgress() {
    if (!questionsStore.questions) return 0;
    const totalAnswered = questionsStore.correctAnswers + questionsStore.incorrectAnswers;
    return Math.ceil((totalAnswered / questionsStore.questions.length) * 100);
  }

  function handleClickEndSession() {
    if (isMock && questionsStore.flaggedQuestionsExist()) {
      setOpen(true)
      return;
    }

    navigate("/review-session");
  }

  useEffect(() => {
    if (practiceStore.examTimerState === TimerState.STOPPED) {
      practiceStore.startTimer();
    }
    return () => {
      practiceStore.resetTimer();
    };
  }, []);

  if (!isLoading && hasStudentAccess === false) return <Navigate to="/trial-expired" />;
  if (!questionsStore.questions.length) return <Navigate to="/create-session" />;

  const inReviewMarkup = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <LinkButton to="/" sx={{ whiteSpace: 'nowrap' }}>
          Study Portal
        </LinkButton>
        <LinkButton to="/review-session" sx={{ whiteSpace: 'nowrap' }}>
          Back to overview
        </LinkButton>
      </Stack>
      <Typography variant="h3" sx={primaryGradientText}>Review Question {questionsStore.currentQuestion?.questionCode}</Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ visibility: "hidden" }}>
        <LinkButton to="/" sx={{ whiteSpace: 'nowrap' }}>
          Study Portal
        </LinkButton>
        <LinkButton to="/review-session" sx={{ whiteSpace: 'nowrap' }}>
          Back to overview
        </LinkButton>
      </Stack>
    </Stack>
  );

  const progressBarMarkup = (
    <Stack direction={{ xs: "column-reverse", md: "row" }} spacing={2} alignItems={{ xs: "end", md: "center" }} justifyContent="center">
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
        <Button variant="contained" onClick={handleClickEndSession} sx={{ whiteSpace: 'nowrap' }}>
          End Session
        </Button>
      </Box>
    </Stack>
  );

  const confirmDialogMarkup = (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>There's Still Some Flagged Questions 🛑</DialogTitle>
      <DialogContent>
        <Typography>Wait! Before you go…</Typography>
        <Typography>You have questions that are still flagged. Are you sure you want to end the exam session?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={() => navigate("/review-session")}>End Session</Button>
        <Button variant="contained" onClick={() => setOpen(false)}>Stay on Page</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Page>
      <Box mb={3}>
        {inReview ? inReviewMarkup : progressBarMarkup}
      </Box>
      <QuestionView question={questionsStore.currentQuestion} isMock={Boolean(isMock)} />
      {confirmDialogMarkup}
    </Page>
  )
}

export default observer(PracticeSession);