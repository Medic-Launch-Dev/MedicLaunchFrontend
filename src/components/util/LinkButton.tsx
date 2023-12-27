import { Button, SxProps } from "@mui/material";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  variant?: "text" | "outlined" | "contained";
  children: string;
  to: string;
  sx?: SxProps;
}

export default function LinkButton({ variant, children, to, sx }: LinkButtonProps) {
  return (
    <Button variant={variant ?? "contained"} sx={sx}>
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        {children}
      </Link>
    </Button>
  )
}