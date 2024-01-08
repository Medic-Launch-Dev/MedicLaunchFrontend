import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { useNavigate } from "react-router";
import questionsStore from "../../stores/questionsStore";



export default function ReviewQuestionsTable() {
  const navigate = useNavigate();

  const ResultChip = styled(Chip)({
    fontSize: 10,
    fontWeight: 500,
    width: "8rem",
    textShadow: "0 0 0 #000"
  })

  function handleClickReview(idx) {
    questionsStore.setCurrentQuestion(idx);
    navigate("/practice-session");
  }

  function getResultChip(result?: string) {
    if (result === "correct") return <ResultChip label="Correct" sx={{backgroundColor:"#A4E29F"}} />
    if (result === "incorrect") return <ResultChip label="Incorrect" sx={{backgroundColor:"#FFABAB"}} />
    return <ResultChip label="Not attempted" />
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
              <TableCell component="th" scope="row" sx={{width: 100}}>
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