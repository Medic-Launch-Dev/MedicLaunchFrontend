import { Box, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface AuthLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <Grid container sx={{ height: "100vh", bgcolor: "white" }}>
      <Grid item xs={12} lg={5} sx={{ height: "100%" }}>
        <Stack
          sx={{ m: "auto", minHeight: "100%", py: 2, position: "relative" }}
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Box>
          </Box>
          <Box px={2} sx={{ maxWidth: 450, width: "100%" }}>
            <Stack sx={{ flexShrink: 0 }} spacing={1} pb={5}>
              <Stack alignItems="center" justifyContent="center" pb={4}>
                <img src="/logo.png" width={140} />
              </Stack>
              <Typography
                variant="h1"
                color="primary"
                fontSize={36}
                fontWeight={500}
              >
                {title}
              </Typography>
              {
                subtitle && (
                  <Typography fontSize={16} sx={{ color: grey[700] }}>
                    {subtitle}
                  </Typography>
                )
              }
            </Stack>

            {children}
          </Box>
        </Stack>
      </Grid>
      <Grid
        item
        lg={7}
        sx={{
          height: "100%",
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: 'none', lg: 'block' }
        }}
      ></Grid>
    </Grid>
  )
}