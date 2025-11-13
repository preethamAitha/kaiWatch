// themeDark.tsx

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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    common: {
      black: '#000',
      white: '#fff',
      background: '#000',
      onBackground: '#fff',
      backgroundChannel: '0 0 0',
      onBackgroundChannel: '255 255 255',
    },

    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },

    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },

    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },

    warning: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },

    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },

    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: 'rgba(0, 0, 0, 0.87)',
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
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },

    background: {
      paper: '#121212',
      default: '#121212',
    },

    divider: 'rgba(255, 255, 255, 0.12)',

    action: {
      active: '#fff',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
  },
  
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#212121', 
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.09)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.13)',
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
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

export default darkTheme;