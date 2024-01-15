import { Box, Stack, Typography } from "@mui/material";
import { useServiceProvider } from "../../services/ServiceProvider";

export default function AnswersGrid() {
  const { questionsStore } = useServiceProvider();

  function getBackgroundColor(status?: string) {
    if (status === "correct") return "#e7fae5";
    if (status === "incorrect") return "#f7e2e2";
    return "#f4f4f4"
  }

  function getTextColor(status?: string) {
    if (status === "incorrect") return "#962121";
    if (status === "correct") return "#177d10";
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
        questionsStore.answers.map((answer, index) => {
          return (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                backgroundColor: getBackgroundColor(answer.result),
                height: 25,
                width: 25,
                borderRadius: 0.5,
                cursor: "pointer",
                border: index === questionsStore.currentQuestionIdx ? "2px solid #2394c4" : undefined
              }}
              onClick={() => questionsStore.setCurrentQuestion(index)}
            >
              <Typography variant="body2" color={getTextColor(answer.result)} fontWeight={500}>
                {index + 1}
              </Typography>
            </Stack>
          )
        })
      }
    </Box>
  )
};