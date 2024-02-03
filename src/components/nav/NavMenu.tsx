import { Box, Drawer, Stack } from "@mui/material";
import LogoWhite from "../../assets/logo-white.svg";
import NavLink from "./NavLink";

export default function NavMenu() {
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
      <Stack alignItems="center">
        <Box sx={{ mt: 4 }}>
          <img src={LogoWhite} width={150} />
        </Box>
        <Stack sx={{ width: '100%', pt: 12 }} gap={2}>
          <NavLink text="Study Portal" selected href="/" />
          <NavLink text="My Profile" href="/" />
          <NavLink text="Author Portal" href="/edit-questions" />
        </Stack>
      </Stack>
    </Drawer>
  )
}