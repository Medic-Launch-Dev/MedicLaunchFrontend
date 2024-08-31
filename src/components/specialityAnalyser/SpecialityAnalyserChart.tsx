import { Percent } from "@mui/icons-material";
import { Card, CircularProgress, Divider, Grid, Stack, ToggleButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SpecialityAnalytics } from "../../models/Speciality";
import { useServiceProvider } from "../../services/ServiceProvider";
import ProgressBar from "../charts/ProgressBar";

export default function SpecialityAnalyserChart() {
  const { questionsStore } = useServiceProvider();
  const [loading, setLoading] = useState(true);
  const [specialityAnalytics, setSpecialityAnalytics] = useState<SpecialityAnalytics[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'alpha'>('alpha');

  useEffect(() => {
    init();
  }, []);

  async function init() {
    setLoading(true);
    const specialityAnalytics = await questionsStore.getSpecialityAnalytics();
    setSpecialityAnalytics(specialityAnalytics);
    setLoading(false);
  }

  function calculatePercentage(correct: number, total: number) {
    return total === 0 ? 0 : Math.round((correct / total) * 100);
  }

  function toggleSortOrder() {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  }

  function getSortedAnalytics() {
    const sortedAnalytics = [...specialityAnalytics];
    if (sortOrder === 'alpha') {
      sortedAnalytics.sort((a, b) => a.specialityName.localeCompare(b.specialityName));
    } else {
      sortedAnalytics.sort((a, b) => {
        const percentageA = calculatePercentage(a.correct, a.totalQuestions);
        const percentageB = calculatePercentage(b.correct, b.totalQuestions);
        return sortOrder === 'asc' ? percentageA - percentageB : percentageB - percentageA;
      });
    }
    return sortedAnalytics;
  }

  return (
    <Card sx={{ p: 3, mt: 2, maxHeight: 490, overflowY: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography color="primary" variant="h3">Speciality Analyser</Typography>
        <ToggleButton value="sort" size="small" onClick={toggleSortOrder}><Percent sx={{ fontSize: 18 }} /></ToggleButton>
      </Stack>
      <Divider sx={{ my: 2 }} />
      {
        loading ?
          <Stack alignItems="center" my={5}><CircularProgress /></Stack>
          :
          <Grid container alignItems="center" rowSpacing={1.5} sx={{ overflowY: 'auto' }}>
            {
              getSortedAnalytics().length > 0 ?
                getSortedAnalytics().map(({ specialityName, totalQuestions, correct, incorrect }) => (
                  <React.Fragment key={specialityName}>
                    <Grid item xs={4}>
                      <Typography variant="h6" color="#333333" fontWeight={500}>{specialityName}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <ProgressBar correctQuestions={correct} incorrectQuestions={incorrect} totalQuestions={totalQuestions} />
                    </Grid>
                  </React.Fragment>
                ))
                :
                <Grid item xs={12}>
                  <Typography variant="body1" color="textSecondary" py={3} align="center">No data available</Typography>
                </Grid>
            }
          </Grid>
      }
    </Card>
  );
}