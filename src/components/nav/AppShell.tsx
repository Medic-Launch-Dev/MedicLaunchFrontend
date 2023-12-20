import { Box, Toolbar } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function AppShell({ children }: Props) {
  return (
    <div>
      <Toolbar sx={{ backgroundColor: "#fff" }}>Medic Launch</Toolbar>
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    </div>
  )
}