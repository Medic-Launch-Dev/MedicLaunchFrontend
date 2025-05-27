import { AutoAwesome, ChevronLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, CircularProgress, Grid, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { useSnackbar } from "../hooks/useSnackbar";
import { ClinicalCase, GenerateClinicalCase } from "../models/ClinicalCaseCapture";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

function ClinicalCaseCapture() {
  const [caseDetails, setCaseDetails] = useState<GenerateClinicalCase>({
    patientDemographics: "",
    clinicalContext: "",
    presentingComplaint: "",
    symptoms: "",
    complaintHistory: "",
  });
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [generatedCase, setGeneratedCase] = useState<ClinicalCase | null>(null);
  const { showSnackbar, snackbarProps } = useSnackbar();
  const { clinicalCaseCaptureStore, accountStore } = useServiceProvider();
  const { hasStudentAccess, trialClinicalCasesLimitReached, isLoading } = accountStore;
  const navigate = useNavigate();

  const handleChange = (field: keyof GenerateClinicalCase) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaseDetails({ ...caseDetails, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trialClinicalCasesLimitReached) return;

    setLoadingGenerate(true);
    setGeneratedCase(null);
    try {
      const data = await clinicalCaseCaptureStore.generateClinicalCase(caseDetails);
      setGeneratedCase(data);
    } catch (err) {
      showSnackbar("Failed to capture clinical case", "error");
    } finally {
      setLoadingGenerate(false);
    }
  };

  const handleSave = async () => {
    if (!generatedCase) return;
    try {
      setLoadingSave(true);
      const id = await clinicalCaseCaptureStore.createClinicalCase(generatedCase);
      if (id) {
        navigate(`/clinical-cases/${id}`);
      } else {
        showSnackbar("Failed to save clinical case", "error");
      }
    } catch (err) {
      showSnackbar("Failed to save clinical case", "error");
    } finally {
      setLoadingSave(false);
    }
  };

  if (!isLoading && hasStudentAccess !== true) return <Navigate to="/trial-expired" />;

  return (
    <Page withNav maxWidth="xl">
      <Snackbar {...snackbarProps} />
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <LinkButton to="/clinical-cases" variant="text" startIcon={<ChevronLeft />}>
          Back
        </LinkButton>
        <Typography variant="h2" style={primaryGradientText}>Clinical Case Capture</Typography>
      </Stack>
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
                    loading={loadingGenerate}
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
              loadingGenerate &&
              <Stack alignItems="center" mt={10}>
                <CircularProgress />
                <Typography color="textSecondary" mt={2}>
                  Generating clinical case...
                </Typography>
              </Stack>
            }
            {!loadingGenerate && generatedCase && (
              <Stack spacing={2}>
                <Stack direction="row" alignItems="top" justifyContent="space-between" spacing={1}>
                  <Typography variant="h3">
                    {generatedCase.title}
                  </Typography>
                  <LoadingButton
                    variant="contained"
                    sx={{ flexShrink: 0, height: "max-content" }}
                    onClick={handleSave}
                    loading={loadingSave}
                  >
                    Save
                  </LoadingButton>
                </Stack>
                <Box dangerouslySetInnerHTML={{ __html: generatedCase.caseDetails }} />
              </Stack>
            )}
            {!loadingGenerate && !generatedCase && (
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