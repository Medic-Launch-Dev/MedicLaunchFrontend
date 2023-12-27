import { Stack, Typography } from "@mui/material";
import { primaryGradient, primaryGradientText } from "../../theme";

interface ReviewCardProps {
  primary?: boolean;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function ReviewCard({ primary, title, subtitle, icon }: ReviewCardProps) {
  return (
    <Stack
      spacing={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        p: 2.5,
        color: primary ? '#fff' : '#046E9B',
        border: primary ? undefined : '1px solid #DFE5F9',
        background: primary ? primaryGradient : "#fff",
        height: '100%',
      }}
    >
      <div>{icon}</div>
      <Typography
        variant="h3"
        sx={primary ? { color: "white" } : primaryGradientText}
        align="center"
      >
        {title}
      </Typography>
      <Typography
        fontSize={16}
        fontWeight={500}
        color={primary ? "white" : "GrayText"}
        align="center"
      >
        {subtitle}
      </Typography>
    </Stack>
  )
} 