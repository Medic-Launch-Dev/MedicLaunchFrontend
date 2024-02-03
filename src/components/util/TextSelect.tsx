import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";

interface Option {
  value: string | number;
  displayText?: string | number;
}

interface TextSelect extends SelectProps {
  options: Option[];
  selected?: string;
  setSelected: (string) => void;
}

export default function TextSelect({ label, options, selected, setSelected, ...rest }: TextSelect) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selected}
        label={label}
        onChange={e => setSelected(e.target.value as string)}
        sx={{ backgroundColor: "#fff" }}
        {...rest}
      >
        {options.map(option => <MenuItem value={option.value} key={option.value}>{option.displayText ?? option.value}</MenuItem>)}
      </Select>
    </FormControl>
  )
}