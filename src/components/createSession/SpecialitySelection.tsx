import { Grid } from "@mui/material";
import SpecialityOption from "./SpecialityOption";

export default function SpecialitySelection() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SpecialityOption centered>Select All</SpecialityOption>
      </Grid>
      {
        Array.from({ length: 60 }, () => "Speciality").map(speciality => (
          <Grid item xs={3}>
            <SpecialityOption>{speciality}</SpecialityOption>
          </Grid>
        ))
      }
    </Grid>
  )
}