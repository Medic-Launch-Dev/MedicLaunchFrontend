import { LoadingButton } from "@mui/lab";
import { Snackbar, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import AuthLayout from "../components/auth/AuthLayout";
import { useSnackbar } from "../hooks/useSnackbar";
import { useServiceProvider } from "../services/ServiceProvider";

const validationSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Passwords must be at least 6 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
      "Passwords must contain at least one upper case letter, one lower case letter, one digit, and one special character."
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref('password')], "Passwords must match"),
});

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [passwordWasReset, setPasswordWasReset] = useState(false);

  const email = searchParams.get('email');
  const code = searchParams.get('code');

  useEffect(() => {
    if (!email || !code) {
      navigate('/login');
    }
  }, [email, code, navigate]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: { password: string }) {
    try {
      if (!email || !code) return;

      await userStore.resetPassword(email, code, values.password);
      showSnackbar('Password reset successful, redirecting to login', 'success');
      setPasswordWasReset(true);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (e) {
      console.error(e);
      showSnackbar('Failed to reset password', 'error');
    }
  }

  return (
    <>
      <Snackbar {...snackbarProps} />
      <AuthLayout
        title="Reset Password"
        subtitle="Enter your new password below."
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              type="password"
              name="password"
              label="New Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              required
            />
            <TextField
              fullWidth
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              required
            />
            <LoadingButton
              variant="contained"
              fullWidth
              sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
              type="submit"
              loading={formik.isSubmitting || passwordWasReset}
            >
              Reset Password
            </LoadingButton>
          </Stack>
        </form>
      </AuthLayout>
    </>
  );
}
