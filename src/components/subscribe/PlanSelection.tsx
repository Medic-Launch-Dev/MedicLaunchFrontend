import { Box, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import PlanOption from "./PlanOption";

interface PlanSelectionProps {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}

export const PlanSelection = observer(({ selectedPlan, setSelectedPlan }: PlanSelectionProps) => {
  const plans = [
    {
      name: "1 Month",
      price: 17
    },
    {
      name: "3 Months",
      price: 20
    },
    {
      name: "6 Months",
      price: 30
    },
  ]

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'white', borderRadius: 1.5 }}>
      <Stack sx={{ m: 'auto' }} spacing={3} direction="row" alignItems="center">
        {
          plans.map(({ name, price }) => (
            <PlanOption
              name={name}
              price={price}
              selected={selectedPlan === name}
              setSelected={setSelectedPlan}
              mostPopular={name === "3 Months"}
            />
          ))
        }
      </Stack>
    </Box>
  )
})