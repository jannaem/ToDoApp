import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#69CABC",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#408793",
    },
    success: {
      main: "#69CABC",
      contrastText: "#ffffff",
    },
    background: {
      default: "#8eecc980",
    },
    action: {
      active: "#2F4858",
    },
  },
  typography: {
    fontFamily: ["Monospace"].join(","),
    h1: {
      color: "#69CABC",
    },
    h3: {
      color: "#69CABC",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          borderColor: "black",
          "::before": {
            borderBottom: "#000",
          },
        },
      },
    },
  },
});
export default theme;
