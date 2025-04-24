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

interface FormValues {
  email: string;
  password: string;
  graduationYear: string;
  university: string;
  firstName: string;
  lastName: string;
  howDidYouHearAboutUs: string;
  confirmPassword: string;
  phoneNumber: string;
  subscribeToPromotions: boolean;
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
    .oneOf([yup.ref('password')], 'Passwords must match'),
  graduationYear: yup
    .string()
    .matches(/^\d{4}$/, "Graduation must be a valid year")
});

export default function Register() {
  const navigate = useNavigate();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      graduationYear: "",
      university: "",
      firstName: "",
      lastName: "",
      howDidYouHearAboutUs: "",
      confirmPassword: "",
      phoneNumber: "",
      subscribeToPromotions: false
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const customHowDidYouHearAboutUs = formik.values.howDidYouHearAboutUs === "Other" || formik.values.howDidYouHearAboutUs === "Friend Referral";

  async function handleSubmit(values: FormValues) {
    try {
      const userData: MedicLaunchUser = {
        email: values.email,
        password: values.password,
        graduationYear: Number(values.graduationYear),
        university: values.university,
        firstName: values.firstName,
        lastName: values.lastName,
        howDidYouHearAboutUs: customHowDidYouHearAboutUs ? howDidYouHearAboutUs : values.howDidYouHearAboutUs,
        phoneNumber: values.phoneNumber,
        subscribeToPromotions: values.subscribeToPromotions,
      };

      const successfullyRegistered = await userStore.createUser(userData);
      if (successfullyRegistered)
        navigate(`/confirm-email?email=${encodeURIComponent(values.email)}`);
    } catch (e) {
      console.error(e);
      showSnackbar('Registration failed', 'error');
    }
  }

  const requiredFieldsAreEmpty = () => {
    const requiredFields = Object.values(formik.values);
    return requiredFields.some((value) => value === "");
  };

  return (
    <>
      <Snackbar {...snackbarProps} />
      <Grid container sx={{ height: "100vh" }}>
        <Grid item lg={7} xs={12} sx={{ height: "100%", maxWidth: 600 }}>
          <Stack
            sx={{ m: "auto", minHeight: "100%", py: 2 }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Box sx={{ position: { md: "fixed", xs: "relative" }, top: 24, left: { xs: 0, md: 24 } }}>
              <img src="/logo.png" width={140} />
            </Box>
            <Box sx={{ display: { xs: "block", md: "none" }, height: 24 }} />
            <Box maxWidth="md" px={2}>
              <form onSubmit={formik.handleSubmit}>
                <Typography
                  variant="h1"
                  sx={{ ...primaryGradientText, flexShrink: 0, pb: 4 }}
                  fontSize={36}
                  fontWeight={500}
                  textAlign="center"
                >
                  Register
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="phoneNumber"
                      label="Mobile Number"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="university"
                      label="University"
                      value={formik.values.university}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="graduationYear"
                      label="Graduation year"
                      value={formik.values.graduationYear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="number"
                      error={formik.touched.graduationYear && Boolean(formik.errors.graduationYear)}
                      helperText={formik.touched.graduationYear && formik.errors.graduationYear}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="select-label">How did you hear about us</InputLabel>
                      <Select
                        labelId="select-label"
                        value={formik.values.howDidYouHearAboutUs}
                        label="How did you hear about us"
                        onChange={e => {
                          formik.setFieldValue("howDidYouHearAboutUs", e.target.value as string)
                          if (customHowDidYouHearAboutUs) setHowDidYouHearAboutUs("");
                        }}
                      >
                        <MenuItem value={"Internet Search"}>Internet Search</MenuItem>
                        <MenuItem value={"Facebook"}>Facebook</MenuItem>
                        <MenuItem value={"Instagram"}>Instagram</MenuItem>
                        <MenuItem value={"X"}>X</MenuItem>
                        <MenuItem value={"LinkedIn"}>LinkedIn</MenuItem>
                        <MenuItem value={"Friend Referral"}>Friend Referral</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {
                      customHowDidYouHearAboutUs &&
                      <TextField
                        fullWidth
                        label={formik.values.howDidYouHearAboutUs === "Friend Referral" ? "Friend's email" : "Please specify"}
                        value={howDidYouHearAboutUs}
                        onChange={(e) => setHowDidYouHearAboutUs(e.target.value)}
                        required
                      />
                    }
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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
                        <MuiLink href="https://comprehensive-choices-886902.framer.app/terms" target="_blank" rel="noreferrer">
                          Terms & Conditions
                        </MuiLink>
                        &nbsp;and&nbsp;
                        <MuiLink href="https://comprehensive-choices-886902.framer.app/privacy" target="_blank" rel="noreferrer">
                          Privacy Policy
                        </MuiLink>
                      </div>
                    }
                  />
                  <AgreementCheckbox
                    text="Send me updates and promotions via email/text"
                    checked={formik.values.subscribeToPromotions}
                    onChange={e => formik.setFieldValue("subscribeToPromotions", e.target.checked)}
                  />
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
                    disabled={!formik.isValid || requiredFieldsAreEmpty() || !agreedToTerms || (customHowDidYouHearAboutUs && !howDidYouHearAboutUs)}
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
      </Grid >
    </>
  );
}
