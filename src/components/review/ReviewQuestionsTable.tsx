import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { useNavigate } from "react-router";
import { useServiceProvider } from "../../services/ServiceProvider";
import useExtensions from "../tiptap/useExtensions";



export default function ReviewQuestionsTable() {
  const { questionsStore } = useServiceProvider();
  const { wasAnsweredCorrectly } = questionsStore;
  const navigate = useNavigate();

  const extensions = useExtensions({
    placeholder: ""
  });

  function handleClickReview(idx) {
    questionsStore.setCurrentQuestion(idx);
    navigate("/practice-session?inReview=true");
  }

  function getResultChip(answeredCorrectly?: boolean) {
    if (answeredCorrectly === undefined) return <Chip label="Not attempted" />;
    if (answeredCorrectly === true) return <Chip label="Correct" sx={{ backgroundColor: "#e7fae5", color: "#177d10" }} />;
    else return <Chip label="Incorrect" sx={{ backgroundColor: "#f7e2e2", color: "#962121" }} />;
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
          {questionsStore.questions.map((question, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ width: 100 }}>
                {getResultChip(wasAnsweredCorrectly(question))}
              </TableCell>
              <TableCell>
                  <RichTextReadOnly
                    content={`${idx + 1}. ${question.questionText}`}
                    extensions={extensions}
                  />
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => handleClickReview(idx)} size="small">
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