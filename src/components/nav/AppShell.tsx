import { Avatar, Box, Stack, Toolbar } from "@mui/material";
import Logo from "../../assets/logo.svg";

interface Props {
  children: React.ReactNode;
}

export default function AppShell({ children }: Props) {
  return (
    <div>
      <Toolbar sx={{ backgroundColor: "#fff" }}>
        <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
          <img src={Logo} height={40} />
          <Avatar />
        </Stack>
      </Toolbar>
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    </div>
  )
}