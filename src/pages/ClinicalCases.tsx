// New page for managing saved clinical cases, similar to RevisionNotes UI
import { Add, DeleteOutline } from "@mui/icons-material";
import { Button, Card, Divider, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { ClinicalCase } from "../models/ClinicalCaseCapture";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

function ClinicalCases() {
  const { clinicalCaseCaptureStore, accountStore } = useServiceProvider();
  const { hasStudentAccess, isLoading } = accountStore;
  const [cases, setCases] = useState<ClinicalCase[]>([]);
  const [open, setOpen] = useState(false);
  const [currentCase, setCurrentCase] = useState<ClinicalCase | undefined>();

  useEffect(() => {
    fetchCases();
  }, []);

  async function fetchCases() {
    const data = await clinicalCaseCaptureStore.getAllClinicalCases();
    setCases(data);
  }

  const handleOpen = (clinicalCase?: ClinicalCase) => {
    setCurrentCase(clinicalCase);
    setOpen(true);
  };

  async function deleteCase(caseId?: string) {
    if (!caseId) return;
    await clinicalCaseCaptureStore.deleteClinicalCase(caseId);
    await fetchCases();
  }

  if (!isLoading && hasStudentAccess === false) return <Navigate to="/trial-expired" />;

  return (
    <Page sx={{ pt: 2 }}>
      {/* TODO: Add EditClinicalCaseDialog for editing/creating cases */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <LinkButton to="/">
          Study Portal
        </LinkButton>
        <Typography variant="h2" sx={primaryGradientText} align="center">
          Clinical Cases
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add Case
        </Button>
      </Stack>
      <Card>
        <Typography variant="h3" sx={primaryGradientText}>Saved Cases</Typography>
        <Divider sx={{ my: 2 }} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={120}>Title</TableCell>
              <TableCell style={{ minWidth: 500 }}>Case Details</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.length > 0 ?
              cases.map((clinicalCase) => (
                <TableRow key={clinicalCase.id}>
                  <TableCell>{clinicalCase.title}</TableCell>
                  <TableCell>
                    {clinicalCase.caseDetails.length > 100 ? clinicalCase.caseDetails.substring(0, 100) + '...' : clinicalCase.caseDetails}
                  </TableCell>
                  <TableCell><Button variant="contained" onClick={() => handleOpen(clinicalCase)}>View</Button></TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteCase(clinicalCase.id)}>
                      <DeleteOutline color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) :
              <TableRow>
                <TableCell colSpan={4}>
                  <Stack alignItems="center" my={3}>
                    No clinical cases saved
                  </Stack>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
}

export default observer(ClinicalCases);
