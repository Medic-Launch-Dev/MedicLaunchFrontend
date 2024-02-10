import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import AgreementCheckbox from "../components/register/AgreementCheckbox";
import { useSnackbar } from "../hooks/useSnackbar";
import { MedicLauncUser } from "../models/User";
import userStore from "../stores/userStore";
import { primaryGradient, primaryGradientText, unstyledLink } from "../theme";

interface FormValues {
  email: string;
  password: string;
  city: string;
  graduationYear: string;
  university: string;
  firstName: string;
  lastName: string;
  displayName: string;
  howDidYouHearAboutUs: string;
  confirmPassword: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email"),
  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
      "Passwords must contain at least one upper case letter, one lower case letter, one digit, and one special character (e.g. @, !, ?)."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
});

export default function Register() {
  const navigate = useNavigate();
  const { showSnackbar, snackbarProps } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      city: "",
      graduationYear: "",
      university: "",
      firstName: "",
      lastName: "",
      displayName: "",
      howDidYouHearAboutUs: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: FormValues) {
    try {
      const userData: MedicLauncUser = {
        email: values.email,
        password: values.password,
        city: values.city,
        graduationYear: Number(values.graduationYear),
        university: values.university,
        firstName: values.firstName,
        lastName: values.lastName,
        displayName: values.displayName,
        howDidYouHearAboutUs: values.howDidYouHearAboutUs,
      };

      const successfullyRegistered = await userStore.createUser(userData);
      if (successfullyRegistered) navigate("/login");
    } catch (e) {
      console.error(e);
      showSnackbar('Registration failed', 'error');
    }
  }

  const requiredFieldsAreEmpty = () => {
    const requiredFields = Object.values(formik.values);
    return requiredFields.some((value) => value === "");
  };

  console.log(requiredFieldsAreEmpty());

  return (
    <>
      <Snackbar {...snackbarProps} />
      <Grid container sx={{ height: "100vh" }}>
        <Grid item lg={7} xs={12} sx={{ height: "100%", maxWidth: 600 }}>
          <Stack
            sx={{ m: "auto", minHeight: "100%", py: 5 }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Box maxWidth="md" width="100%" px={12}>
              <form onSubmit={formik.handleSubmit}>
                <Typography
                  variant="h1"
                  sx={primaryGradientText}
                  fontSize={36}
                  fontWeight={500}
                  textAlign="center"
                >
                  Register
                </Typography>

                <Grid container spacing={3} mt={3}>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      name="displayName"
                      label="Display name"
                      value={formik.values.displayName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      name="university"
                      label="University"
                      value={formik.values.university}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      name="graduationYear"
                      label="Graduation year"
                      value={formik.values.graduationYear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      name="city"
                      label="City"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      name="howDidYouHearAboutUs"
                      label="How did you hear about us"
                      value={formik.values.howDidYouHearAboutUs}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item md={6}>
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
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      name="confirmPassword"
                      label="Confirm password"
                      type="password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                  </Grid>
                </Grid>
                <Stack mt={3}>
                  <AgreementCheckbox text="I agree to Terms & Conditions and Privacy Policy" />
                  <AgreementCheckbox text="Send me updates and promotions via email/text" />
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  mt={3}
                >
                  <Link to="/login" style={unstyledLink}>
                    <Button
                      variant="outlined"
                      sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
                      startIcon={<ChevronLeft />}
                    >
                      Back
                    </Button>
                  </Link>
                  <LoadingButton
                    variant="contained"
                    sx={{ fontSize: 16, fontWeight: 500, py: 1.5, px: 6 }}
                    endIcon={<ChevronRight />}
                    disabled={!formik.isValid || requiredFieldsAreEmpty()}
                    loading={formik.isSubmitting}
                    type="submit"
                  >
                    Register
                  </LoadingButton>
                </Stack>
              </form>
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
