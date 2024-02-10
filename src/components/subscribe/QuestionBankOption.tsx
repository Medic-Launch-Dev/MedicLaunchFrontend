import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { primaryGradient } from "../../theme";

interface QuestionBankOptionProps {
  text: string;
  selected: boolean;
  setSelected: (bank: string) => void;
  icon: React.ReactNode;
}

export default function QuestionBankOption({ text, icon, selected, setSelected }: QuestionBankOptionProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        background: selected ? primaryGradient : "white",
        color: selected ? "white" : undefined,
        borderRadius: 1.5,
        py: 3,
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
      <Box sx={{ background: selected ? "white" : primaryGradient, p: 1.25, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </Box>
      <Typography fontSize={18} fontWeight={600} color={selected ? "white" : "primary"}>{text}</Typography>
    </Stack>
  )
}