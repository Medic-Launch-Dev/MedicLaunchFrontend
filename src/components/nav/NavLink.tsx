import { Box } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLinkProps {
  text: string;
  href: string;
  selected?: boolean;
  tag?: string; // New prop for the tag
}

export default function NavLink({ text, href, selected, tag }: NavLinkProps) {
  return (
    <RouterNavLink to={href} style={{ textDecoration: 'none', color: 'white' }}>
      <Box
        sx={{
          fontSize: 16,
          fontWeight: 600,
          pl: 3,
          py: 1,
          cursor: 'pointer',
          borderLeft: selected ? '4px solid #70BCFD' : undefined,
          backgroundColor: selected ? '#303750' : undefined,
          ":hover": {
            backgroundColor: '#303750'
          },
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        {text}
        {tag && (
          <Box
            sx={{
              backgroundColor: '#70BCFD',
              color: 'white',
              fontSize: 12,
              padding: '2px 6px',
              borderRadius: 1,
              ml: 1
            }}
          >
            {tag}
          </Box>
        )}
      </Box>
    </RouterNavLink>
  )
}