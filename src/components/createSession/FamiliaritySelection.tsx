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
    },
    {
      heading: "Incorrect questions",
      subheading: "Questions you got incorrect on your last attempt",
    },
    {
      heading: "Flagged questions",
      subheading: "Questions you flagged in previous sessions",
    },
    {
      heading: "All questions",
      subheading: "Every question in the UKMLA question bank",
    },
  ]

  const { practiceStore } = useServiceProvider();
  const practiceFilter = practiceStore.practiceFilter;
  const familiarity = practiceFilter.familiarity ? practiceFilter.familiarity : "";

  const setFamiliarity = (familiarity: string) => {
    practiceStore.setFamiliarity(familiarity as Familiarity);
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'white', borderRadius: 2 }}>
      <Stack sx={{ width: 450, m: 'auto' }} spacing={3}>
        {
          familiarities.map(f => (
            <FilterOption
              text={f.heading}
              selected={familiarity === f.heading}
              setSelected={setFamiliarity}
            />
          ))
        }
      </Stack>
    </Box>
  )
})