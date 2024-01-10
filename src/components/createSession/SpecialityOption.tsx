import { Box } from "@mui/material";

interface SpecialityOptionProps {
  children: string;
  centered?: boolean;
}

export default function SpecialityOption({ children, centered }: SpecialityOptionProps) {
  return (
    <Box sx={{
      bgcolor: "white",
      borderRadius: 1.5,
      py: 2,
      px: 4,
      boxShadow: '0px 0px 22px 0px #97979765',
      height: "100%",
      display: 'flex',
      alignItems: 'center',
      justifyContent: centered ? "center" : undefined,
      fontWeight: 500,
      cursor: "pointer",
    }}>
      {children}
    </Box>
  )
}