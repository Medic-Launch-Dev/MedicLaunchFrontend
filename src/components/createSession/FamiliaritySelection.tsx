import { Box, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Familiarity } from "../../models/PracticeFilter";
import { useServiceProvider } from "../../services/ServiceProvider";
import FilterOption from "./FamiliarityOption";

export const FamiliaritySelection = observer(() => {
  const familiarities = [
    {
      heading: "New questions",
      subheading: "Questions you've never attempted before",
      enumMapping: Familiarity.NewQuestions
    },
    {
      heading: "Incorrect questions",
      subheading: "Questions you got incorrect on your last attempt",
      enumMapping: Familiarity.IncorrectQuestions
    },
    {
      heading: "Flagged questions",
      subheading: "Questions you flagged in previous sessions",
      enumMapping: Familiarity.FlaggedQuestions
    },
    {
      heading: "All questions",
      subheading: "Every question in the UKMLA question bank",
      enumMapping: Familiarity.AllQuestions
    },
  ]

  const { practiceStore } = useServiceProvider();
  const practiceFilter = practiceStore.practiceFilter;
  const familiarity = practiceFilter.familiarity;

  const setFamiliarity = (familiarity: string) => {
    const familiarityEnum = familiarities.find(f => f.heading === familiarity)!.enumMapping!;
    practiceStore.setFamiliarity(familiarityEnum);
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'white', borderRadius: 1.5 }}>
      <Stack sx={{ width: 450, m: 'auto' }} spacing={3}>
        {
          familiarities.map(f => (
            <FilterOption
              text={f.heading}
              selected={f.enumMapping === familiarity}
              setSelected={setFamiliarity}
            />
          ))
        }
      </Stack>
    </Box>
  )
})