import { Box } from "@mui/material";
import { primaryGradient } from "../../theme";

interface SpecialityOptionProps {
  selected: boolean;
  setSelected: () => void;
}

export default function SelectAllSpecialityOption({ selected, setSelected }: SpecialityOptionProps) {
  return (
    <Box
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
      onClick={() => setSelected()}
    >
      Select all
    </Box>
  )
}