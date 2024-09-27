import { Add } from "@mui/icons-material"
import {
	Button,
	Grid,
	Stack,
	Typography
} from "@mui/material"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Page from "../components/nav/Page"
import EditQuestionsTable from "../components/questions/EditQuestionsTable"
import { LoadingWrapper } from "../components/util/LoadingWrapper"
import TextSelect from "../components/util/TextSelect"
import Unauthorised from "../components/util/Unauthorised"
import { Question } from "../models/Question"
import Speciality from "../models/Speciality"
import { useServiceProvider } from "../services/ServiceProvider"
import { QuestionModelUI } from "../stores/questionsStore"
import { primaryGradientText } from "../theme"

function EditQuestions() {
	let [searchParams] = useSearchParams();
	const defaultSpeciality = searchParams.get('speciality');

	const { questionsStore, accountStore: { hasQuestionAuthorAccess } } = useServiceProvider();
	const [specialities, setSpecialitiesList] = useState<Speciality[]>([]);
	const [selectedSpeciality, setSelectedSpeciality] = useState<string>();
	const [questions, setQuestions] = useState<QuestionModelUI[]>([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const [selectedQuestionBank, setSelectedQuestionBank] = useState<string>("General");
	const questionBankOptions = ["General", "Mock Paper 1", "Mock Paper 2"];

	const loadQuestions = async (specialityId: string, questionBank: string) => {
		setLoading(true);
		const questions = await questionsStore.getSpecialityQuestions(specialityId, questionBank);
		setQuestions(questions);
		setLoading(false);
	}

	const navigateToAuthorPortal = () => {
		navigate("/author-portal");
	}

	const navigateToQuestionCreation = () => {
		questionsStore.setPreviewQuestion(new Question());
		navigate("/create-question");
	}

	useEffect(() => {
		questionsStore.getSpecialities()
			.then((specialities) => {
				setSpecialitiesList(specialities);
				if (defaultSpeciality) setSelectedSpeciality(defaultSpeciality);
				else setSelectedSpeciality(specialities[0].id);
			})
			.catch(e => {
				console.error(e);
				// showSnackbar('Failed to get specialities', 'error');
			});
	}, []);

	useEffect(() => {
		let questionBank = "General";
		switch (selectedQuestionBank) {
			case "Mock Paper 1":
				questionBank = "PaperOneMockExam";
				break;
			case "Mock Paper 2":
				questionBank = "PaperTwoMockExam";
				break;
			default:
				questionBank = "General";
		}
		if (selectedSpeciality) loadQuestions(selectedSpeciality, questionBank);
	}, [selectedSpeciality, selectedQuestionBank])

	if (!hasQuestionAuthorAccess) return <Unauthorised />;

	return (
		<Page>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
				<Button variant="contained" onClick={navigateToAuthorPortal}>Author Portal</Button>
				<Button variant="contained" onClick={navigateToQuestionCreation}><Add /> Add Question</Button>
			</Stack>

			<Typography style={primaryGradientText} variant="h3" mb={3}>Edit Questions</Typography>

			<Grid container spacing={3} mb={4}>
				<Grid item xs={8}>
					<Stack direction="row" alignItems="center">
						<Grid container columnSpacing={2} >
							<Grid item xs={6} sx={{ fontWeight: "bold" }}>
								<TextSelect
									label="Speciality"
									options={specialities.map(speciality => ({
										value: speciality.id,
										displayText: speciality.name
									}))}
									selected={selectedSpeciality || ""}
									setSelected={setSelectedSpeciality}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextSelect
									label="Question bank"
									options={questionBankOptions.map(option => ({ value: option }))}
									selected={selectedQuestionBank}
									setSelected={setSelectedQuestionBank}
								/>
							</Grid>
						</Grid>
					</Stack>
				</Grid>
			</Grid>
			<LoadingWrapper isLoading={loading}>
				{
					questions.length > 0 ?
						<EditQuestionsTable questions={questions} /> :
						<Typography variant="h6">No questions in selected speciality and question bank</Typography>
				}
			</LoadingWrapper>
		</Page>

	)
}

export default observer(EditQuestions);