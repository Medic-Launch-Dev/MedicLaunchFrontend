import { Button, Card, Paper, Stack, Typography } from "@mui/material";
import Page from "../components/nav/Page";
import LinkButton from "../components/util/LinkButton";
import { primaryGradientText } from "../theme";

export default function Notifications() {
  return (
    <Page withNav>
      <LinkButton to="/" sx={{ my: 2 }}>
        Study Portal
      </LinkButton>

      <Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h3" sx={primaryGradientText}>Notifications</Typography>
          <Button variant="contained" color="primary">Delete</Button>
        </Stack>

        <Stack spacing={1.5}>
          <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight={500}>New exam added</Typography>
              <Typography color="grey" fontWeight={500}>12-10-23</Typography>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight={500}>New exam added</Typography>
              <Typography color="grey" fontWeight={500}>12-10-23</Typography>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight={500}>New exam added</Typography>
              <Typography color="grey" fontWeight={500}>12-10-23</Typography>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight={500}>New exam added</Typography>
              <Typography color="grey" fontWeight={500}>12-10-23</Typography>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight={500}>New exam added</Typography>
              <Typography color="grey" fontWeight={500}>12-10-23</Typography>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight={500}>New exam added</Typography>
              <Typography color="grey" fontWeight={500}>12-10-23</Typography>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight={500}>New exam added</Typography>
              <Typography color="grey" fontWeight={500}>12-10-23</Typography>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight={500}>New exam added</Typography>
              <Typography color="grey" fontWeight={500}>12-10-23</Typography>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight={500}>New exam added</Typography>
              <Typography color="grey" fontWeight={500}>12-10-23</Typography>
            </Stack>
          </Paper>
        </Stack>
      </Card>
    </Page>
  );
}
