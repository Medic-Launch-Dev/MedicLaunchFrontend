import { ChevronRight, KeyboardArrowLeft } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useServiceProvider } from "../../services/ServiceProvider";
import { Question } from "../../stores/questionsStore";
import LinkButton from "../util/LinkButton";
import AnswerOption from "./AnswerOption";
import AnswersGrid from "./AnswersGrid";

interface QuestionViewProps {
  question: Question;
  answerStatus?: string;
}

function QuestionView({ question, answerStatus }: QuestionViewProps) {
  const { questionsStore } = useServiceProvider();
  const [selectedAnswer, setSelectedAnswer] = useState<string>();

  const questionBodyMarkup = (
    <>
      <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{question.questionText}</Typography>

      <Stack spacing={1} mb={2}>
        {
          question.answers.map((answer, index) => {
            let style: "base" | "correct" | "incorrect" | "subdued";
            if (!answerStatus) {
              style = "base";
            } else {
              if (question.correctAnswer === answer) {
                style = "correct"
              } else if (question.submittedAnswer === answer) {
                style = "incorrect";
              } else {
                style = "subdued";
              }
            }

            return (
              <AnswerOption
                key={index}
                selected={!answerStatus && selectedAnswer === answer}
                style={style}
                setSelectedAnswer={setSelectedAnswer}
                disabled={!!answerStatus}
              >
                {answer}
              </AnswerOption>
            )
          })
        }
      </Stack>

      {
        !answerStatus &&
        <Stack sx={{ width: "max-content" }} spacing={1}>
          {
            !answerStatus &&
            <Button
              variant="contained"
              disabled={!selectedAnswer}
              onClick={() => questionsStore.submitAnswer(selectedAnswer!)}
            >
              Submit
            </Button>
          }
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<KeyboardArrowLeft />}
              variant="outlined"
              onClick={() => questionsStore.decrementQuestion()}
              disabled={questionsStore.onFirstQuestion}
            >
              Previous
            </Button>
            <Button
              endIcon={<ChevronRight />}
              variant="outlined"
              onClick={() => questionsStore.incrementQuestion()}
              disabled={questionsStore.onLastQuestion}
            >
              Skip
            </Button>
          </Stack>
        </Stack>
      }
    </>
  )

  const explanationMarkup = (
    <Stack spacing={3}>
      <Stack
        spacing={2}
        sx={{
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h4" color="primary">Explanation</Typography>
        <Typography variant="h5" color="primary">The correct answer is {question.correctAnswer}</Typography>
        <Typography variant="body1">{question.explanation}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button
          startIcon={<KeyboardArrowLeft />}
          variant="outlined"
          onClick={() => questionsStore.decrementQuestion()}
          disabled={questionsStore.onFirstQuestion}
        >
          Previous
        </Button>

        {
          questionsStore.onLastQuestion ?
            <LinkButton to="/review-session">
              End Session
            </LinkButton>
            :
            <Button
              variant="contained"
              onClick={() => questionsStore.incrementQuestion()}
            >
              Next Question
            </Button>

        }
      </Stack>
    </Stack>
  )

  return (
    <Grid container columnSpacing={6} rowSpacing={3}>
      <Grid item xs={12} lg={6}>
        {questionBodyMarkup}
      </Grid>
      <Grid item xs={12} lg={6}>
        <AnswersGrid />
      </Grid>
      <Grid item xs={12}>
        {answerStatus && explanationMarkup}
      </Grid>
    </Grid>
  )
}

export default observer(QuestionView);