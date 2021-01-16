import {ThemeOptions} from "@material-ui/core";

export default {
  palette: {
    common: {black: "rgba(0, 0, 0, 1)", white: "#fff"},
    background: {paper: "#fff", default: "rgba(238, 238, 238, 1)"},
    primary: {
      light: "#4bc5ff",
      main: "#1eb7ff",
      dark: "#1580b2",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    warning: {
      light: "#ffb333",
      main: "#ffa000",
      dark: "#f27212",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    secondary: {
      light: "rgba(140, 220, 142, 1)",
      main: "rgba(89, 177, 93, 1)",
      dark: "rgba(51, 173, 56, 1)",
      contrastText: "#fff",
    },
    success: {
      light: "#48c75c",
      main: "#1bb934",
      dark: "#128124",
      contrastText: "#fff",
    },
    info: {
      light: "#617eaa",
      main: "#3a5e95",
      dark: "#284168",
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
  typography: {
    fontFamily: [
      'Raleway',
      'Arial'
    ].join(','),
  },
  grey: {
    primary: "#8493a5",
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: 38,
      },
    },
    MuiCssBaseline: {
      "@global": {
        "@font-face": ['Helvetica Neue"'],
      },
    },
  },
} as ThemeOptions;
