import { Grid, Slider, Stack, Typography } from "@mui/material";
import FilterOption from "./FamiliarityOption";
import { observer } from "mobx-react-lite";
import { QuestionsOrder } from "../../models/PracticeFilter";
import { useServiceProvider } from "../../services/ServiceProvider";

export const OrderQuantitySelection = observer(() => {
  // const orders = ["Randomised order", "Order by speciality"]

  const { practiceStore } = useServiceProvider();
  const practiceFilter = practiceStore.practiceFilter;
  const order = practiceFilter.questionsOrder;
  console.log("Questions order: ", order);
  
  const orders = Object.values(QuestionsOrder);

  const setOrder = (order: string) => {
    practiceStore.setQuestionsOrder(order as QuestionsOrder);
  }

  const onQuanityChange = (quantity: number) => {
    practiceStore.setQuestionsCount(quantity);
  }

  return (
    <Grid container spacing={6} height="100%" px={16} py={3}>
      {
        orders.map(o => (
          <Grid item xs={6}>
            <FilterOption
              heading={o}
              selected={order.toString() === o.toString()}
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
            defaultValue={practiceFilter.questionsCount}
            step={1}
            min={10}
            max={100}
            valueLabelDisplay="on"
            onChange={(e, value) => onQuanityChange(value as number)}
          />
        </Stack>
      </Grid>
    </Grid>

  )
})