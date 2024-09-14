import { LoadingButton } from "@mui/lab";
import { Box, Grid, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSnackbar } from "../hooks/useSnackbar";
import { useAuth } from "../services/AuthProvider";
import { primaryGradient, primaryGradientText } from "../theme";

export default function Login() {
  const { showSnackbar, snackbarProps } = useSnackbar();
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const isAuthenticated = await login(values.email, values.password);
        if (isAuthenticated) navigate("/");
      } catch (e) {
        console.error(e);
        showSnackbar("Login failed", "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Snackbar {...snackbarProps} />
      <Grid container sx={{ height: "100vh" }}>
        <Grid item lg={7} sx={{ height: "100%" }}>
          <Stack
            sx={{ m: "auto", minHeight: "100%", py: 2, position: "relative" }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <img src="https://mediclaunch.co.uk/wp-content/uploads/2021/07/Final-Logo.png" width={140} style={{ position: "absolute", top: 24, left: 24 }} />
            <Box maxWidth="sm">
              <Typography
                variant="h1"
                sx={{ ...primaryGradientText, flexShrink: 0, pb: 2 }}
                fontSize={36}
                fontWeight={500}
                textAlign="center"
              >
                Login
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  label="Email address"
                  name="email"
                  sx={{ mt: 6 }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  sx={{ mt: 3 }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                {/* <Stack
                  direction="row"
                  justifyContent="end"
                  alignItems="end"
                  width="100%"
                  sx={{ mt: 1 }}
                >
                  <Typography fontSize={14}>Forgot password?</Typography>
                </Stack> */}
                <Stack spacing={2} width="100%" alignItems="center" sx={{ mt: 4 }}>
                  <LoadingButton
                    variant="contained"
                    fullWidth
                    sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
                    type="submit"
                    loading={formik.isSubmitting}
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
              </form>
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          lg={5}
          sx={{ height: "100%", background: primaryGradient }}
        ></Grid>
      </Grid>
    </>
  );
}
