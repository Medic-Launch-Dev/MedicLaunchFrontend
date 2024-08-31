import styled from "@emotion/styled";
import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceProvider } from "../../services/ServiceProvider";
import { TimerState } from "../../stores/practiceStore";
import { primaryGradient } from "../../theme";

const Container = styled(Box)`
  border-radius: 12px;
  background: ${primaryGradient};
  color: white;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  padding: 12px;
`;

const MediaControl = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54px;
  cursor: pointer;
`;

function Timer() {
  const navigate = useNavigate();
  const { practiceStore } = useServiceProvider();
  const [open, setOpen] = useState(false);

  function formattedElapsedTime(elapsedTime?: number) {
    if (!elapsedTime) return "00:00:00";
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  function handleClickPause() {
    practiceStore.pauseTimer();
  }

  function handleClickPlay() {
    practiceStore.startTimer();
  }

  useEffect(() => {
    if (practiceStore.timeRemaining === 0) setOpen(true);
  }, [practiceStore.timeRemaining]);

  return (
    <Stack direction="row" width="100%" spacing={1}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ fontSize: 16 }}>Time's Up! 🕒</DialogTitle>
        <DialogContent>
          <p>Your allocated time for the mock exam has ended. Please submit your answers now to ensure they are recorded.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Continue Questions</Button>
          <Button variant="contained" onClick={() => navigate("/review-session")}>Submit Now</Button>
        </DialogActions>
      </Dialog>
      <Container sx={{ flexGrow: 1 }}>
        {
          practiceStore.timeRemaining === 0 ?
            "Exam time finished" :
            formattedElapsedTime(practiceStore.timeRemaining)
        }
      </Container>
      {
        practiceStore.timeRemaining !== 0 &&
        <>
          {
            practiceStore.examTimerState === TimerState.RUNNING &&
            <MediaControl onClick={handleClickPause}>
              <Pause />
            </MediaControl>
          }
          {
            practiceStore.examTimerState === TimerState.PAUSED &&
            <MediaControl onClick={handleClickPlay}>
              <PlayArrow />
            </MediaControl>
          }
        </>
      }
    </Stack>
  )
}

export default observer(Timer)