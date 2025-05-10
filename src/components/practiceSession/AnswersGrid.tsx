import { Flag } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useServiceProvider } from "../../services/ServiceProvider";

interface AnswerGridProps {
  isMock?: boolean;
}

function AnswersGrid({ isMock }: AnswerGridProps) {
  const { questionsStore } = useServiceProvider();
  const { wasAnsweredCorrectly } = questionsStore

  function getBackgroundColor(answeredCorrectly?: boolean) {
    if (answeredCorrectly !== undefined && isMock) return "#e4f4fa";
    if (answeredCorrectly === true) return "#e7fae5";
    if (answeredCorrectly === false) return "#f7e2e2";
    else return "#f4f4f4";
  }

  function getTextColor(answeredCorrectly?: boolean) {
    if (answeredCorrectly === undefined) return;
    if (isMock) return "#2394c4";
    if (answeredCorrectly) return "#177d10";
    else return "#962121";
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        p: 1.5,
        borderRadius: 1,
        backgroundColor: "white",
        overflowY: 'scroll',
        maxHeight: 110,
      }}
    >
      {
        questionsStore.questions.map((question, index) => {
          return (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                backgroundColor: getBackgroundColor(wasAnsweredCorrectly(question)),
                height: 24.7,
                width: 24.7,
                borderRadius: 0.5,
                cursor: "pointer",
                border: index === questionsStore.currentQuestionIdx ? "2px solid #2394c4" : undefined,
                position: "relative",
              }}
              onClick={() => questionsStore.setCurrentQuestion(index)}
            >
              <Typography variant="body2" color={getTextColor(wasAnsweredCorrectly(question))} fontWeight={500}>
                {index + 1}
              </Typography>
              {
                question.isFlagged &&
                <Flag sx={{ fontSize: 14, position: "absolute", top: -6, right: -6, color: "#2394c4" }} />
              }
            </Stack>
          )
        })
      }
    </Box>
  )
};

export default observer(AnswersGrid);