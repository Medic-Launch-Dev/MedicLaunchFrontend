import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router";
import { useServiceProvider } from "../../services/ServiceProvider";



export default function ReviewQuestionsTable() {
  const { questionsStore } = useServiceProvider();
  const navigate = useNavigate();

  function handleClickReview(idx) {
    questionsStore.setCurrentQuestion(idx);
    navigate("/practice-session");
  }

  function getResultChip(result?: string) {
    if (result === "correct") return <Chip label="Correct" sx={{ backgroundColor: "#A4E29F" }} />
    if (result === "incorrect") return <Chip label="Incorrect" sx={{ backgroundColor: "#FFABAB" }} />
    return <Chip label="Not attempted" />
  }


  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Result</TableCell>
            <TableCell>Question</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {questionsStore.answers.map((answer, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ width: 100 }}>
                {getResultChip(answer.result)}
              </TableCell>
              <TableCell>{`${idx + 1}. ${answer.questionText}`}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleClickReview(idx)}>
                  Review
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}