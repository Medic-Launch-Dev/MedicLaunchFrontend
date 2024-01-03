import { Avatar, Box, Stack, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/logo.svg";

export default function AppShell() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Toolbar sx={{ backgroundColor: "#fff" }}>
        <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
          <img src={Logo} height={40} />
          <Avatar />
        </Stack>
      </Toolbar>
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}