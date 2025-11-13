// themeLight.tsx

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    common: CommonColors;
  }
  interface PaletteOptions {
    common?: Partial<CommonColors>;
  }
  interface CommonColors {
    background: string;
    onBackground: string;
    backgroundChannel: string;
    onBackgroundChannel: string;
  }
}

const themeLight = createTheme({
  palette: {
    mode: 'light',

    common: {
      black: '#000',
      white: '#fff',
      background: '#fff',
      onBackground: '#000',
      backgroundChannel: '255 255 255',
      onBackgroundChannel: '0 0 0',
    },

    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },

    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },

    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#fff',
    },

    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff',
    },

    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff',
    },

    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff',
    },

    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },

    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },

    background: {
      paper: '#fff',
      default: '#fff',
    },

    divider: 'rgba(0, 0, 0, 0.12)',

    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      focus: 'rgba(0, 0, 0, 0.12)',
    },
  },
  
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5', 
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.09)',
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
          },
        }
      }
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    fontSize: 12,
    h1: { fontSize: '2rem' },
    h2: { fontSize: '1.75rem' },
    h3: { fontSize: '1.5rem' },
    h4: { fontSize: '1.25rem' },
    h5: { fontSize: '1rem' },
    h6: { fontSize: '0.875rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { fontSize: '0.875rem', fontWeight: 600 },
    caption: { fontSize: '0.75rem' },
    overline: { fontSize: '0.625rem', letterSpacing: '0.1em' },
  },
});

export default themeLight;