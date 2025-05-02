import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  children: string;
  to: string;
  target?: React.HTMLAttributeAnchorTarget;
  style?: React.CSSProperties;
}

export default function LinkButton({ variant, children, to, target, style, ...rest }: LinkButtonProps) {
  return (
    <Link to={to} target={target} style={{ textDecoration: 'none', color: 'inherit', ...style }}>
      <Button variant={variant ?? "contained"} {...rest}>
        {children}
      </Button>
    </Link>
  )
}