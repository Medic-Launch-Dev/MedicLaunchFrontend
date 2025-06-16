import { ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Page from "../components/nav/Page";
import MockSelector from "../components/practiceSession/MockSelector";
import LinkButton from "../components/util/LinkButton";
import { QuestionType } from "../models/Question";
import { useServiceProvider } from "../services/ServiceProvider";
import { observer } from "mobx-react-lite";

function SelectMock() {
  const { questionsStore } = useServiceProvider();
  const { accountStore: { hasStudentAccess, isLoading } } = useServiceProvider();
  const [selectedMock, setSelectedMock] = useState<QuestionType.PaperOneMockExam | QuestionType.PaperTwoMockExam>(QuestionType.PaperOneMockExam);
  const navigate = useNavigate();

  async function handleStartMock() {
    try {
      await questionsStore.startMock(selectedMock);
      navigate(`/practice-session?isMock=true`);
    } catch (e) {
      console.error(e);
    }
  }

  if (!isLoading && hasStudentAccess === false) return <Navigate to="/trial-expired" />;

  return (
    <Page sx={{ height: "100%" }}>
      <Stack height="100%" gap={3} py={2}>
        <LinkButton to="/" sx={{ width: "max-content", flexShrink: 0 }}>
          Study Portal
        </LinkButton>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container height="100%" spacing={4}>
            <Grid item xs={12} md={6}>
              <MockSelector
                name="Paper 1"
                selected={selectedMock === QuestionType.PaperOneMockExam}
                setSelected={() => setSelectedMock(QuestionType.PaperOneMockExam)}
                specialities={[
                  "Acute medicine",
                  "Cardiovascular",
                  "Dermatology",
                  "Endocrine & metabolic",
                  "Gastrointestinal",
                  "Infection",
                  "Medicine of older adult",
                  "Neurosciences",
                  "Ophthalmology",
                  "Primary care",
                  "Renal & Urology",
                  "Respiratory",
                  "Surgery & clinical imaging",
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MockSelector
                name="Paper 2"
                selected={selectedMock === QuestionType.PaperTwoMockExam}
                setSelected={() => setSelectedMock(QuestionType.PaperTwoMockExam)}
                specialities={[
                  "Acute medicine",
                  "Breast",
                  "Cancer",
                  "Child health",
                  "Ear, nose & throat",
                  "Emergency medicine & intensive care",
                  "Haematology",
                  "Medical ethics & law",
                  "Mental health",
                  "Musculoskeletal",
                  "Obstetrics & gynaecology",
                  "Palliative & End of Life care",
                  "Peri-op medicine & anaesthesia",
                  "Primary care",
                  "Sexual health",
                  "Social/population health & research methods",
                  "Surgery & clinical imaging",
                ]}
              />
            </Grid>
          </Grid>
        </Box>
        <Stack direction="row" justifyContent="center">
          <LoadingButton
            variant="contained"
            sx={{ width: "max-content", flexShrink: 0, py: 1 }}
            size="large"
            endIcon={<ChevronRight />}
            onClick={handleStartMock}
          >
            Next
          </LoadingButton>
        </Stack>
      </Stack>
    </Page>
  )
}

export default observer(SelectMock);