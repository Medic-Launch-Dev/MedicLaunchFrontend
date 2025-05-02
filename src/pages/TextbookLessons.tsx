import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { SpecialitySelector } from "../components/util/SpecialitySelector";
import { useServiceProvider } from "../services/ServiceProvider";

export default function TextbookLessons() {
  const navigate = useNavigate();
  const { accountStore: { isSubscribed } } = useServiceProvider();
  const [selectedSpecialityId, setSelectedSpecialityId] = useState("");

  function handleNext() {
    navigate(`/clinical-companion/${selectedSpecialityId}`);
  }

  // Only redirect after we're sure about the subscription status
  if (isSubscribed === false) return <Navigate to="/subscribe" />;

  return (
    <Page withNav maxWidth="xl" sx={{ height: "100%" }}>
      <Stack height="100%" gap={3} py={2}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 1, borderRadius: 1, mb: 1 }}
        >
          <LinkButton variant="contained" to="/">
            Study Portal
          </LinkButton>
          <Typography variant="h2" color="primary" align="center">
            Clinical Companion - Select Speciality
          </Typography>
          <Button sx={{ visibility: "hidden" }}>Study Portal</Button>
        </Stack>
        <Box sx={{
          flexGrow: 1,
          maxHeight: "100%",
          minHeight: 400,
          overflowY: "hidden",
        }}>
          <SpecialitySelector
            selectedSpecialityId={selectedSpecialityId}
            setSelectedSpecialityId={setSelectedSpecialityId}
            redirectPath={`/${selectedSpecialityId}`}
          />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
          pt={1}
          pb={6}
        >
          <LinkButton
            variant="outlined"
            sx={{ width: "max-content", flexShrink: 0 }}
            size="large"
            startIcon={<ChevronLeft />}
            to="/"
          >
            Back
          </LinkButton>
          <LoadingButton
            variant="contained"
            sx={{ width: "max-content", flexShrink: 0, py: 1 }}
            size="large"
            endIcon={<ChevronRight />}
            onClick={handleNext}
            disabled={!selectedSpecialityId}
          >
            Next
          </LoadingButton>
        </Stack>
      </Stack>
    </Page>
  );
}