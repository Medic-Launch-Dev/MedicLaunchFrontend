import { Launch, Lock } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import CoursesIcon from '../../src/assets/icons/courses.svg';
import PeopleIcon from '../../src/assets/icons/people.png';
import WhiteboardIcon from '../../src/assets/icons/whiteboard.png';
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
import { primaryGradient, unstyledLink } from '../theme';

function Root() {
  const { accountStore: { myProfile, hasStudentAccess } } = useServiceProvider();

  return (
    <Page withNav fullWidth>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={2}>
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
                <img src={WelcomeImg} height={130} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Question Bank"
                primary
                action={
                  <Link style={unstyledLink} to={hasStudentAccess ? "create-session" : "trial-expired"} >
                    <Button variant="contained" color="secondary">
                      Start Questions
                    </Button>
                  </Link>
                }
                icon={<img src={QuestionBankIcon} width={48} />}
              >
                Select specialities and filter questions in your personal portal
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Flash Cards"
                primary
                action={
                  <Link style={unstyledLink} to={hasStudentAccess ? "flash-cards" : "trial-expired"}>
                    <Button variant="contained" color="secondary">
                      Learn
                    </Button>
                  </Link>
                }
                icon={<img src={FlashCardsIcon} width={48} />}
              >
                Interactive, efficient flashcard revision
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Mock Examination"
                action={
                  myProfile?.isOnFreeTrial ?
                    <LinkButton to="subscribe" startIcon={<Lock />}>
                      Subscribe to unlock
                    </LinkButton>
                    :
                    <Link style={unstyledLink} to={hasStudentAccess ? "select-mock" : "trial-expired"}>
                      <Button variant="contained">Start Mock</Button>
                    </Link>
                }
                icon={<img src={MockExamIcon} width={48} />}
              >
                Challenge yourself through realistic exam simulations
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Notes"
                action={
                  <Link style={unstyledLink} to={hasStudentAccess ? "revision-notes" : "trial-expired"}>
                    <Button variant="contained" color="primary">
                      View
                    </Button>
                  </Link>
                }
                icon={<img src={NotesIcon} width={48} />}
              >
                Create notes to help you master medical knowledge efficiently
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Podcasts"
                action={
                  <LinkButton
                    to="https://www.youtube.com/playlist?list=PL7lBz-Tdd6BVN7QHSe8quEkxa4JlA5WTL"
                    target='_blank'
                    endIcon={<Launch />}
                  >
                    Listen
                  </LinkButton>
                }
                icon={<img src={PodcastsIcon} width={48} />}
              >
                Insightful discussions, clinical gems
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Courses"
                action={
                  <LinkButton
                    to="https://www.mediclaunch.com/courses"
                    target='_blank'
                    endIcon={<Launch />}
                  >
                    See Courses
                  </LinkButton>}
                icon={<img src={CoursesIcon} width={48} />}
              >
                Explore courses and webinars tailored to expand
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Stack sx={{ height: "100%" }} gap={2}>
            <Grid container spacing={2} sx={{ flexShrink: 0 }}>
              <Grid item xs={12} sm={6}>
                <Card title="My UKMLA Progress">
                  <Stack alignItems="center" mb={-4}>
                    <ProgressPieChart />
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ExamDate />
              </Grid>
            </Grid>
            <div style={{ flexGrow: 1 }}>
              <SpecialityAnalyserChart />
            </div>
            <Grid container sx={{ flexShrink: 0 }} spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card
                  title="Whiteboard Medicine"
                  action={
                    <LinkButton
                      to="https://www.youtube.com/playlist?list=PL7lBz-Tdd6BXbmZk6T-vTCjc7Br7Mi1Pm"
                      target='_blank'
                      endIcon={<Launch />}
                    >
                      Watch
                    </LinkButton>
                  }
                  icon={<img src={WhiteboardIcon} width={48} />}
                >
                  Concise visual tutorials on key clinical topics
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  title="Circle Community"
                  action={
                    <LinkButton
                      to="https://medic-launch.circle.so/"
                      target='_blank'
                      endIcon={<Launch />}
                    >
                      View
                    </LinkButton>
                  }
                  icon={<img src={PeopleIcon} width={48} />}
                >
                  Join our supportive community of future doctors
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
}

export default observer(Root);