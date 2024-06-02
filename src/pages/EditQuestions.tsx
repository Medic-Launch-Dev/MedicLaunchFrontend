import { Add } from "@mui/icons-material"
import {
	Button,
	Chip,
	Grid,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Page from "../components/nav/Page"
import { LoadingWrapper } from "../components/util/LoadingWrapper"
import TextSelect from "../components/util/TextSelect"
import { Question } from "../models/Question"
import Speciality from "../models/Speciality"
import { useServiceProvider } from "../services/ServiceProvider"
import { QuestionModelUI } from "../stores/questionsStore"
import { primaryGradientText } from "../theme"

function EditQuestions() {
	let [searchParams] = useSearchParams();
	const defaultSpeciality = searchParams.get('speciality');

	const { questionsStore } = useServiceProvider();
	const [specialities, setSpecialitiesList] = useState<Speciality[]>([]);
	const [selectedSpeciality, setSelectedSpeciality] = useState<string>();
	const [questions, setQuestions] = useState<QuestionModelUI[]>([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const [selectedQuestionBank, setSelectedQuestionBank] = useState<string>("General");

	function getStatusChip(status?: string) {
		if (status === "approved") return <Chip label="Approved" sx={{ backgroundColor: "#A4E29F" }} />
		if (status === "not approved") return <Chip label="Not Approved" sx={{ backgroundColor: "#FFABAB" }} />
		return <Chip label="Pending" />
	}

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

	const getQuestionTextWithoutHtml = (questionText: string) => {
		const tempContainer = document.createElement('div');
		tempContainer.innerHTML = questionText;
		return tempContainer.innerText;
	}

	useEffect(() => {
		questionsStore.getSpecialities()
			.then((specialities) => {
				setSpecialitiesList(specialities);
				if (defaultSpeciality) setSelectedSpeciality(defaultSpeciality);
			})
			.catch(e => {
				console.error(e);
				// showSnackbar('Failed to get specialities', 'error');
			});
	}, []);

	useEffect(() => {
		// set question bank to General, PaperOneMockExam, or PaperTwoMockExam
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



	function handleClickEdit(question: QuestionModelUI) {
		questionsStore.setPreviewQuestion(question);
		navigate("/edit-question")
	}

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
									defaultValue={defaultSpeciality}
									selected={selectedSpeciality}
									setSelected={setSelectedSpeciality}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextSelect
									label="Question bank"
									defaultValue={questionBankOptions[0]}
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
					questions.length > 0 ? (
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell sx={{ width: 160 }}>Question Code</TableCell>
										<TableCell>Status</TableCell>
										<TableCell>Speciality</TableCell>
										<TableCell>Question #</TableCell>
										<TableCell sx={{ width: 320 }}>Question</TableCell>
										<TableCell sx={{ paddingLeft: "32px" }}>Edit</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{questions.map((p, index) => {
										return (
											<TableRow key={index}>
												<TableCell component="th" scope="row">{p.questionCode}</TableCell>
												<TableCell>
													{getStatusChip(p.isSubmitted ? "Submitted" : "Draft")}
												</TableCell>
												<TableCell>{p.specialityName}</TableCell>
												<TableCell>{index + 1}</TableCell>
												<TableCell sx={{ width: 500 }}>
													<Typography sx={{ height: 64, overflowY: 'hidden' }}>
														{getQuestionTextWithoutHtml(p.questionText)}
													</Typography>
												</TableCell>
												<TableCell>
													<Button
														variant="contained"
														sx={{
															fontWeight: 500,
															fontSize: "14px",
															width: "4px",
															height: "32px",
															paddingX: "0px",
															paddingY: "20px"
														}}
														onClick={() => handleClickEdit(p)}
													>
														Edit
													</Button>
												</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</TableContainer>
					) : <Typography variant="h6">No questions in selected speciality and question bank</Typography>
				}
			</LoadingWrapper>

		</Page>

	)
}

export default observer(EditQuestions);