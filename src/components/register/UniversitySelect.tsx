import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function UniversitySelect() {
  const [uni, setUni] = useState<string>();

  return (
    <FormControl fullWidth>
      <InputLabel>University</InputLabel>
      <Select
        value={uni}
        label="University"
        onChange={e => setUni(e.target.value as string)}
        sx={{ backgroundColor: "#fff" }}
      >
        <MenuItem value={10}>University of Birmingham</MenuItem>
        <MenuItem value={20}>University of Leeds</MenuItem>
        <MenuItem value={30}>University of Manchester</MenuItem>
      </Select>
    </FormControl>
  )
}

