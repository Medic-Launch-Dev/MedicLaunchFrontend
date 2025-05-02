import { LoadingButton } from "@mui/lab";
import { Snackbar, Stack, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthLayout from "../components/auth/AuthLayout";
import { useSnackbar } from "../hooks/useSnackbar";
import { useAuth } from "../services/AuthProvider";

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
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
      password: Yup.string()
        .required("Password is required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const isAuthenticated = await login(values.email, values.password);
        if (isAuthenticated) navigate("/");
      } catch (e: any) {
        console.error(e);
        if (e.response?.data?.detail === "Email not confirmed") {
          navigate(`/confirm-email?email=${encodeURIComponent(values.email)}`);
        } else {
          showSnackbar("Login failed", "error");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const requiredFieldsAreEmpty = () => {
    const requiredFields = Object.values(formik.values);
    return requiredFields.some((value) => value === "");
  };

  return (
    <>
      <Snackbar {...snackbarProps} />

      <AuthLayout title="Log in" subtitle="Welcome back, please enter your details below.">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email address"
            name="email"
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
            sx={{ mt: 2 }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Stack
            direction="row"
            justifyContent="end"
            alignItems="end"
            width="100%"
            sx={{ mt: 1 }}
          >
            <Link
              to="/forgot-password"
              style={{ textDecoration: "none", color: "#2394c4" }}
            >
              Forgot password?
            </Link>
          </Stack>
          <Stack spacing={3} width="100%" alignItems="center" sx={{ mt: 2 }}>
            <LoadingButton
              variant="contained"
              fullWidth
              sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
              type="submit"
              loading={formik.isSubmitting}
              disabled={!formik.isValid || requiredFieldsAreEmpty()}
            >
              Log in
            </LoadingButton>
            <Stack spacing={1} alignItems="center">
              <Typography sx={{ color: grey[700] }}>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#2394c4" }}
                >
                  Sign up here
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </form>
      </AuthLayout>
    </>
  );
}
