import { LoadingButton } from "@mui/lab";
import { Snackbar, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AuthLayout from "../components/auth/AuthLayout";
import { useSnackbar } from "../hooks/useSnackbar";
import { useServiceProvider } from "../services/ServiceProvider";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { userStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit({ email }: { email: string }) {
    try {
      const success = await userStore.requestPasswordReset(email);
      if (success)
        showSnackbar('Password reset link sent', 'success');
      else
        showSnackbar('Failed to send password reset email', 'error');
    } catch (e) {
      console.error(e);
      showSnackbar('Failed to send reset email', 'error');
    }
  }

  return (
    <>
      <Snackbar {...snackbarProps} />
      <AuthLayout
        title="Reset Password"
        subtitle="Enter your email address and we'll send you a link to reset your password."
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              required
            />
            <LoadingButton
              variant="contained"
              fullWidth
              sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
              type="submit"
              loading={formik.isSubmitting}
              style={{ width: "100%" }}
            >
              Send Reset Link
            </LoadingButton>
          </Stack>
        </form>
      </AuthLayout>
    </>
  );
}
