import { Box } from "@mui/material";
import NavMenu from "./NavMenu";

interface PageWithDrawerProps {
  children: React.ReactNode;
}

export default function PageWithNav({ children }: PageWithDrawerProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavMenu />
      <Box sx={{ width: '100%', height: '100%' }}>
        {children}
      </Box>
    </Box>
  )
}