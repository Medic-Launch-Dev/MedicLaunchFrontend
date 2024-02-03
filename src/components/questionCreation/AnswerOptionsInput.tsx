import styled from "@emotion/styled";
import { Box, Button, Stack, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Option } from "../../models/Question";
import { primaryGradient } from "../../theme";
import TextSelect from "../util/TextSelect";

interface AnswerOptionsInputProps {
  options: Option[];
  setOptions: (options: Option[]) => void;
  answer: string;
  setAnswer: (answer: string) => void;
}

const OptionLetter = styled(Box)({
  background: primaryGradient,
  color: "#fff",
  width: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 500,
  borderRadius: 12,
})

function OptionInput({ size, fullWidth, rows, placeholder, ...props }: TextFieldProps) {
  return (
    <TextField
      size={"small"}
      fullWidth
      rows={2}
      placeholder="Write answer here..."
      {...props}
    />
  )
}

const emptyOptions = [
  { letter: "A", text: '' },
  { letter: "B", text: '' },
  { letter: "C", text: '' },
  { letter: "D", text: '' },
  { letter: "E", text: '' },
]

export default function AnswerOptionsInput({ options, setOptions, answer, setAnswer }: AnswerOptionsInputProps) {
  options = options.sort((a, b) => a.letter.localeCompare(b.letter));

  const [optionA, setOptionA] = useState(options[0].text || '');
  const [optionB, setOptionB] = useState(options[1].text || '');
  const [optionC, setOptionC] = useState(options[2].text || '');
  const [optionD, setOptionD] = useState(options[3].text || '');
  const [optionE, setOptionE] = useState(options[4].text || '');

  function handleSortOptions() {
    const sortedOptions = [optionA, optionB, optionC, optionD, optionE].sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a == b) return 0;
      return a < b ? -1 : 1;
    });
    setOptionA(sortedOptions[0]);
    setOptionB(sortedOptions[1]);
    setOptionC(sortedOptions[2]);
    setOptionD(sortedOptions[3]);
    setOptionE(sortedOptions[4]);
    updateParentOptions();
  }

  function updateParentOptions() {
    setOptions([
      { letter: "A", text: optionA },
      { letter: "B", text: optionB },
      { letter: "C", text: optionC },
      { letter: "D", text: optionD },
      { letter: "E", text: optionE },
    ])
  }

  return (
    <>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1}>
          <OptionLetter>{options[0].letter}</OptionLetter>
          <OptionInput value={optionA} onChange={e => setOptionA(e.target.value)} onBlur={updateParentOptions} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <OptionLetter>{options[1].letter}</OptionLetter>
          <OptionInput value={optionB} onChange={e => setOptionB(e.target.value)} onBlur={updateParentOptions} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <OptionLetter>{options[2].letter}</OptionLetter>
          <OptionInput value={optionC} onChange={e => setOptionC(e.target.value)} onBlur={updateParentOptions} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <OptionLetter>{options[3].letter}</OptionLetter>
          <OptionInput value={optionD} onChange={e => setOptionD(e.target.value)} onBlur={updateParentOptions} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <OptionLetter>{options[4].letter}</OptionLetter>
          <OptionInput value={optionE} onChange={e => setOptionE(e.target.value)} onBlur={updateParentOptions} />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Box
          sx={{
            background: primaryGradient,
            color: "#fff",
            px: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 500,
            borderRadius: 1,
          }}
        >
          Answer
        </Box>
        <TextSelect
          size="small"
          options={options.map(option => ({ value: option.letter }))}
          value={answer}
          setSelected={setAnswer}
        />
        <Button
          onClick={handleSortOptions}
          sx={{ minWidth: 'max-content' }}
          disabled={options.some(option => !optionA || !optionB || !optionC || !optionD || !optionE)}
        >
          Sort Options {'A-->Z'}
        </Button>
      </Stack>
    </>
  )
}