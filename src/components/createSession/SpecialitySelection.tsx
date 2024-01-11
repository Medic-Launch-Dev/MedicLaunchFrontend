import { Grid } from "@mui/material";
import { useState } from "react";
import SpecialityOption from "./SpecialityOption";



export default function SpecialitySelection() {
  const specialities = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "Twenty-One", "Twenty-Two", "Twenty-Three", "Twenty-Four", "Twenty-Five", "Twenty-Six", "Twenty-Seven", "Twenty-Eight", "Twenty-Nine", "Thirty", "Thirty-One", "Thirty-Two", "Thirty-Three", "Thirty-Four", "Thirty-Five", "Thirty-Six", "Thirty-Seven", "Thirty-Eight", "Thirty-Nine", "Forty", "Forty-One", "Forty-Two", "Forty-Three", "Forty-Four", "Forty-Five", "Forty-Six", "Forty-Seven", "Forty-Eight", "Forty-Nine", "Fifty"];
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[] | "all">([]);

  const handleSpecialityClick = (speciality: string) => {
    if (selectedSpecialities === "all") {
      const specialityToRemove = speciality;
      const updatedSpecialities = specialities.filter(speciality => speciality !== specialityToRemove);
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
    if (selectedSpecialities === "all") setSelectedSpecialities([]);
    else setSelectedSpecialities("all");
  }

  console.log(selectedSpecialities);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SpecialityOption
          centered
          speciality="Select All"
          selected={selectedSpecialities === "all"}
          setSelected={() => handleSelectAllClick()}
        />
      </Grid>
      {
        specialities.map(speciality => (
          <Grid item xs={3}>
            <SpecialityOption
              selected={selectedSpecialities.includes(speciality) || selectedSpecialities === "all"}
              setSelected={handleSpecialityClick}
              speciality={speciality}
            />
          </Grid>
        ))
      }
    </Grid>
  )
}