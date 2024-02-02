import { Avatar, Box, Stack, Toolbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";

export default function AppShell() {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100vh" }}>
      <Toolbar sx={{ backgroundColor: "#fff" }}>
        <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
          <img src={Logo} height={40} alt="Medic launch" style={{ cursor: 'pointer' }} onClick={() => navigate("/")} />
          <Avatar />
        </Stack>
      </Toolbar>
      <Box sx={{ p: 3, height: "calc(100% - 64px)", overflowY: "scroll" }}>
        <Outlet />
        <Box mt={3} />
      </Box>
    </Box>
  )
}