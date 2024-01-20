import { Box, Slider, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { QuestionsOrder } from "../../models/PracticeFilter";
import { useServiceProvider } from "../../services/ServiceProvider";
import FilterOption from "./FamiliarityOption";

export const OrderQuantitySelection = observer(() => {
  // const orders = ["Randomised order", "Order by speciality"]

  const { practiceStore } = useServiceProvider();
  const practiceFilter = practiceStore.practiceFilter;
  const order = practiceFilter.questionsOrder;

  const orders = Object.values(QuestionsOrder);

  const setOrder = (order: string) => {
    practiceStore.setQuestionsOrder(order as QuestionsOrder);
  }

  const onQuanityChange = (quantity: number) => {
    practiceStore.setQuestionsCount(quantity);
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'white', borderRadius: 2 }}>
      <Stack sx={{ width: 450 }} spacing={3}>
        {
          orders.map(o => (
            <Box>
              <FilterOption
                text={o}
                selected={order.toString() === o.toString()}
                setSelected={setOrder}
              />
            </Box>
          ))
        }
        <Stack
          spacing={6}
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "white",
            borderRadius: 1.5,
            p: 5,
            boxShadow: '0px 0px 22px 0px #97979765',
            height: "100%",
          }}
        >
          <Typography fontSize={18} fontWeight={600}>Select number of questions</Typography>
          <Slider
            defaultValue={practiceFilter.questionsCount}
            step={1}
            min={10}
            max={100}
            valueLabelDisplay="on"
            onChange={(e, value) => onQuanityChange(value as number)}
          />
        </Stack>
      </Stack>
    </Box>

  )
})