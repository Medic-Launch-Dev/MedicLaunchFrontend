import { Box, Slider, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { QuestionsOrder } from "../../models/PracticeFilter";
import { useServiceProvider } from "../../services/ServiceProvider";
import FilterOption from "./FamiliarityOption";

export const OrderQuantitySelection = observer(() => {
  const { practiceStore, questionsStore } = useServiceProvider();
  const practiceFilter = practiceStore.practiceFilter;
  const order = practiceFilter.selectionOrder;

  const orders = Object.values(QuestionsOrder);

  const setOrder = (order: string) => {
    practiceStore.setQuestionsOrder(order as QuestionsOrder);
  };

  const onQuanityChange = (quantity: number) => {
    practiceStore.setQuestionsCount(quantity);
  };

  const questionsCount = questionsStore.questions.length;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
        borderRadius: 1.5,
        overflowY: 'scroll',
        height: "100%",
      }}
    >
      <Stack sx={{ width: 450 }} spacing={3} py={4}>
        {orders.map((o) => (
          <Box>
            <FilterOption
              text={o === "Randomized" ? "Randomised" : o}
              selected={order.toString() === o.toString()}
              setSelected={setOrder}
            />
          </Box>
        ))}
        <Stack
          spacing={6}
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "white",
            borderRadius: 1.5,
            p: 5,
            boxShadow: "0px 0px 22px 0px #97979765",
            height: "100%",
          }}
        >
          <Typography fontSize={18} fontWeight={600}>
            Select quantity
          </Typography>
          <Slider
            step={1}
            min={1}
            max={Math.min(200, questionsCount)}
            valueLabelDisplay="on"
            onChange={(e, value) => onQuanityChange(value as number)}
          />
        </Stack>
      </Stack>
    </Box>
  );
});
