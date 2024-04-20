import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Card, Container, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LinkButton from "../components/util/LinkButton";

export default function FlashCards() {
  const { specialityId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!specialityId) navigate("/flash-cards");
  }, []);

  return (
    <Container maxWidth="xl" sx={{ height: "100%" }}>
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
              <Typography variant="h6" color="primary" >Hypertension</Typography>
              <Typography variant="h6" color="primary" >Heart Failure</Typography>
              <Typography variant="h6" color="primary">Atrial Fibrillation</Typography>
              <Typography variant="h6" color="primary">Coronary Artery Disease</Typography>
              <Typography variant="h6" color="primary" >Hypertension</Typography>
              <Typography variant="h6" color="primary" >Heart Failure</Typography>
              <Typography variant="h6" color="primary">Atrial Fibrillation</Typography>
              <Typography variant="h6" color="primary">Coronary Artery Disease</Typography>
              <Typography variant="h6" color="primary" >Hypertension</Typography>
              <Typography variant="h6" color="primary" >Heart Failure</Typography>
              <Typography variant="h6" color="primary">Atrial Fibrillation</Typography>
              <Typography variant="h6" color="primary">Coronary Artery Disease</Typography>
              <Typography variant="h6" color="primary" >Hypertension</Typography>
              <Typography variant="h6" color="primary" >Heart Failure</Typography>
              <Typography variant="h6" color="primary">Atrial Fibrillation</Typography>
              <Typography variant="h6" color="primary">Coronary Artery Disease</Typography>
              <Typography variant="h6" color="primary" >Hypertension</Typography>
              <Typography variant="h6" color="primary" >Heart Failure</Typography>
              <Typography variant="h6" color="primary">Atrial Fibrillation</Typography>
              <Typography variant="h6" color="primary" >Hypertension</Typography>
              <Typography variant="h6" color="primary" >Heart Failure</Typography>
              <Typography variant="h6" color="primary">Atrial Fibrillation</Typography>
              <Typography variant="h6" color="primary">Coronary Artery Disease</Typography>
              <Typography variant="h6" color="primary" >Hypertension</Typography>
              <Typography variant="h6" color="primary" >Heart Failure</Typography>
              <Typography variant="h6" color="primary">Atrial Fibrillation</Typography>
              <Typography variant="h6" color="primary">Coronary Artery Disease</Typography>
              <Typography variant="h6" color="primary" >Hypertension</Typography>
              <Typography variant="h6" color="primary" >Heart Failure</Typography>
              <Typography variant="h6" color="primary">Atrial Fibrillation</Typography>
            </Stack>
          </Card>
        </Stack>
        <Stack sx={{ flexGrow: 1 }} alignItems="center" justifyContent="center" height="100%">
          <img src="/avd.png" style={{ maxWidth: 600, maxHeight: "calc(100% - 100px)" }} />
          <Stack direction="row" gap={2} mt={4}>
            <IconButton color="primary" sx={{ border: '2px solid #2394c4' }} size="large"><ArrowBack /></IconButton>
            <IconButton color="primary" sx={{ border: '2px solid #2394c4' }} size="large"><ArrowForward /></IconButton>
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
    </Container>
  );
}