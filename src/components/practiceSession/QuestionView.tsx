import { ChevronRight, KeyboardArrowLeft } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import questionsStore, { Question } from "../../stores/questionsStore";
import LinkButton from "../util/LinkButton";
import AnswerOption from "./AnswerOption";
import AnswersGrid from "./AnswersGrid";

interface QuestionViewProps {
  question: Question;
  answerStatus?: string;
}

export default function QuestionView({ question, answerStatus }: QuestionViewProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const isFirstQuestion = questionsStore.currentQuestionIdx === 0
  const isLastQuestion = questionsStore.currentQuestionIdx === questionsStore.questions.length - 1;

  const questionBodyMarkup = (
    <>
      <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{question.questionText}</Typography>

      <Stack spacing={1} mb={2}>
        {
          question.answers.map((answer, index) => {
            let state: "base" | "correct" | "incorrect" | "subdued";
            if (!answerStatus) {
              state = "base";
            } else {
              if (question.correctAnswer === answer) {
                state = "correct"
              } else if (question.submittedAnswer === answer) {
                state = "incorrect";
              } else {
                state = "subdued";
              }
            }

            return (
              <AnswerOption
                key={index}
                selected={!answerStatus && selectedAnswer === answer}
                state={state}
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
              onClick={() => questionsStore.prevQuestion()}
              disabled={isFirstQuestion}
            >
              Previous
            </Button>
            <Button
              endIcon={<ChevronRight />}
              variant="outlined"
              onClick={() => questionsStore.nextQuestion()}
              disabled={isLastQuestion}
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
          onClick={() => questionsStore.prevQuestion()}
          disabled={isFirstQuestion}
        >
          Previous
        </Button>

        {
          isLastQuestion ?
            <LinkButton to="/review-session">
              End Session
            </LinkButton>
            :
            <Button
              variant="contained"
              onClick={() => questionsStore.nextQuestion()}
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