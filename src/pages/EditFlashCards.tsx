import { Add } from "@mui/icons-material";
import { CircularProgress, Container, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LinkButton from "../components/util/LinkButton";
import TextSelect from "../components/util/TextSelect";
import { useSnackbar } from "../hooks/useSnackbar";
import { Flashcard } from "../models/Flashcard";
import Speciality from "../models/Speciality";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

const EditFlashCards = () => {
  const [searchParams] = useSearchParams();
  const defaultSpeciality = searchParams.get('speciality');

  const { showSnackbar, snackbarProps } = useSnackbar();
  const { questionsStore, flashCardStore } = useServiceProvider();

  const [loading, setLoading] = useState(true);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      await questionsStore.getSpecialities();
      if (defaultSpeciality) setSelectedSpeciality(defaultSpeciality);
    } catch (e) {
      console.error(e);
      showSnackbar('Failed to get specialities', 'error');
    }

    try {
      const flashcards = await flashCardStore.getAllFlashCards();
      if (flashcards) setFlashcards(flashcards);
    } catch (e) {
      console.error(e);
      showSnackbar('Failed to get flash cards', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Snackbar {...snackbarProps} />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <LinkButton variant="contained" to="/author-portal">Author Portal</LinkButton>
        <LinkButton variant="contained" to="/create-flash-card" startIcon={<Add />}>Add Flash Card</LinkButton>
      </Stack>

      <Typography style={primaryGradientText} variant="h3" mb={3}>Edit Flash Cards</Typography>

      <TextSelect
        label="Speciality"
        sx={{ minWidth: 300, bgcolor: "white", mb: 2 }}
        options={specialities.map(speciality => ({
          value: speciality.id,
          displayText: speciality.name
        }))}
        defaultValue={defaultSpeciality}
        selected={selectedSpeciality}
        setSelected={setSelectedSpeciality}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Condition</TableCell>
              <TableCell>Image</TableCell>
              <TableCell sx={{ paddingLeft: "32px" }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading? 
              <TableRow>
                <TableCell colSpan={3}>
                  <Stack alignItems="center" my={3}>
                    <CircularProgress />
                  </Stack>
                </TableCell>
              </TableRow>
              :
              flashcards.map(flashcard => (
                <TableRow>
                  <TableCell>{flashcard.name}</TableCell>
                  <TableCell>
                    <img src={flashcard.imageUrl} alt={flashcard.name} height="200" />
                  </TableCell>
                  <TableCell>
                    <LinkButton to={`/edit-flashcard/${flashcard.id}`}>Edit</LinkButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  );
}

export default observer(EditFlashCards);