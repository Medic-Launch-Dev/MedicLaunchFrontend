import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  children: string;
  to: string;
}

export default function LinkButton({ variant, children, to, ...rest }: LinkButtonProps) {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button variant={variant ?? "contained"} {...rest}>
        {children}
      </Button>
    </Link>
  )
}