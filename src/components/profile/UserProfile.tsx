import { Add, Check, Loop } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { primaryGradient } from "../../theme";
import EditProfileModal from "./EditProfileModal";
import ResetPasswordModal from "./ResetPasswordModal";

interface UserProfileProps {
  adminView?: boolean;
}

function UserProfile({ adminView }: UserProfileProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <>
      <Box sx={{ bgcolor: "white", borderRadius: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3 }}>
              <Stack alignItems="center">
                <Box sx={{ background: primaryGradient, height: 50, width: 50, borderRadius: 0.5 }} />
                <Typography fontSize={16} fontWeight={500} mt={2}>Riaz Riaz</Typography>

                <Stack direction="row" spacing={2} alignItems="center" mt={3}>
                  <Box sx={{ bgcolor: "#2684FF1F", height: 40, width: 40, borderRadius: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check color="primary" />
                  </Box>
                  <Stack>
                    <Typography fontSize={20} fontWeight={400}>1,090</Typography>
                    <Typography fontSize={13} fontWeight={400} color="#3A3541AD">Questions Completed</Typography>
                  </Stack>
                </Stack>

                <Stack width="100%" mt={4}>
                  <Typography fontSize={17} fontWeight={500}>Details</Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Stack spacing={1}>
                    <ProfileField label="Display Name" value="@RiazK" />
                    <ProfileField label="Full Name" value="Riaz Riaz" />
                    <ProfileField label="University" value="Nottingham" />
                    <ProfileField label="Graduation Year" value="2024" />
                    <ProfileField label="City" value="London" />
                    <ProfileField label="Mobile" value="+123456789" />
                  </Stack>
                </Stack>

                <Stack spacing={3} mt={3} direction="row" alignItems="center" justifyContent="space-around">
                  <Button variant="contained" size="small" onClick={() => setEditOpen(true)}>
                    Edit
                  </Button>
                  {
                    !adminView &&
                    <Button variant="contained" size="small" onClick={() => setPasswordOpen(true)}>
                      Reset Password
                    </Button>
                  }
                </Stack>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontSize={17} fontWeight={500}>My Subscription</Typography>
                <Button size="small" variant="contained" startIcon={<Loop />}>
                  Reset Questions
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="space-between">
                <SubscriptionField label="Subscription" value="UKMLA" />
                <SubscriptionField label="Plan" value="1 month" />
                <SubscriptionField label="Date purchased" value="11:00AM - 23/11/23" />
              </Stack>
            </Paper>
            <Paper sx={{ p: 3, mt: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontSize={17} fontWeight={500}>My Courses</Typography>
                <Button size="small" variant="contained" startIcon={<Add />}>
                  Add Course
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography textAlign="center" py={6}>No courses purchased</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
      <ResetPasswordModal open={passwordOpen} onClose={() => setPasswordOpen(false)} />
    </>
  )
};

interface FieldProps {
  label?: string;
  value?: string;
}

function ProfileField({ label, value }: FieldProps) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography fontWeight={500}>{label}:</Typography>
      <Typography color="#3A3541AD">{value}</Typography>
    </Stack>
  )
}

function SubscriptionField({ label, value }: FieldProps) {
  return (
    <Stack spacing={0.5}>
      <Typography fontWeight={500} color="#3A3541AD">{label}</Typography>
      <Typography fontWeight={500} fontSize={16}>{value}</Typography>
    </Stack>
  )
}

export default observer(UserProfile);