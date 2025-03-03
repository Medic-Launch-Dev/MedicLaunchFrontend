import { Button, Grid, Card as MuiCard, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import CoursesIcon from '../../src/assets/icons/courses.svg';
import MockExamIcon from '../../src/assets/icons/exam.svg';
import FlashCardsIcon from '../../src/assets/icons/flash-cards.svg';
import NotesIcon from '../../src/assets/icons/notes.svg';
import PodcastsIcon from '../../src/assets/icons/podcasts.svg';
import QuestionBankIcon from '../../src/assets/icons/question-bank.svg';
import WelcomeImg from '../../src/assets/images/Welcome.png';
import ExamDate from '../components/home/ExamDate';
import ProgressPieChart from '../components/home/ProgressPieChart';
import Page from '../components/nav/Page';
import SpecialityAnalyserChart from '../components/specialityAnalyser/SpecialityAnalyserChart';
import Card from '../components/util/Card';
import LinkButton from '../components/util/LinkButton';
import { useServiceProvider } from '../services/ServiceProvider';
import { primaryGradient, primaryGradientText, unstyledLink } from '../theme';

function Root() {
  const { accountStore: { myProfile, isSubscribed }, questionsStore } = useServiceProvider();
  const navigate = useNavigate();

  async function handleStartFreeTrial() {
    await questionsStore.startFreeTrial();
    navigate("/free-trial");
  }

  return (
    <Page withNav fullWidth>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={2}>
            {
              !isSubscribed &&
              <Grid item xs={12}>
                <MuiCard>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" sx={{ ...primaryGradientText }}>Subscribe to unlock all features</Typography>
                    <LinkButton to="subscribe">Subscribe</LinkButton>
                  </Stack>
                </MuiCard>
              </Grid>
            }
            <Grid item xs={12}>
              <Stack
                sx={{
                  px: { xs: 2, md: 5 },
                  borderRadius: 2,
                  background: primaryGradient,
                }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h2" color="#fff">Welcome, {myProfile?.firstName}!</Typography>
                <img src={WelcomeImg} height={140} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Question Bank"
                primary
                action={
                  isSubscribed ?
                    <Link style={unstyledLink} to="create-session">
                      <Button variant="contained" color="secondary">
                        Start Questions
                      </Button>
                    </Link>
                    :
                    <Button variant="contained" color="secondary" onClick={handleStartFreeTrial}>
                      Start Free Trial
                    </Button>
                }
                icon={<img src={QuestionBankIcon} width={64} />}
              >
                Select specialities and filter questions in your personal portal
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Flash Cards"
                primary
                action={
                  <Link style={unstyledLink} to={isSubscribed ? "flash-cards" : "subscribe"}>
                    <Button variant="contained" color="secondary">
                      Learn
                    </Button>
                  </Link>
                }
                icon={<img src={FlashCardsIcon} width={64} />}
              >
                Interactive, efficient flashcard revision
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Mock Examination"
                action={
                  <Link style={unstyledLink} to={isSubscribed ? "select-mock" : "subscribe"}>
                    <Button variant="contained">Start Mock</Button>
                  </Link>
                }
                icon={<img src={MockExamIcon} width={64} />}
              >
                Challenge yourself through realistic exam simulations
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Notes"
                action={
                  <Link style={unstyledLink} to={isSubscribed ? "revision-notes" : "subscribe"}>
                    <Button variant="contained" color="primary">
                      View
                    </Button>
                  </Link>
                }
                icon={<img src={NotesIcon} width={64} />}
              >
                Create notes to help you master medical knowledge efficiently
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Podcasts"
                action={<LinkButton to="https://www.youtube.com/playlist?list=PL7lBz-Tdd6BVN7QHSe8quEkxa4JlA5WTL" target='_blank'>Listen</LinkButton>}
                icon={<img src={PodcastsIcon} width={64} />}
              >
                Insightful discussions, clinical gems
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Courses"
                action={<LinkButton to="https://www.mediclaunch.com/courses" target='_blank'>See Courses</LinkButton>}
                icon={<img src={CoursesIcon} width={64} />}
              >
                Explore courses and webinars tailored to expand your skills and knowledge
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card title="My UKMLA Progress">
                <Stack alignItems="center" mt={2} mb={-1}>
                  <ProgressPieChart />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ExamDate />
            </Grid>
          </Grid>
          <SpecialityAnalyserChart />
        </Grid>
      </Grid>
    </Page>
  );
}

export default observer(Root);