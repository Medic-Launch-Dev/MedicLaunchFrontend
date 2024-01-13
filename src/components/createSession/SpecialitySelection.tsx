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
  // const specialities = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "Twenty-One", "Twenty-Two", "Twenty-Three", "Twenty-Four", "Twenty-Five", "Twenty-Six", "Twenty-Seven", "Twenty-Eight", "Twenty-Nine", "Thirty", "Thirty-One", "Thirty-Two", "Thirty-Three", "Thirty-Four", "Thirty-Five", "Thirty-Six", "Thirty-Seven", "Thirty-Eight", "Thirty-Nine", "Forty", "Forty-One", "Forty-Two", "Forty-Three", "Forty-Four", "Forty-Five", "Forty-Six", "Forty-Seven", "Forty-Eight", "Forty-Nine", "Fifty"];
  // const [selectedSpecialities, setSelectedSpecialities] = useState<string[] | "all">([]);

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
