import { Add, DeleteOutline } from "@mui/icons-material";
import { Button, Card, Container, Divider, FormControl, IconButton, InputLabel, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RevisionNoteModal from "../components/revisionNotes/RevisionNoteModal";
import LinkButton from "../components/util/LinkButton";
import Speciality from "../models/Speciality";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

export default function RevisionNotes() {
  let [searchParams] = useSearchParams();
  const defaultSpeciality = searchParams.get('speciality');

  const { questionsStore } = useServiceProvider();
  const [specialities, setSpecialitiesList] = useState<Speciality[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>();
  const [open, setOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState<string>();

  let notes = new Array(10).fill(undefined);

  useEffect(() => {
    questionsStore.getSpecialities()
      .then((specialities) => {
        setSpecialitiesList(specialities);
        if (defaultSpeciality) setSelectedSpeciality(defaultSpeciality);
      })
      .catch(e => {
        console.error(e);
        // showSnackbar('Failed to get specialities', 'error');
      });
  }, []);

  const handleClickNewNote = () => {
    setDefaultValue('')
    setOpen(true);
  }

  const handleClickView = () => {
    setDefaultValue('A 30-year-old female presents with severe acne vulgaris that has been unresponsive to multiple treatment modalities, including topical retinoids and oral antibiotics...')
    setOpen(true);
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <RevisionNoteModal open={open} onClose={() => setOpen(false)} defaultValue={defaultValue} />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <LinkButton to="/">
          Study Portal
        </LinkButton>
        <Typography variant="h2" sx={primaryGradientText} align="center">
          Revision Notes Summary
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleClickNewNote}>
          Add Note
        </Button>
      </Stack>

      <Card>
        <Typography variant="h3" sx={primaryGradientText}>Notes</Typography>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="right">
          <FormControl size="small">
            <InputLabel id="demo-simple-select-label">Speciality</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              size="small"
              sx={{ width: 240 }}
              label="Speciality"
            />
          </FormControl>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={120}>Date added</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell width={160}>Speciality</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((p, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>1/12/23</TableCell>
                  <TableCell>
                    A 30-year-old female presents with severe acne vulgaris that has been unresponsive to multiple treatment modalities, including topical retinoids and oral antibiotics...
                  </TableCell>
                  <TableCell>Breast Cancer</TableCell>
                  <TableCell><Button variant="contained" onClick={handleClickView}>View</Button></TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteOutline color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>

    </Container>
  )
}