import { Alert, Avatar, Box, Container, ContainerProps, Stack, Toolbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useServiceProvider } from "../../services/ServiceProvider";
import { primaryGradient } from "../../theme";
import NotificationBellButton from "../notifications/NotificationBellButton";
import NavMenu from "./NavMenu";
import NavigateConfirmationModal from "./NavigateConfirmationModal";

interface PageProps extends ContainerProps {
  children: React.ReactNode;
  withNav?: boolean;
  fullWidth?: boolean;
}

function Page({ children, withNav, maxWidth, fullWidth, sx, ...rest }: PageProps) {
  const navigate = useNavigate();
  const { accountStore: { myProfile }, applicationStore: { errorMessage, shouldNavigateConfirm } } = useServiceProvider();
  const [open, setOpen] = useState(false);

  const handleNavigate = (location: string) => {
    if (shouldNavigateConfirm) setOpen(true);
    else navigate(location);
  }

  return (
    <div>
      {withNav && <NavMenu />}
      <Toolbar sx={{ backgroundColor: "#fff", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
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
          </Stack>
        </Stack>
      </Toolbar>
      <Box sx={{ height: 64 }} />
      <Container sx={{ display: 'flex', ...sx, }} maxWidth={fullWidth ? false : maxWidth || 'lg'} {...rest}>
        {withNav && <Box sx={{ width: 240, flexShrink: 0 }}></Box>} {/* nav menu spacer */}
        <Box sx={{ p: 3, flexGrow: 1, height: "calc(100vh - 64px)", overflowY: "scroll" }}>
          {
            errorMessage &&
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMessage}
            </Alert>
          }
          {children}
        </Box>
        <NavigateConfirmationModal open={open} setOpen={setOpen} />
      </Container>
    </div>
  )
}

export default observer(Page);