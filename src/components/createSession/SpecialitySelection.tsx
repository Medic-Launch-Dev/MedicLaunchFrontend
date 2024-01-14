import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import SpecialityOption from "./SpecialityOption";
import questionsStore from "../../stores/questionsStore";
import Speciality from "../../models/Speciality";
import { observer } from "mobx-react-lite";
import { useServiceProvider } from "../../services/ServiceProvider";
import { PracticeFilter } from "../../models/PracticeFilter";
import { toJS } from "mobx";

export const SpecialitySelection = observer(() => {

  const [allSelected, setAllSelected] = useState<boolean>(false);

  const { practiceStore } = useServiceProvider();

  const practiceFilter: PracticeFilter = practiceStore.practiceFilter;
  const selectedSpecialities = practiceFilter.specialities;

  const setSelectedSpecialities = (selectedSpecialitiesInput: string[]) => {
    practiceStore.setSelectedSpecialities(selectedSpecialitiesInput);
  };

  const [specialities, setSpecialitiesList] = useState<Speciality[]>([]);

  const handleSpecialityClick = (speciality: string) => {
    if (allSelected) {
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
    if (allSelected) setSelectedSpecialities([]);
    else setAllSelected(true);
  };

  console.log(toJS(selectedSpecialities));

  useEffect(() => {
    questionsStore.getSpecialities().then((specialities) => {
      setSpecialitiesList(specialities);
    });
  }, []);

  const selectAllOption: Speciality = { id: "all", name: "Select All" };

  return specialities && specialities.length > 0 ? (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SpecialityOption
          centered
          speciality={selectAllOption}
          selected={allSelected}
          setSelected={() => handleSelectAllClick()}
        />
      </Grid>
      {specialities.map((speciality) => (
        <Grid item xs={3}>
          <SpecialityOption
            selected={
              selectedSpecialities.includes(speciality.id) || allSelected
            }
            setSelected={handleSpecialityClick}
            speciality={speciality}
          />
        </Grid>
      ))}
    </Grid>
  ) : (
    <div>Loading...</div>
  );
});
