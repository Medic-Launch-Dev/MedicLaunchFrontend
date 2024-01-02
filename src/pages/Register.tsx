import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import AgreementCheckbox from "../components/register/AgreementCheckbox";
import UniversitySelect from "../components/register/UniversitySelect";
import { primaryGradient, primaryGradientText, unstyledLink } from "../theme";

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 characters')
    .required('Password is required'),
});


export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item lg={7} sx={{ height: "100%", maxWidth: 600 }}>
        <Stack sx={{ m: "auto", height: "100%" }} alignItems="center" justifyContent="center" spacing={2}>
          <Box maxWidth="md" width="100%" px={12}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h1" sx={primaryGradientText} fontSize={36} fontWeight={500} textAlign="center">
                Register
              </Typography>

              <Grid container spacing={3} mt={3}>
                <Grid item md={6}>
                  <TextField fullWidth label="First name" />
                </Grid>
                <Grid item md={6}>
                  <TextField fullWidth label="Last name" />
                </Grid>
                <Grid item md={6}>
                  <TextField fullWidth label="Display name" />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    id="email"
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
                  <UniversitySelect />
                </Grid>
                <Grid item md={6}>
                  <TextField fullWidth label="Graduation year" />
                </Grid>
                <Grid item md={6}>
                  <TextField fullWidth label="City" />
                </Grid>
                <Grid item md={6}>
                  <TextField fullWidth label="How did you hear about us" />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    id="password"
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
                  <TextField fullWidth label="Confirm password" />
                </Grid>
              </Grid>
              <Stack mt={3}>
                <AgreementCheckbox text="I agree to Terms & Conditions and Privacy Policy" />
                <AgreementCheckbox text="Send me updates and promotions via email/text" />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mt={3}>
                <Link to="/login" style={unstyledLink}>
                  <Button
                    variant="outlined"
                    sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
                    startIcon={<ChevronLeft />}
                  >
                    Back
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  sx={{ fontSize: 16, fontWeight: 500, py: 1.5, px: 6 }}
                  endIcon={<ChevronRight />}
                  disabled={!formik.isValid}
                  type="submit"
                >
                  Register
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Grid>
      <Grid item lg={5} sx={{ height: "100%", background: primaryGradient }}>
      </Grid>

    </Grid>
  )
}