import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function UniversitySelect() {
  const [uni, setUni] = useState<string>('');

  return (
    <FormControl fullWidth>
      <InputLabel>University</InputLabel>
      <Select
        value={uni}
        label="University"
        onChange={e => setUni(e.target.value as string)}
        sx={{ backgroundColor: "#fff" }}
      >
        <MenuItem value={"University of Birmingham"}>University of Birmingham</MenuItem>
        <MenuItem value={"University of Leeds"}>University of Leeds</MenuItem>
        <MenuItem value={"University of Manchester"}>University of Manchester</MenuItem>
      </Select>
    </FormControl>
  )
}

