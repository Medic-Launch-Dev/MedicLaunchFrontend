import { Avatar, Box, Stack, Toolbar } from "@mui/material";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { Loading } from "../util/Loading";

export default function AppShell() {
  const navigate = useNavigate();
  const { state } = useNavigation();

  console.log(state);

  return (
    <Box sx={{ height: "100vh" }}>
      {state === "loading" && <Loading />}
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