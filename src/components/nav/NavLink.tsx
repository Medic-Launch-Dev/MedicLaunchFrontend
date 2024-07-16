// import { Link } from "@mui/material";
import { Box } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLinkProps {
  text: string
  href: string;
  selected?: boolean;
}

export default function NavLink({ text, href, selected }: NavLinkProps) {
  return (
    <RouterNavLink to={href} style={{ textDecoration: 'none', color: 'white' }}>
      <Box
        sx={{
          fontSize: 16,
          fontWeight: 700,
          pl: 3,
          py: 1,
          cursor: 'pointer',
          borderLeft: selected ? '4px solid #70BCFD' : undefined,
          backgroundColor: selected ? '#303750' : undefined,
          ":hover": {
            backgroundColor: '#303750'
          }
        }}
      >
        {text}
      </Box>
    </RouterNavLink>
  )
}