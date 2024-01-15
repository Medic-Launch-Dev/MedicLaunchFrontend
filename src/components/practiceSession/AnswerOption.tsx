import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Option } from "../../models/Question";

interface AnswerOptionProps {
  option: Option;
  setSelectedOption: (answer: Option) => void;
  selected?: boolean;
  disabled?: boolean;
  style: "base" | "correct" | "incorrect" | "subdued";
}

function AnswerOption({ option, setSelectedOption, selected, disabled, style }: AnswerOptionProps) {
  function getBackgroundColor() {
    if (style === "incorrect") return "#fdf0f0";
    if (style === "correct") return "#f5fef4";
    return "#fff";
  }

  function getBorderColor() {
    if (selected) return "#2394c4"
    if (style === "incorrect") return "#962121";
    if (style === "correct") return "#368b30";
    return "transparent";
  }

  function getTextColor() {
    if (selected) return "#2394c4"
    if (style === "incorrect") return "#962121";
    if (style === "correct") return "#177d10";
    if (style === "subdued") return "#c4c4c4"
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
      onClick={() => !disabled && setSelectedOption(option)}
    >
      <Typography variant="body1" sx={{ color: getTextColor(), fontWeight: 500 }}>
        {option.letter}. {option.text}
      </Typography>
    </Box>
  )
};

export default observer(AnswerOption);