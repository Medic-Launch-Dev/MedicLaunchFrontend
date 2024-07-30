import { Avatar, Box, Stack, Toolbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useServiceProvider } from "../../services/ServiceProvider";
import { primaryGradient } from "../../theme";
import NotificationBellButton from "../notifications/NotificationBellButton";

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const { accountStore: { myProfile }, errorStore } = useServiceProvider();

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
            <Link to="/my-profile" style={{ textDecoration: 'none' }}>
              <Avatar sx={{ background: primaryGradient }}>
                {myProfile?.firstName.charAt(0)}{myProfile?.lastName.charAt(0)}
              </Avatar>
            </Link>
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