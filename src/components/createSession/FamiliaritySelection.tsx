import { Grid } from "@mui/material";
import FilterOption from "./FamiliarityOption";
import { useServiceProvider } from "../../services/ServiceProvider";
import { Familiarity } from "../../models/PracticeFilter";
import { observer } from "mobx-react-lite";

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
    <Grid container spacing={6} height="100%" px={12} py={3}>
      {
        familiarities.map(f => (
          <Grid item xs={6}>
            <FilterOption
              heading={f.heading}
              subheading={f.subheading}
              selected={familiarity === f.heading}
              setSelected={setFamiliarity}
            />
          </Grid>
        ))
      }
    </Grid>
  )
})