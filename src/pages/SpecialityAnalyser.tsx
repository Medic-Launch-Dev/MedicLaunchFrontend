import { Button, Card, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import LinkButton from "../components/util/LinkButton";
import { primaryGradientText } from "../theme";

export default function SpecialityAnalyser() {
  return (
    <Container maxWidth="lg">
      <LinkButton to="/" sx={{ my: 2 }}>
        Study Portal
      </LinkButton>

      <Card>
        <Typography variant="h3" sx={primaryGradientText} my={1}>Speciality Analyser</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Speciality</TableCell>
              <TableCell>Questions Answered</TableCell>
              <TableCell>Correct</TableCell>
              <TableCell>Incorrect</TableCell>
              <TableCell>Continue Questions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sample notification */}
            <TableRow>
              <TableCell>Acute Medicine</TableCell>
              <TableCell>
                50/400
              </TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>
                <Button variant="contained">
                  Continue
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acute Medicine</TableCell>
              <TableCell>
                50/400
              </TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>
                <Button variant="contained">
                  Continue
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acute Medicine</TableCell>
              <TableCell>
                50/400
              </TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>
                <Button variant="contained">
                  Continue
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acute Medicine</TableCell>
              <TableCell>
                50/400
              </TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>
                <Button variant="contained">
                  Continue
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acute Medicine</TableCell>
              <TableCell>
                50/400
              </TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>
                <Button variant="contained">
                  Continue
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acute Medicine</TableCell>
              <TableCell>
                50/400
              </TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>
                <Button variant="contained">
                  Continue
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acute Medicine</TableCell>
              <TableCell>
                50/400
              </TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>
                <Button variant="contained">
                  Continue
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acute Medicine</TableCell>
              <TableCell>
                50/400
              </TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>25/50 (50%)</TableCell>
              <TableCell>
                <Button variant="contained">
                  Continue
                </Button>
              </TableCell>
            </TableRow>
            {/* Add more notifications as needed */}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
