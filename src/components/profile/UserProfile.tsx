import { Check, Loop } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useServiceProvider } from "../../services/ServiceProvider";
import { primaryGradient } from "../../theme";
import { formatDate } from "../../utils/DateTimeUtils";
import LinkButton from "../util/LinkButton";
import EditProfileModal from "./EditProfileModal";
import ResetPasswordModal from "./ResetPasswordModal";

interface UserProfileProps {
  adminView?: boolean;
}

function UserProfile({ adminView }: UserProfileProps) {
  const { accountStore, userStore, practiceStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    accountStore.getMyProfile();
  }, [])

  async function handleResetQuestions() {
    const success = await practiceStore.resetPracticeQuestions();
    if (success) {
      showSnackbar('Questions reset', 'success');
      window.location.reload(); // come up with better solution
    }
  }

  const userProfile = adminView ? userStore.userInView : accountStore.myProfile;

  return (
    <>
      <Snackbar {...snackbarProps} />
      <Box sx={{ bgcolor: "white", borderRadius: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3 }}>
              <Stack alignItems="center">
                <Box sx={{ background: primaryGradient, height: 50, width: 50, borderRadius: 0.5 }} />
                <Typography fontSize={16} fontWeight={500} mt={2}>{userProfile?.firstName} {userProfile?.lastName}</Typography>

                <Stack direction="row" spacing={2} alignItems="center" mt={3}>
                  {adminView ?
                    <Box sx={{ background: primaryGradient, p: 1, color: "white", fontSize: 16, fontWeight: 500, borderRadius: 1 }}>
                      £130
                    </Box>
                    :
                    <Box sx={{ bgcolor: "#2684FF1F", height: 40, width: 40, borderRadius: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check color="primary" />
                    </Box>
                  }
                  {
                    adminView ?
                      <Typography fontSize={13} fontWeight={400} color="#3A3541AD">Total Revenue</Typography>
                      :
                      <Stack>
                        <Typography fontSize={20} fontWeight={400}>{userProfile?.questionsCompleted}</Typography>
                        <Typography fontSize={13} fontWeight={400} color="#3A3541AD">Questions Completed</Typography>
                      </Stack>
                  }
                </Stack>

                <Stack width="100%" mt={4}>
                  <Typography fontSize={17} fontWeight={500}>Details</Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Stack spacing={1}>
                    <ProfileField label="Full Name" value={`${userProfile?.firstName} ${userProfile?.lastName}`} />
                    <ProfileField label="Email" value={userProfile?.email} />
                    <ProfileField label="University" value={userProfile?.university} />
                    <ProfileField label="Graduation Year" value={userProfile?.graduationYear.toString()} />
                    <ProfileField label="Mobile" value={userProfile?.phoneNumber} />
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
                {
                  !adminView && (
                    accountStore.isSubscribed ?
                      <Button size="small" variant="contained" startIcon={<Loop />} onClick={() => setResetOpen(true)} disabled={userProfile?.questionsCompleted === 0}>
                        Reset Questions
                      </Button>
                      :
                      <LinkButton to="/subscribe" variant="contained" size="small">
                        Purchase Subscription
                      </LinkButton>
                  )
                }
              </Stack>
              <Divider sx={{ my: 2 }} />
              {
                accountStore.isSubscribed ?
                  <Stack direction="row" justifyContent="space-between">
                    <SubscriptionField label="Subscription" value="UKMLA" />
                    <SubscriptionField label="Plan" value={`${userProfile?.subscriptionMonths} month`} />
                    <SubscriptionField label="Date purchased" value={formatDate(userProfile?.subscriptionPurchaseDate)} />
                  </Stack>
                  :
                  <Typography textAlign="center" py={2}>No subscription active</Typography>
              }
            </Paper>
            <Paper sx={{ p: 3, mt: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontSize={17} fontWeight={500}>My Courses</Typography>
                <Button size="small" variant="contained" disabled>
                  Coming soon...
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography textAlign="center" py={6}>No courses purchased</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={resetOpen} onClose={() => setResetOpen(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to <b>reset all questions?</b></Typography>
          <Typography>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleResetQuestions}>Reset</Button>
        </DialogActions>
      </Dialog>
      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} adminView={adminView} />
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