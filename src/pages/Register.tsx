import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AgreementCheckbox from "../components/register/AgreementCheckbox";
import UniversitySelect from "../components/register/UniversitySelect";
import { primaryGradient, primaryGradientText, unstyledLink } from "../theme";

export default function Login() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item lg={7} sx={{ height: "100%", maxWidth: 600 }}>
        <Stack sx={{ m: "auto", height: "100%" }} alignItems="center" justifyContent="center" spacing={2}>
          <Box maxWidth="md" width="100%" px={12}>
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
                <TextField fullWidth label="Email" />
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
                <TextField fullWidth label="Password" />
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
              <Button
                variant="outlined"
                sx={{ fontSize: 16, fontWeight: 500, py: 1.5 }}
                startIcon={<ChevronLeft />}
              >
                <Link to="/login" style={unstyledLink}>
                  Back
                </Link>
              </Button>
              <Button
                variant="contained"
                sx={{ fontSize: 16, fontWeight: 500, py: 1.5, px: 6 }}
                endIcon={<ChevronRight />}
              >
                Register
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Grid>
      <Grid item lg={5} sx={{ height: "100%", background: primaryGradient }}>
      </Grid>

    </Grid>
  )
}