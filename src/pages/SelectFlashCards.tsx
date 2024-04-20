import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlashCardSpecialitySelection } from "../components/flashCards/FlashCardSpecialitySelection";
import LinkButton from "../components/util/LinkButton";

export default function SelectFlashCards() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedSpecialityId, setSelectedSpecialityId] = useState("");

  function handleNext() {
    navigate(`/flash-cards/${selectedSpecialityId}`)
  }

  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Stack height="100%" gap={3} py={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 1, borderRadius: 1, mb: 1 }}
        >
          <LinkButton variant="contained" to={"/"}>
            Study Portal
          </LinkButton>
          <Typography variant="h2" color="primary">Flashcard - Select Speciality</Typography>
          <Button sx={{ visibility: "hidden" }}>Study Portal</Button>
        </Stack>
        <Box
          sx={{
            flexGrow: 1,
            maxHeight: "100%",
            minHeight: 400,
            overflowY: "hidden",
          }}
        >
          <FlashCardSpecialitySelection selectedSpecialityId={selectedSpecialityId} setSelectedSpecialityId={setSelectedSpecialityId} />
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
            loading={loading}
            disabled={!selectedSpecialityId}
          >
            Next
          </LoadingButton>
        </Stack>
      </Stack>

    </Container>
  )
}