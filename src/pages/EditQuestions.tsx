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
    Typography, 
    styled
} from "@mui/material"
import { primaryGradient, primaryGradientText } from "../theme"
import TextSelect from "../components/util/TextSelect"

export default function EditQuestions() {

    const StatusChip = styled(Chip)({
        backgroundColor: "#FFABAB",
        fontWeight: 500,
        fontSize: "11px",
        borderRadius: 20,
        textAlign: "center",  
        padding: "0px",
        height: "24px"  
    })

    const buttonStyles = {
        primaryGradient, 
        fontWeight:500, 
        padding: 1.25, 
        width: "max-content",
        fontSize: "16px"
    }

    const tableContainerStyles = {
        backgroundColor: "#fff", 
        padding: 3, 
        borderRadius: 2,
        paddingBottom: 8
      }
    
    const tableHeadStyles = {
        fontSize: 14,
        fontWeight: 500,
        color: "#222",
        textAlign: "left"
    }

    const tableBodyStyles = {
        fontSize: "14px",
        fontWeight: 500,        
    }

    // Below variable is just to determine how the tablebody would look/be  
    const EXAMPLES = [{
        questionCode: "MLAN01",
        status: "Pending",
        speciality: "Anaesthetics",
        questionNumber: 1,
        question: "A 30-year-old female presents with severe acne vulgaris that has been unresponsive...",
        idx: 69
    },
    {
        questionCode: "MLAN01",
        status: "Pending",
        speciality: "Anaesthetics",
        questionNumber: 1,
        question: "A 30-year-old female presents with severe acne vulgaris that has been unresponsive...",
        idx: 69
    }]

    // Function below for pending, approved, not approved, they are capitalized,
    // please adjust capitalization

    function getStatusChip(status?: string){
        if (status === "approved") return <StatusChip label="Approved" sx={{backgroundColor:"#A4E29F"}} />
        if (status === "not approved") return <StatusChip label="Not Approved" sx={{backgroundColor:"#FFABAB"}}/>
        return <StatusChip label="Pending" />
    }
   

    return(
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Button sx={buttonStyles} variant="contained">Author Portal</Button>
                <Button sx={buttonStyles} variant="contained">+ Add Question</Button>
            </Stack>

            <Typography style={primaryGradientText} variant="h3" mb={3}>Edit Questions</Typography>

            <Grid container spacing={3} mb={8}>
                <Grid item xs={8}>
                    <Stack direction="row" alignItems="center">
                        <Grid container columnSpacing={2} >
                            <Grid item xs={5}>
                                <TextSelect
                                    label="Question bank"
                                    options={["Practice questions", "Mock 1", "Mock 2"]}
                                    setSelected={()=> { }}
                                    />
                            </Grid>
                            <Grid item xs={5} sx={{fontWeight: "bold"}}>
                                <TextSelect
                                    label="Speciality"
                                    options={["Cardioligy", "Dermatology", "Cancer"]}
                                    setSelected={()=> { }}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>

            <TableContainer sx={tableContainerStyles}>
                <Table>
                    <TableHead sx={{backgroundColor:"#E9F8FF"}}>
                        <TableRow>
                            <TableCell sx={{...tableHeadStyles, width: 160}}>Question Code</TableCell>
                            <TableCell sx={tableHeadStyles}>Status</TableCell>
                            <TableCell sx={tableHeadStyles}>Speciality</TableCell>
                            <TableCell sx={tableHeadStyles}>Question #</TableCell>
                            <TableCell sx={{...tableHeadStyles, width: 320}}>Question</TableCell>
                            <TableCell sx={{...tableHeadStyles, paddingLeft: "32px"}}>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {EXAMPLES.map((p, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell sx={tableBodyStyles} component="th" scope="row">{p.questionCode}</TableCell>
                                    <TableCell>
                                        {getStatusChip(p.status)}
                                    </TableCell>
                                    <TableCell sx={tableBodyStyles}>{p.speciality}</TableCell>
                                    <TableCell sx={tableBodyStyles}>{p.questionNumber}</TableCell>
                                    <TableCell sx={{...tableBodyStyles, width: 349}}>{p.question}</TableCell>
                                    <TableCell sx={tableBodyStyles}>
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