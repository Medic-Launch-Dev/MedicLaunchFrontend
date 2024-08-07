import { Grid, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AnalyticsIcon from '../../src/assets/icons/analytics.svg';
import CorrectIcon from '../../src/assets/icons/correct.svg';
import QuestionsIcon from '../../src/assets/icons/questions.svg';
import RestartIcon from '../../src/assets/icons/restart.svg';
import Page from "../components/nav/Page";
import ReviewQuestionsTable from "../components/review/ReviewQuestionsTable";
import ReviewCard from "../components/review/ReviewStatCard";
import LinkButton from "../components/util/LinkButton";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText, unstyledLink } from "../theme";

function ReviewSession() {
  const { questionsStore } = useServiceProvider();
  const { correctAnswers, incorrectAnswers, totalQuestions } = questionsStore;
  const totalAnswers = correctAnswers + incorrectAnswers;
  const score = totalAnswers === 0 ? totalAnswers : Math.ceil((correctAnswers / totalAnswers) * 100);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.returnValue = 'something';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Page sx={{ pt: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <LinkButton to="/">
          Study Portal
        </LinkButton>
        <Typography variant="h1" sx={primaryGradientText} align="center">
          Review Questions
        </Typography>
        <LinkButton to="/" sx={{ visibility: "hidden" }}>
          Study Portal
        </LinkButton>
      </Stack>

      <Grid container spacing={2}>
        <Grid item lg={3}>
          <ReviewCard
            title="Questions Completed"
            subtitle={`${correctAnswers + incorrectAnswers}/${totalQuestions}`}
            icon={<img src={QuestionsIcon} width={48} />}
          />
        </Grid>
        <Grid item lg={3}>
          <ReviewCard
            title="Correct"
            subtitle={`${score}%`}
            icon={<img src={CorrectIcon} width={48} />}
          />
        </Grid>
        <Grid item lg={3}>
          <Link style={unstyledLink} to="/speciality-analyser">
            <ReviewCard
              primary
              title="View Speciality Analytics"
              icon={<img src={AnalyticsIcon} width={48} />}
            />
          </Link>
        </Grid>
        <Grid item lg={3}>
          <Link style={unstyledLink} to="/create-session">
            <ReviewCard
              primary
              title="Continue Questions"
              icon={<img src={RestartIcon} width={48} />}
            />
          </Link>
        </Grid>

        <Grid item lg={12}>
          <ReviewQuestionsTable />
        </Grid>
      </Grid>
    </Page>
  )
};

export default observer(ReviewSession);