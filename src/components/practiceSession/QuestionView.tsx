import { ChevronRight, KeyboardArrowLeft } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Option } from "../../models/Question";
import { useServiceProvider } from "../../services/ServiceProvider";
import { QuestionModelUI } from "../../stores/questionsStore";
import { primaryGradient } from "../../theme";
import LinkButton from "../util/LinkButton";
import AnswerOption from "./AnswerOption";
import AnswersGrid from "./AnswersGrid";
import LabValues from "./LabValues";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../tiptap/useExtensions";

interface QuestionViewProps {
  question: QuestionModelUI;
}

function QuestionView({ question }: QuestionViewProps) {
  const { questionsStore } = useServiceProvider();
  const [selectedOption, setSelectedOption] = useState<Option>();
  const wasAttempted = question.submittedAnswerLetter !== undefined;
  const correctOption = question.options.filter(option => option.letter === question.correctAnswerLetter);

  const extensions = useExtensions({
    placeholder: ""
  });

  const questionBodyMarkup = (
    <>
      {/* <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{question.questionText}</Typography> */}
      <RichTextReadOnly content={question.questionText} extensions={extensions} />
      <Stack spacing={1} mb={2}>
        {
          question.options.map((option, index) => {
            let style: "base" | "correct" | "incorrect" | "subdued";
            if (!wasAttempted) {
              style = "base";
            } else {
              if (question.correctAnswerLetter === option.letter) {
                style = "correct"
              } else if (question.submittedAnswerLetter === option.letter) {
                style = "incorrect";
              } else {
                style = "subdued";
              }
            }

            return (
              <AnswerOption
                key={index}
                selected={!wasAttempted && selectedOption === option}
                style={style}
                option={option}
                setSelectedOption={setSelectedOption}
                disabled={wasAttempted}
              />
            )
          })
        }
      </Stack>

      {
        !wasAttempted &&
        <Stack sx={{ width: "max-content" }} spacing={1}>
          <Button
            variant="contained"
            disabled={!selectedOption}
            onClick={() => questionsStore.submitAnswer(selectedOption!.letter)}
          >
            Submit
          </Button>
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
  );

  const rightSideMarkup = (
    <Stack spacing={2} sx={{ maxHeight: 450 }}>
      <Box sx={{ flexShrink: 0 }}>
        <AnswersGrid />
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'scroll', backgroundColor: "white", borderRadius: 1, p: 3 }}>
        <LabValues />
      </Box>
    </Stack>
  )

  const explanationMarkup = (
    <Stack spacing={3}>
      <Box sx={{ backgroundColor: "#fff", p: 4, borderRadius: 1 }}>
        <Typography variant="h4" color="primary">
          Explanation
        </Typography>
        <Typography variant="h5" color="primary" mt={2}>
          The correct answer is {question.correctAnswerLetter}:{" "}
          {correctOption[0].text}
        </Typography>
        <Typography fontSize={13} fontWeight={500} mt={1}>
          <RichTextReadOnly
            content={question.explanation}
            extensions={extensions}
          />
        </Typography>
        <Typography variant="h6" color="primary" mt={2}>
          Key Learning Points:
        </Typography>
        <Typography fontSize={13} fontWeight={500} mt={1}>
          <RichTextReadOnly
            content={question.learningPoints}
            extensions={extensions}
          />
        </Typography>
        <Stack
          mt={3}
          sx={{
            background: primaryGradient,
            p: 3,
            mx: 8,
            alignItems: "center",
            borderRadius: 1.5,
          }}
        >
          <Typography variant="h6" color="secondary">
            Clinical Tips:
          </Typography>
          <Typography fontSize={13} textAlign="center" mt={1} color="secondary">
            <RichTextReadOnly
              content={question.clinicalTips}
              extensions={extensions}
            />
          </Typography>
        </Stack>
      </Box>
      <Stack direction="row" spacing={1}>
        <Button
          startIcon={<KeyboardArrowLeft />}
          variant="outlined"
          onClick={() => questionsStore.decrementQuestion()}
          disabled={questionsStore.onFirstQuestion}
        >
          Previous
        </Button>

        {questionsStore.onLastQuestion ? (
          <LinkButton to="/review-session">End Session</LinkButton>
        ) : (
          <Button
            variant="contained"
            onClick={() => questionsStore.incrementQuestion()}
          >
            Next Question
          </Button>
        )}
      </Stack>
    </Stack>
  );

  return (
    <Grid container spacing={3} pb={3}>
      <Grid item xs={12} lg={6}>
        {questionBodyMarkup}
      </Grid>
      <Grid item xs={12} lg={6}>
        {rightSideMarkup}
      </Grid>
      <Grid item xs={12}>
        {wasAttempted && explanationMarkup}
      </Grid>
    </Grid>
  )
}

export default observer(QuestionView);