import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Card, CircularProgress, Divider, IconButton, Skeleton, Stack, Typography, useMediaQuery } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Page from "../components/nav/Page";
import EditNote from "../components/notes/EditNote";
import LinkButton from "../components/util/LinkButton";
import { Flashcard } from "../models/Flashcard";
import { useServiceProvider } from "../services/ServiceProvider";
import theme from "../theme";

function FlashCards() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { specialityId = "" } = useParams();
  const navigate = useNavigate();
  const { flashCardStore, accountStore: { hasStudentAccess } } = useServiceProvider();

  const [flashcards, setFlashcards] = useState<Flashcard[]>();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    if (!specialityId) navigate("/flash-cards");
    init();
  }, []);

  useEffect(() => {
    setIsImageLoading(true);
  }, [currentIdx]);

  async function init() {
    if (!specialityId) return;
    const flashcards = await flashCardStore.getFlashcardsBySpecialityId(specialityId);
    if (flashcards) {
      setFlashcards(flashcards);
    }
  }

  if (!flashcards) return (
    <Stack alignItems="center" py={5}>
      <CircularProgress />
    </Stack>
  );

  if (hasStudentAccess === false) return <Navigate to="/trial-expired" />;

  return (
    <Page sx={{ height: "100%" }} maxWidth="xl">
      <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 0 }} sx={{ height: '100%' }}>
        <Stack width={{ xs: "100%", md: 350 }} gap={2} height="100%">
          <Card sx={{ flexShrink: 0 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="#B9B9B9" fontWeight={600} fontSize={13}>Speciality</Typography>
              <Link to="/flash-cards" style={{ color: 'black', fontSize: 13, fontWeight: 500 }}>Change</Link>
            </Stack>
            <Typography variant="h3" color="primary" mt={0.5}>{flashcards[0].speciality?.name}</Typography>
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
          {isImageLoading && (
            <CircularProgress size={60} thickness={5} sx={{ position: 'absolute' }} />
          )}
          <img
            src={flashcards?.[currentIdx]?.imageUrl}
            style={{
              maxWidth: isMobile ? "100%" : 600,
              maxHeight: "calc(100% - 100px)",
              margin: 20,
              opacity: isImageLoading ? 0.5 : 1,
              transition: 'opacity 0.3s ease-in-out'
            }}
            onLoad={() => setIsImageLoading(false)}
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
        <Stack width={{ xs: "100%", md: 350 }} gap={2} height="100%">
          <LinkButton variant="contained" to={"/"} sx={{ width: 'max-content' }}>
            Study Portal
          </LinkButton>
          <Card sx={{ flexGrow: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color="primary" variant="h3">Notes</Typography>
              <LinkButton variant="contained" to="/revision-notes">View all notes</LinkButton>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <EditNote
              height="calc(100% - 70px)"
              alignItems="end"
              note={flashcards[currentIdx].note}
              flashcardId={flashcards[currentIdx].id}
              specialityId={flashcards[currentIdx].specialityId}
              onSave={flashCardStore.getAllFlashCards}
            />
          </Card>
        </Stack>
      </Stack>
    </Page>
  );
}

export default observer(FlashCards);