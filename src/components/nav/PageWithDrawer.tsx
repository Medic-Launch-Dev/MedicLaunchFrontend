import { Box, Drawer } from "@mui/material";

interface PageWithDrawerProps {
  children: React.ReactNode;
}

export default function PageWithDrawer({ children }: PageWithDrawerProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor: "#1f263e",
            width: 300,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      />
      <Box>
        {children}
      </Box>
    </Box>
  )
}