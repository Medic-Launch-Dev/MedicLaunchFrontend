import { Box, Card, CircularProgress, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { ClinicalCase } from "../models/ClinicalCaseCapture";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";
import { ChevronLeft } from "@mui/icons-material";

function ClinicalCaseView() {
  const { id } = useParams<{ id: string }>();
  const { clinicalCaseCaptureStore, accountStore } = useServiceProvider();
  const { hasStudentAccess, isLoading } = accountStore;
  const [clinicalCase, setClinicalCase] = useState<ClinicalCase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCase() {
      if (!id) return;
      setLoading(true);
      try {
        const cases = await clinicalCaseCaptureStore.getAllClinicalCases();
        const found = cases.find(c => c.id === id);
        setClinicalCase(found || null);
      } finally {
        setLoading(false);
      }
    }
    fetchCase();
  }, [id, clinicalCaseCaptureStore]);

  if (!isLoading && hasStudentAccess === false) return <Navigate to="/trial-expired" />;
  if (!id) return <Navigate to="/clinical-cases" />;

  return (
    <Page withNav maxWidth="md">
      <Stack direction="row" alignItems="center" mb={3}>
        <LinkButton to="/clinical-cases" variant="text" startIcon={<ChevronLeft />}>
          Back to Cases
        </LinkButton>
      </Stack>
      <Card sx={{ p: 4 }}>
        {loading ? (
          <Stack alignItems="center" my={5}>
            <CircularProgress />
          </Stack>
        ) : clinicalCase ? (
          <Stack spacing={2}>
            <Typography variant="h3" mb={2}>{clinicalCase.title}</Typography>
            <Box dangerouslySetInnerHTML={{ __html: clinicalCase.caseDetails }} />
          </Stack>
        ) : (
          <Typography color="textSecondary" align="center" my={5}>
            Clinical case not found.
          </Typography>
        )}
      </Card>
    </Page>
  );
}

export default observer(ClinicalCaseView);
