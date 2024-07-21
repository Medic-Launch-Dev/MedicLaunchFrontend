import { Add, DeleteOutline } from "@mui/icons-material";
import { Button, Card, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Page from "../components/nav/Page";
import EditNoteDialog from "../components/notes/EditNoteDialog";
import LinkButton from "../components/util/LinkButton";
import { Note } from "../models/Note";
import Speciality from "../models/Speciality";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";
import { formatDate } from "../utils/DateTimeUtils";

function RevisionNotes() {
  let [searchParams] = useSearchParams();
  const defaultSpeciality = searchParams.get('speciality');

  const { questionsStore, notesStore } = useServiceProvider();
  const { notes } = notesStore
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>();
  const [open, setOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [notes, selectedSpeciality]);

  async function init() {
    const specialities = await questionsStore.getSpecialities();
    setSpecialities(specialities);
    if (defaultSpeciality) {
      setSelectedSpeciality(defaultSpeciality);
    } else {
      setSelectedSpeciality(specialities[0]?.id);
    }

    await notesStore.getAllNotes();
  }

  function filterNotes() {
    if (selectedSpeciality) {
      setFilteredNotes(notes.filter(note => note.speciality?.id === selectedSpeciality));
    } else {
      setFilteredNotes(notes);
    }
  }

  const handleOpen = (note?: Note) => {
    setCurrentNote(note);
    setOpen(true);
  }

  async function deleteNote(noteId?: string) {
    if (!noteId) return;
    await notesStore.deleteNoteById(noteId);
    await notesStore.getAllNotes();
  }

  return (
    <Page sx={{ pt: 2 }}>
      <EditNoteDialog
        open={open}
        onClose={() => setOpen(false)}
        note={currentNote}
        specialityId={currentNote?.specialityId || selectedSpeciality}
        questionId={currentNote?.questionId}
        flashcardId={currentNote?.flashcardId}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <LinkButton to="/">
          Study Portal
        </LinkButton>
        <Typography variant="h2" sx={primaryGradientText} align="center">
          Revision Notes Summary
        </Typography>
        <Button variant="contained" sx={{ visibility: "hidden" }}>Add Note</Button>
      </Stack>

      <Card>
        <Typography variant="h3" sx={primaryGradientText}>Notes</Typography>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
          <FormControl size="small">
            <InputLabel id="speciality-select-label">Speciality</InputLabel>
            <Select
              size="small"
              sx={{ width: 240 }}
              label="Speciality"
              value={selectedSpeciality || ""}
              onChange={e => setSelectedSpeciality(e.target.value as string)}
            >
              {specialities.map(speciality => <MenuItem value={speciality.id} key={speciality.id}>{speciality.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
            Add Note
          </Button>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={120}>Date added</TableCell>
              <TableCell style={{ minWidth: 500 }}>Notes</TableCell>
              <TableCell width={160}>Speciality</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredNotes.length > 0 ?
                filteredNotes.map((note) => {
                  return (
                    <TableRow key={note.id}>
                      <TableCell>{formatDate(note.createdOn)}</TableCell>
                      <TableCell>
                        {note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content}
                      </TableCell>
                      <TableCell>{note.speciality?.name}</TableCell>
                      <TableCell><Button variant="contained" onClick={() => handleOpen(note)}>View</Button></TableCell>
                      <TableCell>
                        <IconButton onClick={() => deleteNote(note.id)}>
                          <DeleteOutline color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
                :
                <TableRow>
                  <TableCell colSpan={5}>
                    <Stack alignItems="center" my={3}>
                      No notes in this cateogry
                    </Stack>
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </Card>
    </Page>
  )
}

export default observer(RevisionNotes);