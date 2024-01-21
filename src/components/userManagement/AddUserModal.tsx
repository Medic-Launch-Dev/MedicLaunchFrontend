import { 
    Box, 
    Button, 
    Container, 
    FormControl, 
    Grid, 
    Link, 
    Stack, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow, 
    TextField, 
    Typography 
} from "@mui/material";
import { Close } from "@mui/icons-material";
import AgreementCheckbox from "../register/AgreementCheckbox";
import UniversitySelect from "../register/UniversitySelect";

export default function AddUser() {
    return(
        <Container sx={{backgroundColor: '#fff', paddingY: 2}}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' mb={3}>
                <Typography variant="h3">Add User</Typography>
                <Close/>
            </Stack>
            <FormControl>
                <Stack sx={{borderTop: '0.5px solid #EFF4FA', paddingTop: '10px'}} mb={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box>Display name *</Box>
                            <TextField
                                placeholder="Riaz1234"
                                sx={{width:'100%'}}
                                autoFocus
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Box>First name *</Box>
                            <TextField
                                placeholder="Riaz"
                                sx={{width:'100%'}}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Box>Last name *</Box>
                            <TextField
                                placeholder="Riaz"
                                sx={{width:'100%'}}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Box>City *</Box>
                            <TextField
                                placeholder="London"
                                sx={{width:'100%'}}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Box>Email ID *</Box>
                            <TextField
                                placeholder="Riaz1234@gmail.com"
                                sx={{width:'100%'}}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Box>Mobile Number</Box>
                            <TextField
                                placeholder="123456789"
                                sx={{width:'100%'}}
                            />
                        </Grid>
                        <Grid item xs={4} alignItems='end'>
                            <Box>University</Box>
                            <UniversitySelect/>
                        </Grid>
                        <Grid item xs={4}>
                            <Box>Graduation Year *</Box>
                            <TextField
                                placeholder="2025"
                                sx={{width:'100%'}}
                                type="number"
                                required
                            />
                        </Grid>
                    </Grid>
                </Stack>
                <Table>
                    <TableHead sx={{backgroundColor: '#EFF4FA', color: '#8F9BB3'}}>
                        <TableRow>
                            <TableCell>Question Bank</TableCell>
                            <TableCell>1 Month</TableCell>
                            <TableCell>3 Months</TableCell>
                            <TableCell>6 Months</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>UKMLA</TableCell> 
                            <TableCell><AgreementCheckbox text=""/></TableCell>   
                            <TableCell><AgreementCheckbox text=""/></TableCell>   
                            <TableCell><AgreementCheckbox text=""/></TableCell>   
                        </TableRow>
                    </TableBody>
                </Table>
                <Stack direction='row' alignItems='center' justifyContent='end' gap={4} mt={3}>
                    <Button variant="contained">Add User</Button>
                    <Link underline='none' sx={{cursor: 'pointer'}}>Cancel</Link>
                </Stack>
            </FormControl>
        </Container>
    )
}