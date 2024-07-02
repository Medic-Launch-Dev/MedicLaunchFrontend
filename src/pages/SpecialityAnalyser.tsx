import { Card, CircularProgress, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { SpecialityAnalytics } from "../models/Speciality";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

export default function SpecialityAnalyser() {
  const { questionsStore } = useServiceProvider();
  const [loading, setLoading] = useState(true);
  const [specialityAnalytics, setSpecialityAnalytics] = useState<SpecialityAnalytics[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    setLoading(true);
    const specialityAnalytics = await questionsStore.getSpecialityAnalytics();
    setSpecialityAnalytics(specialityAnalytics);
    setLoading(false);
  }

  const calculatePercentage = (correct: number, total: number) => {
    return Math.round((correct / total) * 100);
  }

  return (
    <Page>
      <LinkButton to="/" sx={{ my: 2 }}>
        Study Portal
      </LinkButton>

      <Typography variant="h3" sx={primaryGradientText} mt={1} mb={2}>Speciality Analyser</Typography>
      <Card sx={{ p: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Speciality</TableCell>
              <TableCell align="center">Questions Answered</TableCell>
              <TableCell align="center">Correct</TableCell>
              <TableCell align="center">Incorrect</TableCell>
              <TableCell align="center">Continue Questions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading ?
                <TableRow>
                  <TableCell colSpan={5}>
                    <Stack alignItems="center" my={5}><CircularProgress /></Stack>
                  </TableCell>
                </TableRow>
                :
                specialityAnalytics.map(({ specialityId, specialityName, totalQuestions, questionsAnswered, correct, incorrect }) => (
                  <TableRow key={specialityId}>
                    <TableCell>{specialityName}</TableCell>
                    <TableCell align="center">{questionsAnswered}/{totalQuestions}</TableCell>
                    <TableCell align="center">{correct} ({calculatePercentage(correct, totalQuestions)}%)</TableCell>
                    <TableCell align="center">{incorrect} ({calculatePercentage(incorrect, totalQuestions)}%)</TableCell>
                    <TableCell align="center">
                      <LinkButton to={`/create-session?specialityId=${specialityId}`} variant="contained" size="small">
                        Continue
                      </LinkButton>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
}
