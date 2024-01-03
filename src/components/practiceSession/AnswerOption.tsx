import { Box, Typography } from "@mui/material";

interface AnswerOptionProps {
  children: string;
  setSelectedAnswer: (answer: string) => void;
  selected?: boolean;
  disabled?: boolean;
  state: "base" | "correct" | "incorrect" | "subdued";
}

export default function AnswerOption({ children, setSelectedAnswer, selected, disabled, state }: AnswerOptionProps) {
  function getBackgroundColor() {
    if (state === "incorrect") return "#fdf0f0";
    if (state === "correct") return "#f5fef4";
    return "#fff";
  }

  function getBorderColor() {
    if (selected) return "#2394c4"
    if (state === "incorrect") return "#962121";
    if (state === "correct") return "#368b30";
    return "transparent";
  }

  function getTextColor() {
    if (selected) return "#2394c4"
    if (state === "incorrect") return "#962121";
    if (state === "correct") return "#177d10";
    if (state === "subdued") return "#c4c4c4"
  }

  return (
    <Box
      sx={{
        backgroundColor: getBackgroundColor(),
        p: 2,
        borderRadius: 1,
        cursor: disabled ? "default" : "pointer",
        border: `2px solid ${getBorderColor()}`,
        ":hover": {
          border: disabled ? undefined : "2px solid #2394c4",
        },
      }}
      onClick={() => !disabled && setSelectedAnswer(children)}
    >
      <Typography variant="body1" sx={{ color: getTextColor(), fontWeight: 500 }}>
        {children}
      </Typography>
    </Box>
  )
}