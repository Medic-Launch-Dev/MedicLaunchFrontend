import { Add } from "@mui/icons-material"
import {
	Button,
	Chip,
	Container,
	Grid,
	Select,
	SelectChangeEvent,
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
import TextSelect from "../components/util/TextSelect"
import { useServiceProvider } from "../services/ServiceProvider"
import { primaryGradientText } from "../theme"
import Speciality from "../models/Speciality"
import { QuestionModelUI } from "../stores/questionsStore"
import { useNavigate } from "react-router-dom";
import { LoadingWrapper } from "../components/util/LoadingWrapper"
import parse from 'html-react-parser';

function EditQuestions() {
	const { questionsStore } = useServiceProvider();
	const [specialities, setSpecialitiesList] = useState<Speciality[]>([]);

	const [questions, setQuestions] = useState<QuestionModelUI[]>([]);

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	function getStatusChip(status?: string) {
		if (status === "approved") return <Chip label="Approved" sx={{ backgroundColor: "#A4E29F" }} />
		if (status === "not approved") return <Chip label="Not Approved" sx={{ backgroundColor: "#FFABAB" }} />
		return <Chip label="Pending" />
	}

	const questionBankOptions = ["Practice questions", "Mock 1", "Mock 2"];

	const loadQuestions = async (specialityId: string) => {
		setLoading(true);
		const questions = await questionsStore.getSpecialityQuestions(specialityId);
		setQuestions(questions);
		setLoading(false);
	}

	const navigateToAuthorPortal = () => {
		navigate("/");
	}

	const navigateToQuestionCreation = () => {
		navigate("/create-question");
	}

	const getQuestionTextWithoutHtml = (questionText: string) => {
		const text = parse(questionText);
		return text;
	}
		
	useEffect(() => {
		questionsStore.getSpecialities()
		.then((specialities) => {
			setSpecialitiesList(specialities);
		})
		.catch(e => {
			console.error(e);
			// showSnackbar('Failed to get specialities', 'error');
		});
	}, []);

	return (
		<Container>
		<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
			<Button variant="contained" onClick={navigateToAuthorPortal}>Author Portal</Button>
			<Button variant="contained" onClick={navigateToQuestionCreation}><Add /> Add Question</Button>
		</Stack>

		<Typography style={primaryGradientText} variant="h3" mb={3}>Edit Questions</Typography>

		<Grid container spacing={3} mb={4}>
			<Grid item xs={8}>
				<Stack direction="row" alignItems="center">
					<Grid container columnSpacing={2} >
						<Grid item xs={6}>
						<TextSelect
							label="Question bank"
							options={questionBankOptions.map(option => ({ value: option }))}
							setSelected={() => { }}
						/>
						</Grid>
						<Grid item xs={6} sx={{ fontWeight: "bold" }}>
						<TextSelect
							label="Speciality"
							defaultValue={specialities[0]?.id}
							options={specialities.map(speciality => ({
								value: speciality.id,
								displayText: speciality.name
							}))}
							setSelected={() => { }}
							onChange={(e) => loadQuestions(e.target.value as string)}
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
									<TableCell sx={{ width: 349 }}>
										<span>
											{getQuestionTextWithoutHtml(p.questionText)}
										</span>
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

	</Container>
	
	)
}

export default observer(EditQuestions);