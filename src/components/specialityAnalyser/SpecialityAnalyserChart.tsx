import { Percent } from "@mui/icons-material";
import { Card, CircularProgress, Divider, Grid, Stack, ToggleButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { SpecialityAnalytics } from "../../models/Speciality";
import { useServiceProvider } from "../../services/ServiceProvider";
import ProgressBar from "../charts/ProgressBar";
import { observer } from "mobx-react-lite";

function SpecialityAnalyserChart() {
  const { questionsStore } = useServiceProvider();
  const [loading, setLoading] = useState(true);
  const [specialityAnalytics, setSpecialityAnalytics] = useState<SpecialityAnalytics[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'alpha'>('alpha');
  const [showGradient, setShowGradient] = useState(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    function handleScroll() {
      const el = scrollRef.current;
      if (!el) return;
      setShowGradient(el.scrollHeight - el.scrollTop > el.clientHeight + 1);
    }
    handleScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [specialityAnalytics, sortOrder, loading]);

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
    <Card sx={{ px: 3, py: 2, height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography color="primary" variant="h3">Speciality Analyser</Typography>
        <ToggleButton value="sort" size="small" onClick={toggleSortOrder}><Percent sx={{ fontSize: 18 }} /></ToggleButton>
      </Stack>
      <Divider sx={{ my: 2 }} />
      {
        loading ?
          <Stack alignItems="center" my={5}><CircularProgress /></Stack>
          :
          <Box sx={{ position: "relative", height: 590 }}>
            <Grid
              container
              alignItems="center"
              rowSpacing={1.5}
              columnSpacing={0.5}
              sx={{ overflowY: 'auto', height: 590, pr: 1 }}
              ref={scrollRef}
            >
              {
                getSortedAnalytics().length > 0 ?
                  getSortedAnalytics().map(({ specialityName, totalQuestions, correct, incorrect }) => (
                    <React.Fragment key={specialityName}>
                      <Grid item xs={5}>
                        <Typography variant="h6" color="#333333" fontWeight={500}>{specialityName}</Typography>
                      </Grid>
                      <Grid item xs={7}>
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
            {showGradient && (
              <Box
                sx={{
                  pointerEvents: "none",
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 60,
                  background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)",
                }}
              />
            )}
          </Box>
      }
    </Card>
  );
}

export default observer(SpecialityAnalyserChart);