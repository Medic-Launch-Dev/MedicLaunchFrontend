import { Add, ChevronRight, Flag, KeyboardArrowLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { RichTextReadOnly } from "mui-tiptap";
import { useEffect, useState } from "react";
import { Option } from "../../models/Question";
import { useServiceProvider } from "../../services/ServiceProvider";
import { QuestionModelUI } from "../../stores/questionsStore";
import { primaryGradient } from "../../theme";
import { getInnerTextFromHTML } from "../../utils/RichTextUtils";
import EditNoteDialog from "../notes/EditNoteDialog";
import useExtensions from "../tiptap/useExtensions";
import LinkButton from "../util/LinkButton";
import AnswerOption from "./AnswerOption";
import AnswersGrid from "./AnswersGrid";
import LabValues from "./LabValues";
import Timer from "./Timer";

interface QuestionViewProps {
  question: QuestionModelUI;
  inPreview?: boolean;
  isMock?: boolean;
}

function QuestionView({ question: questionFromProps, inPreview, isMock }: QuestionViewProps) {
  const { questionsStore, practiceStore } = useServiceProvider();
  const question = inPreview ? questionsStore.previewQuestion : questionFromProps;

  const [open, setOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const wasAttempted = !!question?.submittedAnswerLetter;
  const correctOption = question?.options?.filter(option => option.letter === question?.correctAnswerLetter);

  useEffect(() => {
    setSelectedOption(null);
  }, [questionFromProps])

  const extensions = useExtensions({
    placeholder: ""
  });

  async function handleSubmitAnswer() {
    if (!selectedOption) return;

    setLoadingSubmit(true);
    await questionsStore.submitAnswer(selectedOption.letter);
    setLoadingSubmit(false);
  }

  async function handleFlagQuestion() {
    setLoadingFlag(true);
    if (question?.isFlagged) await questionsStore.unflagQuestion(isMock);
    else await questionsStore.flagQuestion(isMock);
    setLoadingFlag(false);
  }

  const flagButtonMarkup = (
    <LoadingButton
      startIcon={<Flag />}
      onClick={handleFlagQuestion}
      disabled={inPreview}
      loading={loadingFlag}
      variant={question?.isFlagged ? "contained" : "outlined"}
      sx={question?.isFlagged ? { border: '2px solid transparent' } : undefined}
    >
      Flag
    </LoadingButton>
  );

  const questionBodyMarkup = (
    <>
      {
        !inPreview &&
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2
        }}>
          <Box
            sx={{
              background: primaryGradient,
              color: "#fff",
              width: "fit-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 500,
              borderRadius: 1,
              padding: "5px 15px",
            }}
          >
            {question?.specialityName}
          </Box>
          <Typography fontWeight={600}>{`Question ${questionsStore.getQuestionNumber()}`}</Typography>
        </Box>
      }
      <Box mb={2}>
        <RichTextReadOnly content={question?.questionText} extensions={extensions} />
      </Box>
      <Stack spacing={1} mb={3}>
        {
          question?.options
            ?.slice()
            ?.sort((a, b) => a.letter.localeCompare(b.letter))
            ?.map((option, index) => {
              let style: "base" | "correct" | "incorrect" | "subdued" | "mock";
              if (!wasAttempted) {
                style = "base";
              } else {
                if (isMock) {
                  if (question.submittedAnswerLetter === option.letter) {
                    style = "mock";
                  } else {
                    style = "subdued";
                  }
                } else {

                  if (question?.correctAnswerLetter === option.letter) {
                    style = "correct"
                  } else if (question?.submittedAnswerLetter === option.letter) {
                    style = "incorrect";
                  } else {
                    style = "subdued";
                  }
                }
              }

              return (
                <AnswerOption
                  key={index}
                  selected={!wasAttempted && selectedOption === option}
                  style={style}
                  option={option}
                  setSelectedOption={setSelectedOption}
                  disabled={wasAttempted || inPreview}
                />
              )
            })
        }
      </Stack>

      {
        !inPreview && (
          wasAttempted ?
            <Stack sx={{ width: { xs: "100%", md: "max-content" } }} spacing={1} alignItems="center">
              {
                questionsStore.onLastQuestion
                  ?
                  <LinkButton sx={{ px: 12, py: 1.25 }} to={"/review-session"}>
                    End Session
                  </LinkButton>
                  :
                  <Button
                    sx={{ px: 12, py: 1.25 }}
                    variant="contained"
                    disabled={inPreview}
                    onClick={() => questionsStore.incrementQuestion()}
                  >
                    Next Question
                  </Button>
              }
              <Stack direction="row" spacing={1}>
                {flagButtonMarkup}
                <Button
                  startIcon={<KeyboardArrowLeft />}
                  variant="outlined"
                  onClick={() => questionsStore.decrementQuestion()}
                  disabled={questionsStore.onFirstQuestion}
                >
                  Previous
                </Button>
              </Stack>
            </Stack>
            :
            <Stack sx={{ width: "max-content" }} spacing={1} alignItems="center">
              <LoadingButton
                variant="contained"
                sx={{ px: 12, py: 1.25 }}
                disabled={!selectedOption}
                loading={loadingSubmit}
                onClick={handleSubmitAnswer}
              >
                Submit
              </LoadingButton>
              <Stack direction="row" spacing={1}>
                {flagButtonMarkup}
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
        )
      }
    </>
  );

  const rightSideMarkup = (
    <Stack spacing={2} sx={{ maxHeight: 500 }}>
      {isMock && <Timer />}
      {
        !inPreview &&
        <Box sx={{ flexShrink: 0 }}>
          <AnswersGrid isMock={isMock} />
        </Box>
      }
      <Box sx={{ flexGrow: 1, overflowY: 'scroll', backgroundColor: "white", borderRadius: 1, p: 3, display: { xs: 'none', md: 'block' } }}>
        <LabValues />
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{ color: "black", fontWeight: 500, visibility: !wasAttempted || inPreview ? "hidden" : "visible" }}
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Note
      </Button>
    </Stack>
  );

  const explanationMarkup = (
    <Stack spacing={3}>
      <Box sx={{ backgroundColor: "#fff", p: 4, borderRadius: 1 }}>
        <Typography variant="h5" color="primary">
          The correct answer is {question?.correctAnswerLetter}:{" "}
          {correctOption && correctOption[0] && correctOption[0].text}
        </Typography>
        {
          getInnerTextFromHTML(question?.explanation) &&
          <Box mt={2}>
            <Typography variant="h6" color="primary">
              Explanation
            </Typography>
            <Typography fontSize={13} fontWeight={500} mt={1}>
              <RichTextReadOnly
                content={question?.explanation}
                extensions={extensions}
              />
            </Typography>
          </Box>
        }
        {
          getInnerTextFromHTML(question?.learningPoints) &&
          <Box mt={2}>
            <Typography variant="h6" color="primary">
              Learning Points:
            </Typography>
            <Typography fontSize={13} fontWeight={500} mt={1}>
              <RichTextReadOnly
                content={question?.learningPoints}
                extensions={extensions}
              />
            </Typography>
          </Box>
        }
        {
          getInnerTextFromHTML(question?.clinicalTips) &&
          <Stack
            mt={3}
            sx={{
              background: primaryGradient,
              p: 3,
              mx: { xs: 0, md: 8 },
              alignItems: "center",
              borderRadius: 1.5,
            }}
          >
            <Typography variant="h6" color="secondary">
              Clinical Tips:
            </Typography>
            <Typography fontSize={13} textAlign="center" mt={1} color="secondary">
              <RichTextReadOnly
                content={question?.clinicalTips}
                extensions={extensions}
              />
            </Typography>
          </Stack>
        }
      </Box>
      <Stack sx={{ width: "max-content" }} spacing={1} alignItems="center">
        {
          questionsStore.onLastQuestion
            ?
            <LinkButton sx={{ px: 12, py: 1.25 }} to="/review-session">
              End Session
            </LinkButton>
            :
            <Button
              sx={{ px: 12, py: 1.25 }}
              variant="contained"
              disabled={inPreview}
              onClick={() => questionsStore.incrementQuestion()}
            >
              Next Question
            </Button>
        }
        <Stack direction="row" spacing={1}>
          {flagButtonMarkup}
          <Button
            startIcon={<KeyboardArrowLeft />}
            variant="outlined"
            onClick={() => questionsStore.decrementQuestion()}
            disabled={questionsStore.onFirstQuestion}
          >
            Previous
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <>
      <Grid container spacing={3} pb={3}>
        <Grid item xs={12} lg={7}>
          {questionBodyMarkup}
        </Grid>
        <Grid item xs={12} lg={5}>
          {rightSideMarkup}
        </Grid>
        <Grid item xs={12}>
          {(wasAttempted || inPreview) && !isMock && explanationMarkup}
        </Grid>
      </Grid>
      <EditNoteDialog
        open={open}
        onClose={() => setOpen(false)}
        note={question?.note}
        specialityId={question?.specialityId}
        questionId={question?.id}
      />
    </>
  )
}

export default observer(QuestionView);