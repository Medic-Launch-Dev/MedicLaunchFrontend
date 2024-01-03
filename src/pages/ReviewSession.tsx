import { Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AnalyticsIcon from '../../src/assets/icons/analytics.svg';
import CorrectIcon from '../../src/assets/icons/correct.svg';
import QuestionsIcon from '../../src/assets/icons/questions.svg';
import RestartIcon from '../../src/assets/icons/restart.svg';
import ReviewQuestionsTable from "../components/review/ReviewQuestionsTable";
import ReviewCard from "../components/review/ReviewStatCard";
import LinkButton from "../components/util/LinkButton";
import questionsStore from "../stores/questionsStore";
import { primaryGradientText, unstyledLink } from "../theme";

export default function ReviewSession() {
  const totalQuestions = questionsStore.questions.length;
  const correctAnswers = questionsStore.getAnswerTotal("correct");
  const incorrectAnswers = questionsStore.getAnswerTotal("incorrect");
  const totalAnswers = correctAnswers + incorrectAnswers;
  const score = Math.ceil((correctAnswers / totalAnswers) * 100);

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <LinkButton to="/">
          Study Portal
        </LinkButton>
        <Typography variant="h1" sx={primaryGradientText} align="center">
          Session Overview
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
          <Link style={unstyledLink} to="/">
            <ReviewCard
              primary
              title="View Specialty Analytics"
              icon={<img src={AnalyticsIcon} width={48} />}
            />
          </Link>
        </Grid>
        <Grid item lg={3}>
          <ReviewCard
            primary
            title="Continue Questions"
            icon={<img src={RestartIcon} width={48} />}
          />
        </Grid>

        <Grid item lg={12}>
          <ReviewQuestionsTable />
        </Grid>
      </Grid>
    </Container>
  )
}