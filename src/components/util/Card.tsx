import { Box, Stack, Typography } from "@mui/material";
import { primaryGradient, primaryGradientText } from "../../theme";

interface CardProps {
  title: string;
  primary?: boolean;
  children: string | React.ReactNode;
  action?: React.ReactNode;
  icon?: any
}

export default function Card({ title, children, primary, action, icon }: CardProps) {

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        p: 2.5,
        borderRadius: 2,
        color: primary ? '#fff' : '#046E9B',
        border: primary ? undefined : '1px solid #DFE5F9',
        background: primary ? primaryGradient : "#fff",
        height: '100%'
      }}
    >
      <div>
        <Typography variant="h4" sx={primary ? undefined : primaryGradientText}>
          {title}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {
            typeof children === 'string' ?
              <Typography>{children}</Typography>
              :
              children
          }
        </Box>
      </div>
      <Stack sx={{ mt: 1 }} direction="row" justifyContent="space-between" alignItems="baseline">
        <div>{action}</div>
        <div>{icon}</div>
      </Stack>
    </Stack>
  )
}