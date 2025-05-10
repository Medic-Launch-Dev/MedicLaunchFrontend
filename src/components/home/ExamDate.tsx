import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { primaryGradientText } from "../../theme";

export default function ExamDate() {
  const [open, setOpen] = useState(false);
  const [examDate, setExamDate] = useState("");
  const [daysLeft, setDaysLeft] = useState<number>();
  const [error, setError] = useState("");

  useEffect(() => {
    const savedExamDate = localStorage.getItem("examDate");
    if (savedExamDate) {
      setExamDate(savedExamDate);
      calculateDaysLeft(savedExamDate);
    }
  }, []);

  const handleSave = () => {
    if (validateDate(examDate)) {
      localStorage.setItem("examDate", examDate);
      calculateDaysLeft(examDate);
      setOpen(false);
      setError("");
    } else {
      setError("Please enter a valid date in the format DD/MM/YYYY");
    }
  };

  function formatDate(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  const calculateDaysLeft = (date: string) => {
    const formattedDate = formatDate(date);
    const examDay = dayjs(formattedDate);
    const today = dayjs();
    const diff = examDay.diff(today, 'day');
    setDaysLeft(diff);
  };

  const validateDate = (date: string) => {
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return datePattern.test(date);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" sx={{ ...primaryGradientText, flexShrink: 0 }}>
        UKMLA Exam Date
      </Typography>
      <Stack sx={{ flexGrow: 1 }} alignItems="center" justifyContent="center" spacing={2}>
        <Button variant="outlined" sx={{ borderRadius: 99 }} onClick={() => setOpen(true)}>
          {examDate ? examDate : "Enter here.."}
        </Button>
        <div>
          <Typography sx={primaryGradientText} variant="h1" fontSize={48} fontWeight={700} align="center">
            {daysLeft || "0"}
          </Typography>
          <Typography sx={primaryGradientText} variant="h4" align="center">
            Days left
          </Typography>
        </div>
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Enter your exam date</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            fullWidth
            label="Exam date"
            placeholder="DD/MM/YYYY"
            sx={{ mt: 1 }}
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}