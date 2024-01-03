import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface TextSelect {
  label: string;
  options: string[];
  selected?: string;
  setSelected: (string) => void;
}

export default function TextSelect({ label, options, selected, setSelected }: TextSelect) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selected}
        label={label}
        onChange={e => setSelected(e.target.value as string)}
        sx={{ backgroundColor: "#fff" }}
      >
        {options.map(option => <MenuItem value={option}>{option}</MenuItem>)}
      </Select>
    </FormControl>
  )
}