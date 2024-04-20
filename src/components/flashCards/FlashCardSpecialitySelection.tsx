import { Box, CircularProgress, Grid, Snackbar, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../hooks/useSnackbar";
import Speciality from "../../models/Speciality";
import { useServiceProvider } from "../../services/ServiceProvider";
import SpecialityOption from "../createSession/SpecialityOption";

interface FlashCardSpecialitySelectionProps {
  selectedSpecialityId: string;
  setSelectedSpecialityId: (specialityId: string) => void;
}

export const FlashCardSpecialitySelection = observer(({ selectedSpecialityId, setSelectedSpecialityId }: FlashCardSpecialitySelectionProps) => {
  const navigate = useNavigate();
  const { questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();

  const [specialities, setSpecialitiesList] = useState<Speciality[]>([]);

  const handleSpecialityClick = (speciality: string) => {
    setSelectedSpecialityId(speciality);
  };


  useEffect(() => {
    if (selectedSpecialityId) navigate('/flash-cards');

    questionsStore.getSpecialities()
      .then((specialities) => {
        setSpecialitiesList(specialities);
      })
      .catch(e => {
        console.error(e);
        showSnackbar('Failed to get specialities', 'error');
      });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 1.5,
        p: 4,
        maxHeight: "100%",
        overflowY: "scroll",
      }}
    >
      <Snackbar {...snackbarProps} />
      {
        specialities && specialities.length > 0 ?
          <Grid container spacing={2}>
            {specialities.map((speciality) => (
              <Grid item xs={3}>
                <SpecialityOption
                  selected={selectedSpecialityId === speciality.id}
                  setSelected={handleSpecialityClick}
                  speciality={speciality}
                />
              </Grid>
            ))}
          </Grid>
          :
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
      }
    </Box>)
});