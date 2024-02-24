import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

interface UserProfileFormProps {
  newUser?: boolean;
}

export default function UserProfileForm({ newUser }: UserProfileFormProps) {
  const [plan, setPlan] = useState("");

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          label="Display Name"
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="First Name"
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Last Name"
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="City"
          required
        />
      </Grid>
      {
        newUser &&
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Email ID"
            required
          />
        </Grid>
      }
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Mobile Number"
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="University"
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Graduation Year"
          required
        />
      </Grid>
      {
        newUser &&
        <Grid item xs={12} md={4}>
          <FormControl size="small" fullWidth>
            <InputLabel>Plan</InputLabel>
            <Select
              value={plan}
              label="Age"
              onChange={e => setPlan(e.target.value)}
            >
              <MenuItem value="1 month">1 month</MenuItem>
              <MenuItem value="3 months">3 months</MenuItem>
              <MenuItem value="6 months">6 months</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      }
    </Grid>
  )
}