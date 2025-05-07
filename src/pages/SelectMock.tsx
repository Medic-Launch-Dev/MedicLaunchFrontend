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

export default function SelectMock() {
  const { questionsStore } = useServiceProvider();
  const { accountStore: { hasStudentAccess, myProfile } } = useServiceProvider();
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

  if (myProfile?.isOnFreeTrial || hasStudentAccess === false) return <Navigate to="/subscribe" />;

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
              <div style={{ position: "relative" }}>

                <MockSelector
                  name="Paper 2"
                  selected={selectedMock === QuestionType.PaperTwoMockExam}
                  setSelected={() => { }}
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
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    borderRadius: "18px",
                  }}
                >
                  Coming Soon
                </div>
              </div>
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