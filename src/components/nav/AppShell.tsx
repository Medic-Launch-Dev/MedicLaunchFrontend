import { Notifications } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Stack, Toolbar } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";

export default function AppShell() {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100vh" }}>
      <Toolbar sx={{ backgroundColor: "#fff" }}>
        <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
          <img src={Logo} height={40} alt="Medic launch" style={{ cursor: 'pointer' }} onClick={() => navigate("/")} />
          <Stack direction="row" alignItems="center" spacing={2}>
            <Badge badgeContent={4} color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  right: 5,
                  top: 5,
                }
              }}
            >
              <Link to="/notifications">
                <IconButton>
                  <Notifications />
                </IconButton>
              </Link>
            </Badge>
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