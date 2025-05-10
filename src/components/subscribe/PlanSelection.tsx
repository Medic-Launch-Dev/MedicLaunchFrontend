import { Box, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { PlanLookupKey, plans } from "../../models/Payment";
import PlanOption from "./PlanOption";

interface PlanSelectionProps {
  selectedPlanLookupKey: PlanLookupKey;
  setSelectedPlanLookupKey: (planLookupKey: PlanLookupKey) => void;
}

export const PlanSelection = observer(({ selectedPlanLookupKey, setSelectedPlanLookupKey }: PlanSelectionProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'white', borderRadius: 1.5 }}>
      <Stack sx={{ m: 'auto' }} spacing={3} direction="row" alignItems="center">
        {
          plans.map((plan) => (
            <PlanOption
              {...plan}
              selected={selectedPlanLookupKey === plan.lookupKey}
              setSelected={setSelectedPlanLookupKey}
            />
          ))
        }
      </Stack>
    </Box>
  )
})