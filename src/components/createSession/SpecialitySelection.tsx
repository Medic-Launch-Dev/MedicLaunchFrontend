import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Speciality from "../../models/Speciality";
import questionsStore from "../../stores/questionsStore";
import SelectAllSpecialityOption from "./SelectAllSpecialityOption";
import SpecialityOption from "./SpecialityOption";



export default function SpecialitySelection() {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [selectedSpecialities, setSelectedSpecialities] = useState<Speciality[] | "all">([]);

  useEffect(() => {
    questionsStore.getSpecialities().then((data) => {
      setSpecialities(data);
    });
  }, []);

  const handleSpecialityClick = (speciality: Speciality) => {
    const incomingSpeciality = speciality;

    if (selectedSpecialities === "all") {
      const updatedSpecialities = specialities.filter(speciality => speciality.id !== incomingSpeciality.id);
      setSelectedSpecialities(updatedSpecialities);
      return;
    }

    const index = selectedSpecialities.findIndex(speciality => speciality.id === incomingSpeciality.id);;
    if (index === -1) {
      setSelectedSpecialities([...selectedSpecialities, incomingSpeciality]);
    } else {
      const updatedSpecialities = [...selectedSpecialities];
      updatedSpecialities.splice(index, 1);
      setSelectedSpecialities(updatedSpecialities);
    }
  };

  const handleSelectAllClick = () => {
    if (selectedSpecialities === "all") setSelectedSpecialities([]);
    else setSelectedSpecialities("all");
  }

  console.log(selectedSpecialities);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SelectAllSpecialityOption selected={selectedSpecialities === "all"} setSelected={handleSelectAllClick} />
      </Grid>
      {
        specialities.map(speciality => (
          <Grid item xs={3}>
            <SpecialityOption
              selected={selectedSpecialities === "all" || selectedSpecialities.includes(speciality)}
              setSelected={handleSpecialityClick}
              speciality={speciality}
            />
          </Grid>
        ))
      }
    </Grid>
  )
}