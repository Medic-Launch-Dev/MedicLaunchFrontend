import { Add } from "@mui/icons-material";
import { Box, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { Flashcard } from "../models/Flashcard";
import Speciality from "../models/Speciality";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

const EditFlashCards = () => {
  const [searchParams] = useSearchParams();
  const defaultSpeciality = searchParams.get('speciality');

  const { questionsStore, flashCardStore } = useServiceProvider();

  const [loading, setLoading] = useState(true);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>();
  const [flashcards, setFlashcards] = useState<Flashcard[]>();

  useEffect(() => {
    async function init() {
      const specialities = await questionsStore.getSpecialities();
      setSpecialities(specialities);
      if (defaultSpeciality) {
        setSelectedSpeciality(defaultSpeciality);
      } else if (specialities.length > 0) {
        setSelectedSpeciality(specialities[0].id);
      }
      setLoading(false);
    }
    init();
  }, [defaultSpeciality, questionsStore]);

  useEffect(() => {
    async function fetchFlashcards() {
      if (selectedSpeciality) {
        setLoading(true);
        const flashcards = await flashCardStore.getFlashcardsBySpecialityId(selectedSpeciality);
        setFlashcards(flashcards);
        setLoading(false);
      }
    }
    fetchFlashcards();
  }, [selectedSpeciality, flashCardStore]);

  return (
    <Page>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <LinkButton variant="contained" to="/author-portal">Author Portal</LinkButton>
        <LinkButton variant="contained" to="/create-flash-card" startIcon={<Add />}>Add Flash Card</LinkButton>
      </Stack>

      <Typography style={primaryGradientText} variant="h3" mb={3}>Edit Flash Cards</Typography>

      <FormControl>
        <InputLabel>Specialities</InputLabel>
        <Select
          value={selectedSpeciality || ""}
          label={"Specialities"}
          onChange={e => setSelectedSpeciality(e.target.value as string)}
          sx={{ backgroundColor: "#fff", minWidth: 300, mb: 2 }}
        >
          {specialities.map(speciality => <MenuItem value={speciality.id} key={speciality.id}>{speciality.name}</MenuItem>)}
        </Select>
      </FormControl>

      {
        loading ?
          <Stack alignItems="center" my={3}>
            <CircularProgress />
          </Stack>
          :
          <Grid container spacing={2}>
            {
              flashcards && flashcards.length > 0 ?
                flashcards.map(flashcard => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={flashcard.id}>
                    <Link to={`/edit-flashcard/${flashcard.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <Stack
                        sx={{
                          height: '100%',
                          borderRadius: '12px',
                          cursor: "pointer",
                          backgroundColor: 'white',
                        }}
                      >
                        <img
                          src={flashcard.imageUrl}
                          style={{
                            width: '100%',
                            aspectRatio: '3 / 4',
                            borderStyle: 'solid',
                            borderWidth: '1px 1px 0 1px',
                            borderRadius: '12px 12px 0 0',
                            borderColor: grey[300],
                            display: 'block',
                            objectFit: 'cover',
                          }}
                        />
                        <Box
                          sx={{
                            flexGrow: 1,
                            p: 2,
                            textAlign: "center",
                            borderStyle: 'solid',
                            borderWidth: '0 1px 1px 1px',
                            borderRadius: '0 0 12px 12px',
                            borderColor: grey[300],
                            backgroundColor: 'inherit',
                            userSelect: "none",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {flashcard.name}
                        </Box>
                      </Stack>
                    </Link>
                  </Grid>
                ))
                :
                <Grid item xs={12}>
                  <Typography my={4} textAlign="center">No flashcards in selected speciality</Typography>
                </Grid>
            }
          </Grid>
      }
    </Page>
  );
}

export default observer(EditFlashCards);