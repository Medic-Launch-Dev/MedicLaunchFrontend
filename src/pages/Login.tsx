import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { primaryGradient, primaryGradientText } from "../theme";
import { useAuth } from "../services/AuthProvider";
import { useState } from "react";
// import { useAuth } from "./services/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const isAuthenticated = await login(email, password);

    if (isAuthenticated) {
      navigate("/");
    } else {
      console.error("Authentication failed");
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item lg={7} sx={{ height: "100%" }}>
        <Stack
          sx={{ m: "auto", height: "100%" }}
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
              <Button
                variant="contained"
                fullWidth
                sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
                onClick={handleLogin}
              >
                Log in
              </Button>
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
        sx={{ height: "100%", background: primaryGradient }}
      ></Grid>
    </Grid>
  );
}
