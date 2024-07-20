import { Box, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { plans } from "../../models/Payment";
import PlanOption from "./PlanOption";

interface PlanSelectionProps {
  selectedPlanId: number;
  setSelectedPlanId: (planId: number) => void;
}

export const PlanSelection = observer(({ selectedPlanId, setSelectedPlanId }: PlanSelectionProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'white', borderRadius: 1.5 }}>
      <Stack sx={{ m: 'auto' }} spacing={3} direction="row" alignItems="center">
        {
          plans.map(({ id, name, price }) => (
            <PlanOption
              id={id}
              name={name}
              price={price}
              selected={selectedPlanId === id}
              setSelected={setSelectedPlanId}
              mostPopular={id === 2}
            />
          ))
        }
      </Stack>
    </Box>
  )
})