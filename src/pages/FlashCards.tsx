import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Card, Divider, IconButton, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { Flashcard } from "../models/Flashcard";
import { useServiceProvider } from "../services/ServiceProvider";

export default function FlashCards() {
  const { specialityId = "" } = useParams();
  const navigate = useNavigate();
  const { flashCardStore } = useServiceProvider();

  const [flashcards, setFlashcards] = useState<Flashcard[]>();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!specialityId) navigate("/flash-cards");
    init();
  }, []);

  async function init() {
    if (!specialityId) return;
    const flashcards = await flashCardStore.getFlashcardsBySpecialityId(specialityId);
    setFlashcards(flashcards);
  }

  console.log(flashcards);

  return (
    <Page sx={{ height: "100%" }} maxWidth="xl">
      <Stack direction="row" sx={{ height: '100%' }}>
        <Stack width={350} gap={2} height="100%">
          <Card sx={{ flexShrink: 0 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="#B9B9B9" fontWeight={600} fontSize={13}>Speciality</Typography>
              <Link to="/flash-cards" style={{ color: 'black', fontSize: 13, fontWeight: 500 }}>Change</Link>
            </Stack>
            <Typography variant="h3" color="primary" mt={0.5}>Cardiovascular</Typography>
          </Card>
          <Card sx={{ flexGrow: 1 }}>
            <Typography color="#B9B9B9" fontWeight={600} fontSize={13}>Conditions</Typography>
            <Stack gap={2} mt={2} sx={{ overflowY: 'scroll', height: 'calc(100% - 44px)' }}>
              {
                flashcards ?
                  flashcards.map((flashcard, idx) => (
                    <Typography
                      variant="h6"
                      color={idx === currentIdx ? "primary" : "#9e9e9e"}
                      key={flashcard.id}
                      onClick={() => setCurrentIdx(idx)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {flashcard.name}
                    </Typography>
                  ))
                  :
                  Array.from({ length: 5 }).map((_, idx) => (
                    <Skeleton key={idx} variant="text" width={200} />
                  ))
              }
            </Stack>
          </Card>
        </Stack>
        <Stack sx={{ flexGrow: 1 }} alignItems="center" justifyContent="center" height="100%">
          <img
            src={flashcards?.[currentIdx]?.imageUrl}
            style={{ maxWidth: 600, maxHeight: "calc(100% - 100px)", margin: 20 }}
          />
          <Stack direction="row" gap={2} mt={4}>
            <IconButton
              color="primary"
              sx={{ border: '2px solid #2394c4' }}
              size="large"
              onClick={() => setCurrentIdx(currentIdx - 1)}
              disabled={currentIdx === 0}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              color="primary"
              sx={{ border: '2px solid #2394c4' }}
              size="large"
              onClick={() => setCurrentIdx(currentIdx + 1)}
              disabled={currentIdx === (flashcards || []).length - 1}
            >
              <ArrowForward />
            </IconButton>
          </Stack>
        </Stack>
        <Stack width={350} gap={2} height="100%" pb={12}>
          <LinkButton variant="contained" to={"/"} sx={{ width: 'max-content' }}>
            Study Portal
          </LinkButton>
          <Card sx={{ flexGrow: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color="primary" variant="h3">Notes</Typography>
              <Button variant="contained">View all notes</Button>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack height="calc(100% - 70px)" alignItems="end">
              <TextField
                multiline
                sx={{ flexGrow: 1 }}
                inputProps={{
                  style: {
                    height: "100%",
                  },
                }}
                InputProps={{
                  sx: { height: '100%' }
                }}
                fullWidth
                placeholder="Add a note"
              />
              <Button variant="contained" sx={{ width: 'max-content', height: 'max-content', mt: 2 }}>Save</Button>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Page>
  );
}