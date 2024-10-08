import { Box, CircularProgress, Grid, Snackbar, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import { PracticeFilter } from "../../models/PracticeFilter";
import Speciality from "../../models/Speciality";
import { useServiceProvider } from "../../services/ServiceProvider";
import SpecialityOption from "./SpecialityOption";

export const SpecialitySelection = observer(() => {
  const { practiceStore, questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();

  const practiceFilter: PracticeFilter = practiceStore.practiceFilter;
  const selectedSpecialities = practiceFilter.specialityIds;

  const setSelectedSpecialities = (selectedSpecialitiesInput: string[]) => {
    practiceStore.setSelectedSpecialities(selectedSpecialitiesInput);
  };

  const [specialities, setSpecialitiesList] = useState<Speciality[]>([]);

  const handleSpecialityClick = (speciality: string) => {
    if (practiceFilter.allSpecialitiesSelected) {
      practiceStore.setAllSpecialitiesSelected(false);
      const specialityToRemove = speciality;
      const updatedSpecialities = specialities
        .filter((speciality) => speciality.id !== specialityToRemove)
        .map((speciality) => speciality.id);
      setSelectedSpecialities(updatedSpecialities);
      return;
    }

    const index = selectedSpecialities.indexOf(speciality);
    if (index === -1) {
      setSelectedSpecialities([...selectedSpecialities, speciality]);
    } else {
      const updatedSpecialities = [...selectedSpecialities];
      updatedSpecialities.splice(index, 1);
      setSelectedSpecialities(updatedSpecialities);
    }
  };

  const handleSelectAllClick = () => {
    if (practiceFilter.allSpecialitiesSelected) {
      practiceStore.setAllSpecialitiesSelected(false);
      setSelectedSpecialities([]);
    } else {
      practiceStore.setAllSpecialitiesSelected(true);
    }
  };

  useEffect(() => {
    questionsStore.getSpecialities()
      .then((specialities) => {
        setSpecialitiesList(specialities);
      })
      .catch(e => {
        console.error(e);
        showSnackbar('Failed to get specialities', 'error');
      });
  }, []);

  const selectAllOption: Speciality = { id: "all", name: "Select All" };

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 1.5,
        p: { xs: 2, md: 4 },
        maxHeight: "100%",
        overflowY: "scroll",
      }}
    >
      <Snackbar {...snackbarProps} />
      {
        specialities && specialities.length > 0 ?
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SpecialityOption
                centered
                speciality={selectAllOption}
                selected={practiceFilter.allSpecialitiesSelected}
                setSelected={() => handleSelectAllClick()}
              />
            </Grid>
            {specialities.map((speciality) => (
              <Grid item xs={12} sm={6} md={3}>
                <SpecialityOption
                  selected={
                    selectedSpecialities.includes(speciality.id) || practiceFilter.allSpecialitiesSelected
                  }
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
