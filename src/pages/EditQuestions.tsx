import { Add } from "@mui/icons-material"
import {
	Button,
	Chip,
	Container,
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
import { useEffect } from "react"
import TextSelect from "../components/util/TextSelect"
import { useServiceProvider } from "../services/ServiceProvider"
import { primaryGradientText } from "../theme"

function EditQuestions() {
	const { questionsStore } = useServiceProvider();

	useEffect(() => {
		// questionsStore.getSpecialities()
		// 	.then(specialities => {
		// 		const questionPromises = specialities.map(speciality => questionsStore.getSpecialityQuestions(speciality.id));
		// 		return Promise.all(questionPromises);
		// 	})
		// 	.then(allQuestions => console.log('Questions for each specialty:', allQuestions))
	}, [])

	const EXAMPLES = [{
		questionCode: "MLAN01",
		status: "pending",
		speciality: "Anaesthetics",
		questionNumber: 1,
		question: "A 30-year-old female presents with severe acne vulgaris that has been unresponsive...",
		idx: 69
	},
	{
		questionCode: "MLAN01",
		status: "pending",
		speciality: "Anaesthetics",
		questionNumber: 1,
		question: "A 30-year-old female presents with severe acne vulgaris that has been unresponsive...",
		idx: 69
	}]

	function getStatusChip(status?: string) {
		if (status === "approved") return <Chip label="Approved" sx={{ backgroundColor: "#A4E29F" }} />
		if (status === "not approved") return <Chip label="Not Approved" sx={{ backgroundColor: "#FFABAB" }} />
		return <Chip label="Pending" />
	}

	const questionBankOptions = ["Practice questions", "Mock 1", "Mock 2"];
	const specialityOptions = ["Practice questions", "Mock 1", "Mock 2"];


	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
				<Button variant="contained">Author Portal</Button>
				<Button variant="contained"><Add /> Add Question</Button>
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
									options={specialityOptions.map(option => ({ value: option }))}
									setSelected={() => { }}
								/>
							</Grid>
						</Grid>
					</Stack>
				</Grid>
			</Grid>

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
						{EXAMPLES.map((p, index) => {
							return (
								<TableRow key={index}>
									<TableCell component="th" scope="row">{p.questionCode}</TableCell>
									<TableCell>
										{getStatusChip(p.status)}
									</TableCell>
									<TableCell>{p.speciality}</TableCell>
									<TableCell>{p.questionNumber}</TableCell>
									<TableCell sx={{ width: 349 }}>{p.question}</TableCell>
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

		</Container>
	)
}

export default observer(EditQuestions);