import { Box, Grid, Stack, Typography } from "@mui/material";
import { primaryGradient } from "../../theme";

interface MockSelectorProps {
  name: string;
  specialities: string[];
  selected: boolean;
  setSelected: (name: string) => void;
}

export default function MockSelector({ name, specialities, selected, setSelected }: MockSelectorProps) {
  const checkIcon = (
    <svg width="22" height="22" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clipRule="evenodd" d="M9.36966 18.2286C14.2909 18.2286 18.2803 14.2391 18.2803 9.31791C18.2803 4.39667 14.2909 0.407227 9.36966 0.407227C4.44843 0.407227 0.458984 4.39667 0.458984 9.31791C0.458984 14.2391 4.44843 18.2286 9.36966 18.2286ZM9.25679 11.5768L12.713 8.01253L11.7289 7.0582L8.74541 10.1349L6.99074 8.46461L6.04554 9.45754L8.29212 11.5961L8.78401 12.0644L9.25679 11.5768Z" fill="url(#paint0_linear_2098_2574)" />
      <defs>
        <linearGradient id="paint0_linear_2098_2574" x1="0.458984" y1="0.933967" x2="21.701" y2="11.0349" gradientUnits="userSpaceOnUse">
          <stop offset="0.0532222" stopColor="#2496C7" />
          <stop offset="1" stopColor="#046E9B" />
        </linearGradient>
      </defs>
    </svg>
  )

  return (
    <Stack
      spacing={3}
      sx={{
        background: selected ? primaryGradient : "white",
        color: selected ? "white" : undefined,
        borderRadius: 1.5,
        p: 3,
        boxShadow: '0px 0px 22px 0px #97979765',
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        fontWeight: 500,
        cursor: "pointer",
      }}
      onClick={() => setSelected(name)}
    >
      <Stack>
        <Typography fontSize={24} fontWeight={600} color={selected ? "white" : "primary"} textAlign="center">{name}</Typography>
        <Typography fontSize={18} fontWeight={600} color={selected ? "white" : "primary"} textAlign="center">100 Questions</Typography>
        <Typography fontSize={16} fontWeight={600} color={selected ? "white" : "primary"} textAlign="center">2 Hour Duration</Typography>
      </Stack>
      <Box sx={{ p: 3, bgcolor: "#f9f9ff", borderRadius: 1, height: "100%" }}>
        <Grid container spacing={2.5}>
          {
            specialities.map(speciality => (
              <Grid item xs={12} md={6} key={speciality}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {checkIcon}
                  </div>
                  <Typography fontWeight={500} color="black">{speciality}</Typography>
                </Stack>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </Stack>
  )
}