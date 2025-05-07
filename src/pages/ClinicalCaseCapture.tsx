import { AutoAwesome } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, CircularProgress, Grid, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Page from "../components/nav/Page";
import { useSnackbar } from "../hooks/useSnackbar";
import { ClinicalCaseDetails } from "../models/ClinicalCaseCapture";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";
import LinkButton from "../components/util/LinkButton";
import { observer } from "mobx-react-lite";

function ClinicalCaseCapture() {
  const [caseDetails, setCaseDetails] = useState<ClinicalCaseDetails>({
    patientDemographics: "",
    clinicalContext: "",
    presentingComplaint: "",
    symptoms: "",
    complaintHistory: "",
  });
  const [loading, setLoading] = useState(false);
  const [generatedCase, setGeneratedCase] = useState<string | null>(null);
  const { showSnackbar, snackbarProps } = useSnackbar();
  const { clinicalCaseCaptureStore, accountStore } = useServiceProvider();
  const { hasStudentAccess, trialClinicalCasesLimitReached, loadingProfile } = accountStore;

  const handleChange = (field: keyof ClinicalCaseDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaseDetails({ ...caseDetails, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trialClinicalCasesLimitReached) return;

    setLoading(true);
    setGeneratedCase(null);
    try {
      const data = await clinicalCaseCaptureStore.generateClinicalCase(caseDetails);
      setGeneratedCase(data);
    } catch (err) {
      showSnackbar("Failed to capture clinical case", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!loadingProfile && hasStudentAccess !== true) return <Navigate to="/trial-expired" />;

  return (
    <Page withNav maxWidth="xl">
      <Snackbar {...snackbarProps} />
      <Typography variant="h2" style={primaryGradientText} mb={3}>Clinical Case Capture</Typography>
      {
        trialClinicalCasesLimitReached &&
        <Alert
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
          severity="warning"
          action={
            <LinkButton to="/subscribe" size="small">
              Subscribe to Continue
            </LinkButton>
          }
        >

          You've reached the maximum number of cases you can generate while on a free trial.
        </Alert>
      }
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Patient Demographics"
                  value={caseDetails.patientDemographics}
                  onChange={handleChange("patientDemographics")}
                  placeholder="55-year-old male, retired taxi driver"
                  fullWidth
                  multiline
                  required
                />
                <TextField
                  label="Clinical Context"
                  value={caseDetails.clinicalContext}
                  onChange={handleChange("clinicalContext")}
                  placeholder="GP Clinic"
                  fullWidth
                  multiline
                  required
                />
                <TextField
                  label="Presenting Complaint"
                  value={caseDetails.presentingComplaint}
                  onChange={handleChange("presentingComplaint")}
                  placeholder="Chest pain"
                  fullWidth
                  multiline
                  required
                />
                <TextField
                  label="Symptoms"
                  value={caseDetails.symptoms}
                  onChange={handleChange("symptoms")}
                  placeholder="Chest tightness, sweating, nausea"
                  fullWidth
                  multiline
                  required
                />
                <TextField
                  label="Brief History of Presenting Complaint"
                  value={caseDetails.complaintHistory}
                  onChange={handleChange("complaintHistory")}
                  placeholder="1-2 sentence concise description of the complaint"
                  fullWidth
                  required
                  multiline
                  minRows={3}
                />
                <Stack alignItems="end">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                    disabled={trialClinicalCasesLimitReached}
                    startIcon={<AutoAwesome />}
                  >
                    Generate
                  </LoadingButton>
                </Stack>
              </Stack>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, minHeight: 300 }}>
            {
              loading &&
              <Stack alignItems="center" mt={10}>
                <CircularProgress />
                <Typography color="textSecondary" mt={2}>
                  Generating clinical case...
                </Typography>
              </Stack>
            }
            {!loading && generatedCase && (
              <Box dangerouslySetInnerHTML={{ __html: generatedCase }} />
            )}
            {!loading && !generatedCase && (
              <Typography color="textSecondary" align="center" mt={10}>
                No data yet. Fill in the form and submit to see results here.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
}

export default observer(ClinicalCaseCapture);