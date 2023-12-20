import { Link } from "@mui/material";

interface NavLinkProps {
  text: string
  href?: string;
  selected?: boolean;
}

export default function NavLink({ text, href, selected }: NavLinkProps) {
  return (
    <Link
      sx={{
        fontSize: 18,
        fontWeight: 700,
        color: '#fff',
        textDecoration: 'none',
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
    </Link>
  )
}