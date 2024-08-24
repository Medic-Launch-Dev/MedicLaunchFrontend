import { Avatar, Box, Stack, Toolbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useServiceProvider } from "../../services/ServiceProvider";
import { primaryGradient } from "../../theme";
import NotificationBellButton from "../notifications/NotificationBellButton";
import NavigateConfirmationModal from "./NavigateConfirmationModal";

function AppShell() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldNavigateConfirm, setShouldNavigateConfirm] = useState(false);

  const { accountStore: { myProfile }, errorStore } = useServiceProvider();

  useEffect(() => {
    if (errorStore.errorMessage)
      errorStore.clearError();

    if (location.pathname === "/practice-session" || location.pathname === "/review-session")
      setShouldNavigateConfirm(true);
    else setShouldNavigateConfirm(false);
  }, [location]);

  const handleNavigate = (location: string) => {
    if (shouldNavigateConfirm) setOpen(true);
    else navigate(location);
  }

  return (
    <Box sx={{ height: "100vh" }}>
      <Toolbar sx={{ backgroundColor: "#fff" }}>
        <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
          <img src={Logo} height={40} alt="Medic launch" style={{ cursor: 'pointer' }} onClick={() => handleNavigate("/")} />
          <Stack direction="row" alignItems="center" spacing={2}>
            <div onClick={() => handleNavigate("/notifications")}>
              <NotificationBellButton />
            </div>
            <div onClick={() => handleNavigate("/my-profile")} style={{ cursor: 'pointer' }}>
              <Avatar sx={{ background: primaryGradient }}>
                {myProfile?.firstName.charAt(0)}{myProfile?.lastName.charAt(0)}
              </Avatar>
            </div>
            <NavigateConfirmationModal open={open} setOpen={setOpen} />
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