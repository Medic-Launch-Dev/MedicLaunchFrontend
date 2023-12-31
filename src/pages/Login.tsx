import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { primaryGradient, primaryGradientText } from "../theme";

export default function Login() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item lg={7} sx={{ height: "100%" }}>
        <Stack sx={{ m: "auto", mt: -8, height: "100%" }} alignItems="center" justifyContent="center" spacing={2}>
          <Box maxWidth="sm">
            <Typography variant="h1" sx={primaryGradientText} fontSize={36} fontWeight={500} textAlign="center">
              Login
            </Typography>
            <Typography variant="body1" color="#828282" fontSize={16} textAlign="center" sx={{ mt: 1 }}>
              Enter your credentials to access your account
            </Typography>
            <TextField fullWidth label="Email address" sx={{ mt: 6 }} />
            <TextField fullWidth label="Password" sx={{ mt: 3 }} />
            <Stack direction="row" justifyContent="end" alignItems="end" width="100%" sx={{ mt: 1 }}>
              <Typography>Forgot password?</Typography>
            </Stack>
            <Stack spacing={2} width="100%" alignItems="center" sx={{ mt: 4 }}>
              <Button variant="contained" fullWidth sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}>Log in</Button>
              <Typography>Don't have an account? <Link to="/register" style={{ textDecoration: "none", color: "#2394c4" }}>Register here</Link></Typography>
            </Stack>
          </Box>
        </Stack>
      </Grid>
      <Grid item lg={5} sx={{ height: "100%", background: primaryGradient }}>
      </Grid>

    </Grid>
  )
}