import { Box, Tooltip } from "@mui/material";
import Speciality from "../../models/Speciality";
import { primaryGradient } from "../../theme";

interface SpecialityOptionProps {
  speciality: Speciality;
  centered?: boolean;
  selected: boolean;
  setSelected: (speciality: string) => void;
  locked?: boolean; // Optional, for visual indication
}

export default function SpecialityOption({
  speciality,
  centered,
  selected,
  setSelected,
  locked = false,
}: SpecialityOptionProps) {
  const content = (
    <Box
      sx={{
        background: selected ? primaryGradient : "white",
        color: selected ? "white" : locked ? "#aaa" : undefined,
        borderRadius: 1.5,
        py: 2,
        px: 4,
        boxShadow: '0px 0px 22px 0px #97979765',
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: centered ? "center" : undefined,
        fontWeight: 500,
        cursor: locked ? "not-allowed" : "pointer",
        opacity: locked ? 0.6 : 1,
        position: "relative",
        userSelect: locked ? "none" : "auto",
      }}
      onClick={() => {
        if (!locked) setSelected(speciality.id);
      }}
      aria-locked={locked}
    >
      {locked && "🔒 "}
      {speciality.name}
    </Box>
  );

  return locked ? (
    <Tooltip title="Purchase a subscription to unlock this speciality" arrow>
      <span>{content}</span>
    </Tooltip>
  ) : (
    content
  );
}