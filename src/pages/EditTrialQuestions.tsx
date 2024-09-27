import { Add } from "@mui/icons-material"
import {
  Button,
  Stack,
  Typography
} from "@mui/material"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Page from "../components/nav/Page"
import EditQuestionsTable from "../components/questions/EditQuestionsTable"
import { LoadingWrapper } from "../components/util/LoadingWrapper"
import Unauthorised from "../components/util/Unauthorised"
import { Question } from "../models/Question"
import { useServiceProvider } from "../services/ServiceProvider"
import { QuestionModelUI } from "../stores/questionsStore"
import { primaryGradientText } from "../theme"

function EditQuestions() {
  const { questionsStore, accountStore: { hasAdminAccess } } = useServiceProvider();
  const [questions, setQuestions] = useState<QuestionModelUI[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navigateToAuthorPortal = () => {
    navigate("/author-portal");
  }

  const navigateToQuestionCreation = () => {
    questionsStore.setPreviewQuestion(new Question());
    navigate("/create-question?isTrial=true");
  }

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    setLoading(true);
    const trialQuestions = await questionsStore.getTrialQuestions();
    setQuestions(trialQuestions);
    setLoading(false);
  }

  if (!hasAdminAccess) return <Unauthorised />;

  return (
    <Page>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Button variant="contained" onClick={navigateToAuthorPortal}>Author Portal</Button>
        <Button variant="contained" onClick={navigateToQuestionCreation}><Add />Add Question</Button>
      </Stack>
      <Typography style={primaryGradientText} variant="h3" mb={3}>Edit Trial Questions</Typography>
      <LoadingWrapper isLoading={loading}>
        {
          questions.length > 0 ?
            <EditQuestionsTable questions={questions} isTrial /> :
            <Typography variant="h6">No questions in selected speciality and question bank</Typography>
        }
      </LoadingWrapper>
    </Page>

  )
}

export default observer(EditQuestions);