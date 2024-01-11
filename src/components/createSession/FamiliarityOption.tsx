import { Stack, Typography } from "@mui/material";
import { primaryGradient } from "../../theme";

interface FilterOptionProps {
  heading: string;
  subheading?: string;
  selected: boolean;
  setSelected: (speciality: string) => void;
}

export default function FilterOption({ heading, subheading, selected, setSelected }: FilterOptionProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        background: selected ? primaryGradient : "white",
        color: selected ? "white" : undefined,
        borderRadius: 1.5,
        py: 2,
        px: 4,
        boxShadow: '0px 0px 22px 0px #97979765',
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        fontWeight: 500,
        cursor: "pointer",
      }}
      onClick={() => setSelected(heading)}
    >
      <Typography variant="h3" color={selected ? "white" : "primary"}>{heading}</Typography>
      {
        subheading &&
        <Typography variant="body1">{subheading}</Typography>
      }
    </Stack>
  )
}