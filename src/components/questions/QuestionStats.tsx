import { Grid, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useServiceProvider } from "../../services/ServiceProvider";
import { useEffect, useState } from "react";
import { AuthoredQuestionStats } from "../../models/AuthoredQuestionStats";

function QuestionStats() {
  const { questionsStore } = useServiceProvider();
  const [stats, setStats] = useState<AuthoredQuestionStats>();

  useEffect(() => {
    async function fetchStats() {
      const fetchedStats = await questionsStore.getQuestionStats();
      setStats(fetchedStats);
    }
    fetchStats();
  }, []);

  const statsArray = [
    { label: "Total Questions", value: stats?.totalQuestions || 0 },
    { label: "Submitted", value: stats?.submittedQuestions || 0 },
    { label: "Draft", value: stats?.draftQuestions || 0 }
  ]

  return (
    <Stack alignItems="center" direction="row" height="100%" spacing={4}>
      {
        statsArray.map((stat) => (
          <div>
            {stat.label}: <span style={{ fontWeight: 600 }}>{stat.value}</span>
          </div>
        ))
      }
    </Stack>
  );
}

export default observer(QuestionStats);