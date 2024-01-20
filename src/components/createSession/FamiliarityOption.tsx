import { Stack, Typography } from "@mui/material";
import { primaryGradient } from "../../theme";

interface FilterOptionProps {
  text: string;
  selected: boolean;
  setSelected: (speciality: string) => void;
}

export default function FilterOption({ text, selected, setSelected }: FilterOptionProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        background: selected ? primaryGradient : "white",
        color: selected ? "white" : undefined,
        borderRadius: 1.5,
        py: 2.5,
        px: 4,
        boxShadow: '0px 0px 22px 0px #97979765',
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        fontWeight: 500,
        cursor: "pointer",
      }}
      onClick={() => setSelected(text)}
    >
      <Typography fontSize={16} fontWeight={500} color={selected ? "white" : undefined}>{text}</Typography>
    </Stack>
  )
}