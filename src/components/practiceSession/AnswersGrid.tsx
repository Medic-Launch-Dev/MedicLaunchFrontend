import { Box, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useServiceProvider } from "../../services/ServiceProvider";

function AnswersGrid() {
  const { questionsStore } = useServiceProvider();
  const { wasAnsweredCorrectly } = questionsStore

  function getBackgroundColor(answeredCorrectly?: boolean) {
    if (answeredCorrectly === true) return "#e7fae5";
    if (answeredCorrectly === false) return "#f7e2e2";
    else return "#f4f4f4";
  }

  function getTextColor(answeredCorrectly?: boolean) {
    if (answeredCorrectly === undefined) return;
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
                height: 25,
                width: 25,
                borderRadius: 0.5,
                cursor: "pointer",
                border: index === questionsStore.currentQuestionIdx ? "2px solid #2394c4" : undefined
              }}
              onClick={() => questionsStore.setCurrentQuestion(index)}
            >
              <Typography variant="body2" color={getTextColor(wasAnsweredCorrectly(question))} fontWeight={500}>
                {index + 1}
              </Typography>
            </Stack>
          )
        })
      }
    </Box>
  )
};

export default observer(AnswersGrid);