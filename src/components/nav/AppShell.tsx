import { Avatar, Box, Stack, Toolbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useServiceProvider } from "../../services/ServiceProvider";
import NotificationBellButton from "../notifications/NotificationBellButton";

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const { errorStore } = useServiceProvider();

  useEffect(() => {
    if (errorStore.errorMessage)
      errorStore.clearError();
  }, [location]);

  return (
    <Box sx={{ height: "100vh" }}>
      <Toolbar sx={{ backgroundColor: "#fff" }}>
        <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
          <img src={Logo} height={40} alt="Medic launch" style={{ cursor: 'pointer' }} onClick={() => navigate("/")} />
          <Stack direction="row" alignItems="center" spacing={2}>
            <NotificationBellButton />
            <Avatar />
          </Stack>
        </Stack>
      </Toolbar>
      <Box sx={{ p: 3, height: "calc(100% - 64px)", overflowY: "scroll" }}>
        <Outlet />
      </Box>
    </Box >
  )
}

export default observer(AppShell);