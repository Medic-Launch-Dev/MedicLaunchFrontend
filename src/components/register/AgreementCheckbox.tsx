import { Checkbox, FormControlLabel, styled } from "@mui/material";

const Icon = styled('span')({
  borderRadius: 3,
  width: 18,
  height: 18,
  backgroundColor: '#fff',
  border: '1px solid #9E9E9E',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
  'input:disabled ~ &': {
    background: 'rgba(206,217,224,.5)',
  },
});

const CheckedIcon = styled(Icon)({
  backgroundColor: '#2394c4',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 18,
    height: 18,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

interface AgreementCheckboxProps {
  text: string;
}

export default function AgreementCheckbox({ text }: AgreementCheckboxProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            '&:hover': { bgcolor: 'transparent' },
          }}
          disableRipple
          color="default"
          checkedIcon={<CheckedIcon />}
          icon={<Icon />}
          inputProps={{ 'aria-label': 'Checkbox demo' }}
        />
      }
      label={text}
    />
  )
}