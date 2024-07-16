import { Logout } from "@mui/icons-material";
import { Box, Button, Drawer, Stack } from "@mui/material";
import { useMatch, useNavigate } from "react-router-dom";
import LogoWhite from "../../assets/logo-white.svg";
import { useAuth } from "../../services/AuthProvider";
import NavLink from "./NavLink";

export default function NavMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <Drawer
      sx={{
        width: 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          backgroundColor: "#1f263e",
          width: 300,
          boxSizing: 'border-box',
          border: 'none'
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <Stack alignItems="center" justifyContent="space-between" height="100%">
        <div style={{ width: '100%' }}>
          <Box sx={{ m: 4 }}>
            <img src={LogoWhite} width={140} />
          </Box>
          <Stack sx={{ width: '100%', pt: 4 }} gap={1.5}>
            <NavLink text="Study Portal" selected={!!useMatch("/")} href="/" />
            <NavLink text="My Profile" selected={!!useMatch("/my-profile")} href="/my-profile" />
            <NavLink text="Author Portal" selected={!!useMatch("/author-portal")} href="/author-portal" />
            <NavLink text="User Management" selected={!!useMatch("/user-management")} href="/user-management" />
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