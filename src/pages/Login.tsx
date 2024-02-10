import { LoadingButton } from "@mui/lab";
import { Box, Grid, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "../hooks/useSnackbar";
import { useAuth } from "../services/AuthProvider";
import { primaryGradient, primaryGradientText } from "../theme";
// import { useAuth } from "./services/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const { showSnackbar, snackbarProps } = useSnackbar();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const isAuthenticated = await login(email, password);
      if (isAuthenticated) navigate("/");
    } catch (e) {
      console.error(e);
      showSnackbar('Login failed', 'error')
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Snackbar {...snackbarProps} />
      <Grid container sx={{ height: "100vh" }}>
        <Grid item lg={7} xs={12} sx={{ height: "100%" }}>
          <Stack
            sx={{ m: "auto", minHeight: "100%", py: 5 }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Box maxWidth="sm">
              <Typography
                variant="h1"
                sx={primaryGradientText}
                fontSize={36}
                fontWeight={500}
                textAlign="center"
              >
                Login
              </Typography>
              <Typography
                variant="body1"
                color="#828282"
                fontSize={16}
                textAlign="center"
                sx={{ mt: 2 }}
              >
                Enter your credentials to access your account
              </Typography>
              <TextField
                fullWidth
                label="Email address"
                sx={{ mt: 6 }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                sx={{ mt: 3 }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Stack
                direction="row"
                justifyContent="end"
                alignItems="end"
                width="100%"
                sx={{ mt: 1 }}
              >
                <Typography fontSize={14}>Forgot password?</Typography>
              </Stack>
              <Stack spacing={2} width="100%" alignItems="center" sx={{ mt: 4 }}>
                <LoadingButton
                  variant="contained"
                  fullWidth
                  sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
                  onClick={handleLogin}
                  loading={loading}
                >
                  Log in
                </LoadingButton>
                <Typography>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "#2394c4" }}
                  >
                    Register here
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          lg={5}
          sx={{ height: "100%", background: primaryGradient, display: { xs: 'none', lg: 'block' } }}
        ></Grid>
      </Grid>
    </>
  );
}
