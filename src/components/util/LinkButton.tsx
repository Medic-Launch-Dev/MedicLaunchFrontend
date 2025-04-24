import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  children: string;
  to: string;
  target?: React.HTMLAttributeAnchorTarget;
}

export default function LinkButton({ variant, children, to, target, ...rest }: LinkButtonProps) {
  return (
    <Link to={to} target={target} style={{ textDecoration: 'none', color: 'inherit', width: "100%" }}>
      <Button variant={variant ?? "contained"} {...rest}>
        {children}
      </Button>
    </Link>
  )
}