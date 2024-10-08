import { Box, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Familiarity } from "../../models/PracticeFilter";
import { useServiceProvider } from "../../services/ServiceProvider";
import FilterOption from "./FamiliarityOption";

export const FamiliaritySelection = observer(() => {
  const { practiceStore, questionsStore } = useServiceProvider();
  const practiceFilter = practiceStore.practiceFilter;
  const familiarity = practiceFilter.familiarity;

  const setFamiliarity = (familiarity: string) => {
    const familiarityEnum = familiarities.find(f => f.heading === familiarity)!.enumMapping!;
    practiceStore.setFamiliarity(familiarityEnum);
  }

  const familiarities = [
    {
      heading: "New questions",
      subheading: "Questions you've never attempted before",
      enumMapping: Familiarity.NewQuestions,
      questionCount: questionsStore.familiarityCounts?.newQuestions
    },
    {
      heading: "Incorrect questions",
      subheading: "Questions you got incorrect on your last attempt",
      enumMapping: Familiarity.IncorrectQuestions,
      questionCount: questionsStore.familiarityCounts?.incorrectQuestions
    },
    {
      heading: "Flagged questions",
      subheading: "Questions you flagged in previous sessions",
      enumMapping: Familiarity.FlaggedQuestions,
      questionCount: questionsStore.familiarityCounts?.flaggedQuestions
    },
    {
      heading: "All questions",
      subheading: "Every question in the UKMLA question bank",
      enumMapping: Familiarity.AllQuestions,
      questionCount: questionsStore.familiarityCounts?.allQuestions
    },
  ]

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'white', borderRadius: 1.5 }}>
      <Stack sx={{ width: 450, m: 'auto', px: { xs: 2, md: 0 } }} spacing={3}>
        {
          familiarities.map(f => (
            <FilterOption
              text={f.heading}
              selected={f.enumMapping === familiarity}
              setSelected={setFamiliarity}
              disabled={f.questionCount === 0}
            />
          ))
        }
      </Stack>
    </Box>
  )
})