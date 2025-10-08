import { Menu } from "@mui/icons-material";
import { Alert, Avatar, Box, Container, ContainerProps, IconButton, Stack, Toolbar, useMediaQuery } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceProvider } from "../../services/ServiceProvider";
import theme, { primaryGradient } from "../../theme";
import NotificationBellButton from "../notifications/NotificationBellButton";
import FreeTrialBanner from "./FreeTrialBanner";
import NavMenu from "./NavMenu";
import NavigateConfirmationModal from "./NavigateConfirmationModal";

interface PageProps extends ContainerProps {
  children: React.ReactNode;
  withNav?: boolean;
  fullWidth?: boolean;
}

function Page({ children, withNav, maxWidth, fullWidth, sx, ...rest }: PageProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { accountStore: { myProfile }, applicationStore: { errorMessage, shouldNavigateConfirm } } = useServiceProvider();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleNavigate = (location: string) => {
    if (shouldNavigateConfirm) setOpen(true);
    else navigate(location);
  }


  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <div>
      {
        withNav &&
        <NavMenu
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        />
      }
      <Toolbar sx={{ backgroundColor: "#fff", position: "relative", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Stack spacing={1} sx={{ width: '100%', py: { xs: 2, md: 0 } }}>
          <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
            <img src="/logo.png" height={40} alt="Medic launch" style={{ cursor: 'pointer' }} onClick={() => handleNavigate("/")} />
            <Stack direction="row" alignItems="center" spacing={2}>
              <FreeTrialBanner sx={{ display: { xs: 'none', md: 'block' } }} />
              <div onClick={() => handleNavigate("/notifications")}>
                <NotificationBellButton />
              </div>
              <div onClick={() => handleNavigate("/my-profile")} style={{ cursor: 'pointer' }}>
                <Avatar sx={{ background: primaryGradient }}>
                  {myProfile?.firstName.charAt(0)}{myProfile?.lastName.charAt(0)}
                </Avatar>
              </div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <Menu />
              </IconButton>
            </Stack>
          </Stack>
          <FreeTrialBanner sx={{ display: { xs: 'block', md: 'none' }, pt: 1 }} />
        </Stack>
      </Toolbar>
      <Container sx={{ display: 'flex', ...sx, }} maxWidth={fullWidth ? false : maxWidth || 'lg'} {...rest}>
        {withNav && <Box sx={{ width: 240, flexShrink: 0, display: { xs: 'none', md: 'block' } }}></Box>} {/* nav menu spacer */}
        <Box sx={{ py: 2, flexGrow: 1, height: "calc(100vh - 64px)", overflowY: "scroll" }}>
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