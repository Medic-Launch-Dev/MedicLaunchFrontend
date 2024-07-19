import { LockOutlined } from "@mui/icons-material";
import { Card, Stack, Typography } from "@mui/material";
import LinkButton from "./LinkButton";

export default function Unauthorized() {
  return (
    <Stack alignItems="center" mt={4}>
      <Card sx={{ width: "max-content", p: 4, px: 8 }}>
        <Stack spacing={2} alignItems="center">
          <LockOutlined sx={{ color: "#353535", fontSize: 40 }} />
          <Typography variant="h4">Unauthorized</Typography>

          <Typography>
            You do not have permission to view this page.
          </Typography>

          <LinkButton to="/" variant="contained" sx={{ mt: 1 }}>Return to home</LinkButton>
        </Stack>
      </Card>
    </Stack>
  )
}