import { Logout } from "@mui/icons-material";
import { Box, Button, Drawer, DrawerProps, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMatch, useNavigate } from "react-router-dom";
import LogoWhite from "../../assets/logo-white.svg";
import { useAuth } from "../../services/AuthProvider";
import { useServiceProvider } from "../../services/ServiceProvider";
import NavLink from "./NavLink";

interface NavMenuProps extends DrawerProps { }

function NavMenu({ sx, ...rest }: NavMenuProps) {
  const { accountStore: { hasAdminAccess, hasAuthorAccess } } = useServiceProvider();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const matchHome = useMatch("/");
  const matchClinicalCompanion = useMatch("/clinical-companion/*");
  const matchCaseCapture = useMatch("/clinical-cases/*");
  const matchMyProfile = useMatch("/my-profile");
  const matchAuthorPortal = useMatch("/author-portal");
  const matchUserManagement = useMatch("/user-management");

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          backgroundColor: "#1f263e",
          width: 240,
          boxSizing: 'border-box',
          border: 'none'
        },
        ...sx
      }}
      anchor="left"
      {...rest}
    >
      <Stack alignItems="center" justifyContent="space-between" height="100%">
        <div style={{ width: '100%' }}>
          <Box sx={{ m: 4 }}>
            <img src={LogoWhite} width={120} />
          </Box>
          <Stack sx={{ width: '100%', pt: 4 }} gap={0.5}>
            <NavLink text="Study Portal" selected={!!matchHome} href="/" />
            <NavLink text="Clinical Companion" selected={!!matchClinicalCompanion} href="/clinical-companion" />
            <NavLink text="Case Capture" selected={!!matchCaseCapture} href="/clinical-cases" tag="New" />
            <NavLink text="My Profile" selected={!!matchMyProfile} href="/my-profile" />
            <NavLink text="Community" href="https://medic-launch.circle.so/" external />
            {hasAuthorAccess && <NavLink text="Author Portal" selected={!!matchAuthorPortal} href="/author-portal" />}
            {hasAdminAccess && <NavLink text="User Management" selected={!!matchUserManagement} href="/user-management" />}
          </Stack>
        </div>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ width: '80%', mb: 4, color: "#1f263e", ":hover": { backgroundColor: "#d9dce7" } }}
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Stack>
    </Drawer>
  )
}

export default observer(NavMenu);