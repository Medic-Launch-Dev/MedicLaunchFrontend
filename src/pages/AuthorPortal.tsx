import { Button, Grid, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import CoursesIcon from '../../src/assets/icons/courses.svg';
import PodcastsIcon from '../../src/assets/icons/podcasts.svg';
import QuestionBankIcon from '../../src/assets/icons/question-bank.svg';
import WelcomeImg from '../../src/assets/images/Welcome.png';
import Page from '../components/nav/Page';
import Card from '../components/util/Card';
import LinkButton from '../components/util/LinkButton';
import Unauthorised from '../components/util/Unauthorised';
import { useServiceProvider } from '../services/ServiceProvider';
import { primaryGradient } from '../theme';

function AuthorPortal() {
  const { accountStore: { hasAuthorAccess, hasFlashcardAuthorAccess, hasQuestionAuthorAccess, hasAdminAccess } } = useServiceProvider();

  if (!hasAuthorAccess) return <Unauthorised />;

  return (
    <Page withNav fullWidth>
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
                spacing={7}
              >
                <Typography variant="h2" color="#fff">Welcome to your Question Writing Dashboard, Sajjaad</Typography>
                <img src={WelcomeImg} height={140} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Author Profile"
                primary
                action={
                  <LinkButton variant="contained" color="secondary" to="/my-profile">
                    Access Profile
                  </LinkButton>
                }
                icon={<img src={QuestionBankIcon} width={64} />}
              >
                Personalise your profile and preferences effortlessly
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Question Writing Guide"
                action={<Button variant="contained" disabled>Coming soon...</Button>}
                icon={<img src={PodcastsIcon} width={64} />}
              >
                Master question creation with our guide
              </Card>
            </Grid>
            {
              hasQuestionAuthorAccess &&
              <Grid item xs={12} sm={6}>
                <Card
                  title="Review all questions"
                  action={
                    <Link to="/edit-questions">
                      <Button variant="contained">View questions</Button>
                    </Link>
                  }
                  icon={<img src={CoursesIcon} width={64} />}
                >
                  View your historic questions and edit here
                </Card>
              </Grid>
            }
            {
              hasFlashcardAuthorAccess &&
              <Grid item xs={12} sm={6}>
                <Card
                  title="Review flashcards"
                  action={
                    <Link to="/edit-flash-cards">
                      <Button variant="contained">View flashcards</Button>
                    </Link>
                  }
                  icon={<img src={CoursesIcon} width={64} />}
                >
                  View your historic flashcards and edit here
                </Card>
              </Grid>
            }
            {
              hasQuestionAuthorAccess &&
              <Grid item xs={12} sm={6}>
                <Card
                  title="Review clinical companion"
                  action={
                    <Link to="/edit-clinical-companion-lesson">
                      <Button variant="contained">View lessons</Button>
                    </Link>
                  }
                  icon={<img src={CoursesIcon} width={64} />}
                >
                  View your clinical companion lessons and edit them here
                </Card>
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}

export default observer(AuthorPortal);