import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Link as MuiLink, Select, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import AgreementCheckbox from "../components/auth/AgreementCheckbox";
import { useSnackbar } from "../hooks/useSnackbar";
import { MedicLaunchUser } from "../models/User";
import userStore from "../stores/userStore";
import { primaryGradient, primaryGradientText, unstyledLink } from "../theme";
import AuthLayout from "../components/auth/AuthLayout";
import { grey } from "@mui/material/colors";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name must only contain letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name must only contain letters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Passwords must be at least 6 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
      "Passwords must contain at least one upper case letter, one lower case letter, one digit, and one special character (e.g. @, !, ?)."
    )
});

export default function Register() {
  const navigate = useNavigate();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: FormValues) {
    try {
      const userData: MedicLaunchUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };

      const successfullyRegistered = await userStore.createUser(userData);
      if (successfullyRegistered) navigate("/login");
    } catch (e) {
      console.error(e);
      showSnackbar('Registration failed', 'error');
    }
  }

  const requiredFieldsAreEmpty = () => {
    const requiredFields = formik.values;
    return Object.values(requiredFields).some((value) => value === "");
  };

  return (
    <>
      <Snackbar {...snackbarProps} />

      <AuthLayout title="Sign up" subtitle="Create your account to get started.">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                name="firstName"
                label="First name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
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
            </Grid>
          </Grid>
          <Stack mt={3}>
            <AgreementCheckbox
              checked={agreedToTerms}
              onChange={e => setAgreedToTerms(e.target.checked)}
              text={
                <div>I agree to&nbsp;
                  <MuiLink href="https://www.mediclaunch.com/terms" target="_blank" rel="noreferrer">
                    Terms & Conditions
                  </MuiLink>
                  &nbsp;and&nbsp;
                  <MuiLink href="https://www.mediclaunch.com/privacy" target="_blank" rel="noreferrer">
                    Privacy Policy
                  </MuiLink>
                </div>
              }
            />
          </Stack>
          <Stack spacing={3} width="100%" alignItems="center" sx={{ mt: 2 }}>
            <LoadingButton
              variant="contained"
              fullWidth
              sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
              type="submit"
              loading={formik.isSubmitting}
              disabled={!formik.isValid || requiredFieldsAreEmpty() || !agreedToTerms}
            >
              Register
            </LoadingButton>
            <Typography sx={{ color: grey[700]}}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#2394c4" }}
              >
                Log in here
              </Link>
            </Typography>
          </Stack>
        </form>
      </AuthLayout>
    </>
  );
}