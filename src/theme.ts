import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1381af"
    },
    secondary: {
      main: "#ffffff",
      contrastText: "#1381af"
    },
    background: {
      default: "#f3f6fe"
    }
  },
  shape: {
    borderRadius: 8
  },
});

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600
      }
    },
    defaultProps: {
      disableElevation: true,
      disableRipple: true
    }
  }
}

export default theme;