import { Box, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { PracticeFilter } from "../../models/PracticeFilter";
import Speciality from "../../models/Speciality";
import { useServiceProvider } from "../../services/ServiceProvider";
import SpecialityOption from "./SpecialityOption";

export const SpecialitySelection = observer(() => {
  const { practiceStore, questionsStore } = useServiceProvider();

  const practiceFilter: PracticeFilter = practiceStore.practiceFilter;
  const selectedSpecialities = practiceFilter.specialityIds;

  const setSelectedSpecialities = (selectedSpecialitiesInput: string[]) => {
    practiceStore.setSelectedSpecialities(selectedSpecialitiesInput);
  };

  const [specialities, setSpecialitiesList] = useState<Speciality[]>([]);

  const handleSpecialityClick = (speciality: string) => {
    if (practiceFilter.allSpecialitiesSelected) {
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
    practiceStore.setAllSpecialitiesSelected(true);
  };

  useEffect(() => {
    questionsStore.getSpecialities().then((specialities) => {
      setSpecialitiesList(specialities);
    });
  }, []);

  const selectAllOption: Speciality = { id: "all", name: "Select All" };

  return specialities && specialities.length > 0 ? (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 4,
        maxHeight: "100%",
        overflowY: "scroll",
      }}
    >
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
          <Grid item xs={3}>
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
    </Box>
  ) : (
    <div>Loading...</div>
  );
});
