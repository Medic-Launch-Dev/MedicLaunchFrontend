// New page for managing saved clinical cases, similar to RevisionNotes UI
import { Add } from "@mui/icons-material";
import { Button, Card, Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { ClinicalCase } from "../models/ClinicalCaseCapture";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";
import useExtensions from "../components/tiptap/useExtensions";
import { RichTextReadOnly } from "mui-tiptap";
import DeleteClinicalCaseButton from "../components/clinicalCases/DeleteClinicalCaseButton";

function ClinicalCases() {
  const { clinicalCaseCaptureStore, accountStore } = useServiceProvider();
  const { hasStudentAccess, isLoading } = accountStore;
  const [cases, setCases] = useState<ClinicalCase[]>([]);

  const extensions = useExtensions({
    placeholder: ""
  });

  useEffect(() => {
    fetchCases();
  }, []);

  function getCaseTextWithoutHTML(text: string) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = text;
    return tempContainer.innerText;
  }

  async function fetchCases() {
    const data = await clinicalCaseCaptureStore.getAllClinicalCases();
    setCases(data);
  }

  if (!isLoading && hasStudentAccess === false) return <Navigate to="/trial-expired" />;

  return (
    <Page sx={{ pt: 2 }} withNav maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <LinkButton to="/">
          Study Portal
        </LinkButton>
        <Typography variant="h2" sx={primaryGradientText} align="center">
          Clinical Case Capture
        </Typography>
        <LinkButton to="/" sx={{ visibility: 'hidden' }}>
          Study Portal
        </LinkButton>
      </Stack>
      <Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" >
          <Typography variant="h3" sx={primaryGradientText}>Generated Cases</Typography>
          <LinkButton to="/clinical-cases/generate" variant="contained" startIcon={<Add />}>Generate New Case</LinkButton>
        </Stack>
        <Divider sx={{ mt: 2 }} />
        <Table sx={{}}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Case Details</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.length > 0 ?
              cases.map((clinicalCase) => (
                <TableRow key={clinicalCase.id}>
                  <TableCell sx={{ minWidth: 280 }}>{clinicalCase.title}</TableCell>
                    <TableCell>
                      {clinicalCase.createdOn
                        ? new Date(clinicalCase.createdOn).toLocaleDateString()
                        : "—"}
                    </TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                      }}
                    >
                      {getCaseTextWithoutHTML(clinicalCase.caseDetails)}
                    </div>
                  </TableCell>
                  <TableCell width={75}>
                    <Button
                      variant="contained"
                      component="a"
                      href={`/clinical-cases/${clinicalCase.id}`}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell width={40}>
                    <DeleteClinicalCaseButton
                      caseId={clinicalCase.id!}
                      onDeleted={fetchCases}
                    />
                  </TableCell>
                </TableRow>
              )) :
              <TableRow>
                <TableCell colSpan={5}>
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
