import { Button, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CoursesIcon from '../../src/assets/icons/courses.svg';
import MockExamIcon from '../../src/assets/icons/exam.svg';
import FlashCardsIcon from '../../src/assets/icons/flash-cards.svg';
import NotesIcon from '../../src/assets/icons/notes.svg';
import PodcastsIcon from '../../src/assets/icons/podcasts.svg';
import QuestionBankIcon from '../../src/assets/icons/question-bank.svg';
import WelcomeImg from '../../src/assets/images/Welcome.png';
import PageWithNav from '../components/nav/PageWithNav';
import Card from '../components/util/Card';
import { primaryGradient, unstyledLink } from '../theme';

function Root() {
  return (
    <PageWithNav>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack
                sx={{
                  px: 5,
                  borderRadius: 2,
                  background: primaryGradient,
                }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h2" color="#fff">Welcome, Sajjaad!</Typography>
                <img src={WelcomeImg} height={140} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Question Bank"
                primary
                action={
                  <Button variant="contained" color="secondary">
                    <Link style={unstyledLink} to="practice-session">
                      Start Questions
                    </Link>
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
                action={<Button variant="contained" color="secondary">Learn</Button>}
                icon={<img src={FlashCardsIcon} width={64} />}
              >
                Interactive, efficient flashcard revision
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Podcasts"
                action={<Button variant="contained">Listen</Button>}
                icon={<img src={PodcastsIcon} width={64} />}
              >
                Insightful discussions, clinical gems
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="My Courses"
                action={<Button variant="contained">View</Button>}
                icon={<img src={CoursesIcon} width={64} />}
              >
                Explore your registered courses and webinars
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Mock Examination"
                action={<Button variant="contained">Start Mock</Button>}
                icon={<img src={MockExamIcon} width={64} />}
              >
                Challenge yourself through realistic exam simulations
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Notes"
                action={<Button variant="contained">View</Button>}
                icon={<img src={NotesIcon} width={64} />}
              >
                AI-generated notes for mastering medical knowledge efficiently
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWithNav>
  );
}

export default Root;