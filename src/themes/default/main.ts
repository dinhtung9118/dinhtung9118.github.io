import { ThemeOptions } from "@material-ui/core";

export default {
  palette: {
    common: { black: "rgba(0, 0, 0, 1)", white: "#fff" },
    background: { paper: "#fff", default: "rgba(238, 238, 238, 1)" },
    primary: {
      light: "rgba(77, 175, 255, 1)",
      main: "rgba(11, 147, 255, 1)",
      dark: "#303f9f",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    secondary: {
      light: "rgba(140, 220, 142, 1)",
      main: "rgba(89, 177, 93, 1)",
      dark: "rgba(51, 173, 56, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },

  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: 38,
      },
    },
  },
} as ThemeOptions;
