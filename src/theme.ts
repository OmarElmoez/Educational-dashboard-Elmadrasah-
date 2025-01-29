import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'Expo, system-ui, sans-serif',
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: '#1c8a44',
    },
    secondary: {
      main: '#212121',
    },
    error: {
      main: '#EC221F',
    },
    warning: {
      main: '#ffb72b',
    },
    text: {
      primary: '#212121',
      secondary: '#6f6f6f',
      disabled: '#A0A1A7',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  }
})

export default theme