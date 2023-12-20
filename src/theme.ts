import { createTheme } from "@mui/material";

export const primaryGradient = 'linear-gradient(115.43deg, #2496C7 6.22%, #046E9B 100%)';

export const primaryGradientText = {
  background: primaryGradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#2394c4"
    },
    secondary: {
      main: "#ffffff",
      contrastText: "#2394c4",
      light: "#cbeaf7"
    },
    background: {
      default: "#f3f6fe"
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    allVariants: {
      userSelect: 'none',
      WebkitUserSelect: 'none',
      msUserSelect: 'none',
    },
    h1: {
      fontSize: '2.125rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
  }
});

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        padding: `6px 22px`,
      },
      containedPrimary: {
        background: `linear-gradient(115.43deg, #2496C7 6.22%, #046E9B 100%)`,
        ":hover": {
          background: `linear-gradient(115.43deg, #2aabe3 6.22%, #046E9B 100%)`,
        }
      },
      containedSecondary: {
        background: `#fff`,
        ":hover": {
          backgroundColor: '#d2eefa',
        }
      }
    },
    defaultProps: {
      disableElevation: true,
      disableRipple: true
    }
  }
}

export default theme;