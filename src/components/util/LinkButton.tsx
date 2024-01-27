import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  children: string;
  to: string;
}

export default function LinkButton({ variant, children, to, ...rest }: LinkButtonProps) {
  return (
    <Button variant={variant ?? "contained"} {...rest}>
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        {children}
      </Link>
    </Button>
  )
}