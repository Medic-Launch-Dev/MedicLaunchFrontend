import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useServiceProvider } from "../../services/ServiceProvider";

interface FormValues {
  password: string;
  confirmPassword: string;
}

const validationSchema = yup.object({
  password: yup
    .string()
    .required("This is required")
    .min(6, "Passwords must be at least 6 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
      "Passwords must contain at least one upper case letter, one lower case letter, one digit, and one special character (e.g. @, !, ?)."
    ),
  confirmPassword: yup
    .string()
    .required("This is required")
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResetPasswordModal({ open, onClose }: EditProfileModalProps) {
  const { userStore, accountStore: { myProfile } } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: FormValues) {
    try {
      const passwordData = {
        userId: myProfile?.id,
        newPassword: values.password,
      };

      const success = await userStore.resetUserPassword(passwordData);
      if (success) showSnackbar("Password reset successfully", "success");
    } catch (error) {
      console.error("Failed to reset password", error);
      showSnackbar("Failed to reset password", "error");
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Snackbar {...snackbarProps} />
      <DialogTitle>Reset Password</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack sx={{ mt: 1 }} spacing={2}>
            <TextField
              fullWidth
              size="small"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              required
            />
            <TextField
              fullWidth
              size="small"
              name="confirmPassword"
              label="Confirm password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={!formik.isValid || !formik.values.password || !formik.values.confirmPassword}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}