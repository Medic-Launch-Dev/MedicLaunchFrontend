import { Grid, Slider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import FilterOption from "./FamiliarityOption";

export default function OrderQuantitySelection() {
  const orders = ["Randomised order", "Order by speciality"]
  const [order, setOrder] = useState<string>();

  return (
    <Grid container spacing={6} height="100%" px={16} py={3}>
      {
        orders.map(o => (
          <Grid item xs={6}>
            <FilterOption
              heading={o}
              selected={order === o}
              setSelected={setOrder}
            />
          </Grid>
        ))
      }
      <Grid item xs={12}>
        <Stack
          spacing={6}
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "white",
            borderRadius: 1.5,
            py: 2,
            px: 4,
            boxShadow: '0px 0px 22px 0px #97979765',
            height: "100%",
          }}
        >
          <Typography variant="h3" color="primary">Select number of questions</Typography>
          <Slider
            defaultValue={20}
            step={1}
            min={10}
            max={100}
            valueLabelDisplay="on"
          />
        </Stack>
      </Grid>
    </Grid>

  )
}