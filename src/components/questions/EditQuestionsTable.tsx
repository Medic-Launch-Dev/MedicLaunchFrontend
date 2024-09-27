import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useServiceProvider } from "../../services/ServiceProvider";
import { QuestionModelUI } from "../../stores/questionsStore";

interface EditQuestionsTableProps {
  questions: QuestionModelUI[];
  isTrial?: boolean;
}

export default function EditQuestionsTable({ questions, isTrial }: EditQuestionsTableProps) {
  const navigate = useNavigate();
  const { questionsStore } = useServiceProvider();

  function getQuestionTextWithoutHtml(questionText: string) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = questionText;
    return tempContainer.innerText;
  }

  function handleClickEdit(question: QuestionModelUI) {
    questionsStore.setPreviewQuestion(question);
    navigate(isTrial ? "/edit-question?isTrial=true" : "/edit-question")
  }

  return (
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
          {questions.map((question, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{question.questionCode}</TableCell>
                <TableCell>
                  {
                    question.isSubmitted ?
                      <Chip label="Submitted" sx={{ backgroundColor: "#A4E29F" }} /> :
                      <Chip label="Pending" />
                  }
                </TableCell>
                <TableCell>{question.specialityName}</TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ width: 500 }}>
                  <Typography sx={{ height: 64, overflowY: 'hidden' }}>
                    {getQuestionTextWithoutHtml(question.questionText)}
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
                    onClick={() => handleClickEdit(question)}
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
  )
}